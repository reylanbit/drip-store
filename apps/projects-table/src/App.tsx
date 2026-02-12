import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table'
import { graphql } from '@octokit/graphql'

type IssueItem = {
  id: string
  type: 'issue' | 'pull'
  title: string
  number: number
  state: string
  assignees: string[]
  labels: string[]
  repository: string
  updatedAt: string
}

const columnHelper = createColumnHelper<IssueItem>()

const columns = [
  columnHelper.accessor('type', { header: 'Type' }),
  columnHelper.accessor('title', { header: 'Title' }),
  columnHelper.accessor('state', { header: 'State' }),
  columnHelper.accessor('assignees', {
    header: 'Assignees',
    cell: (info) => info.getValue().join(', ')
  }),
  columnHelper.accessor('labels', {
    header: 'Labels',
    cell: (info) => info.getValue().join(', ')
  }),
  columnHelper.accessor('repository', { header: 'Repository' }),
  columnHelper.accessor('updatedAt', { header: 'Updated' }),
]

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('gh_token'))
  const [owner, setOwner] = useState('talitalima-tech')
  const [repo, setRepo] = useState('drip-store')
  const [items, setItems] = useState<IssueItem[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sortBy, setSortBy] = useState<{ id: string; desc: boolean } | null>(null)
  const [viewName, setViewName] = useState('')
  const [views, setViews] = useState<{ name: string; owner: string; repo: string; filter: string; sort?: { id: string; desc: boolean } | null }[]>(
    () => {
      try {
        const raw = localStorage.getItem('gh_views')
        return raw ? JSON.parse(raw) : []
      } catch {
        return []
      }
    }
  )

  const octokitGraphql = useMemo(() => {
    if (!token) return null
    return graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    })
  }, [token])

  useEffect(() => {
    const fetchData = async () => {
      if (!octokitGraphql) return
      const query = `
        query($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            issues(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                id
                title
                number
                state
                updatedAt
                assignees(first: 10) { nodes { login } }
                labels(first: 10) { nodes { name } }
              }
            }
            pullRequests(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                id
                title
                number
                state
                updatedAt
                assignees(first: 10) { nodes { login } }
                labels(first: 10) { nodes { name } }
              }
            }
          }
        }
      `
      const data = await octokitGraphql<{ repository: any }>(query, { owner, repo })
      const repoFull = `${owner}/${repo}`
      const mapNodes = (nodes: any[], type: 'issue' | 'pull'): IssueItem[] =>
        nodes.map(n => ({
          id: n.id,
          type,
          title: n.title,
          number: n.number,
          state: n.state,
          assignees: (n.assignees?.nodes ?? []).map((a: any) => a.login),
          labels: (n.labels?.nodes ?? []).map((l: any) => l.name),
          repository: repoFull,
          updatedAt: n.updatedAt
        }))
      const combined = [
        ...mapNodes(data.repository.issues.nodes, 'issue'),
        ...mapNodes(data.repository.pullRequests.nodes, 'pull')
      ]
      setItems(combined)
    }
    fetchData().catch(console.error)
  }, [octokitGraphql, owner, repo])

  const table = useReactTable({
    data: items,
    columns,
    state: {
      globalFilter,
      sorting: sortBy ? [{ id: sortBy.id, desc: sortBy.desc }] : [],
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const saveView = () => {
    if (!viewName.trim()) return
    const next = [
      ...views.filter(v => v.name !== viewName.trim()),
      { name: viewName.trim(), owner, repo, filter: globalFilter, sort: sortBy }
    ]
    setViews(next)
    localStorage.setItem('gh_views', JSON.stringify(next))
    setViewName('')
  }

  const loadView = (name: string) => {
    const v = views.find(v => v.name === name)
    if (!v) return
    setOwner(v.owner)
    setRepo(v.repo)
    setGlobalFilter(v.filter)
    setSortBy(v.sort ?? null)
  }

  const handleLogin = () => {
    const scope = 'repo,read:org'
    fetch('/api/auth/device/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope })
    })
      .then(async (r) => {
        if (!r.ok) throw new Error('device start failed')
        const data = await r.json()
        const { user_code, verification_uri, device_code, interval = 5 } = data
        alert(`Código: ${user_code}\nAbra: ${verification_uri}\nDepois de autorizar, voltaremos automaticamente.`)
        window.open(verification_uri, '_blank')
        const iv = setInterval(async () => {
          const resp = await fetch('/api/auth/device/poll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ device_code })
          })
          if (!resp.ok) return
          const pollData = await resp.json()
          if (pollData.error === 'authorization_pending') {
            return
          }
          if (pollData.error === 'slow_down') {
            return
          }
          if (pollData.access_token) {
            clearInterval(iv)
            localStorage.setItem('gh_token', pollData.access_token)
            setToken(pollData.access_token)
          }
        }, Math.max(3, interval) * 1000)
      })
      .catch(async () => {
        alert('Falha no Device Flow. Como fallback, cole um GitHub token (PAT) com escopos repo, read:org.')
        const t = prompt('Cole um GitHub token (scope: repo, read:org):')
        if (t) {
          localStorage.setItem('gh_token', t)
          setToken(t)
        }
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('gh_token')
    setToken(null)
    setItems([])
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">GitHub Projects Table</h1>
        <div className="space-x-2">
          {!token ? (
            <button className="px-3 py-2 bg-slate-800 text-white rounded" onClick={handleLogin}>Login com GitHub</button>
          ) : (
            <button className="px-3 py-2 bg-slate-800 text-white rounded" onClick={handleLogout}>Sair</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input className="border rounded px-2 py-1" value={owner} onChange={e => setOwner(e.target.value)} placeholder="owner/org" />
        <input className="border rounded px-2 py-1" value={repo} onChange={e => setRepo(e.target.value)} placeholder="repo" />
      </div>

      <div className="flex items-center gap-2">
        <input
          className="border rounded px-2 py-1"
          value={viewName}
          onChange={e => setViewName(e.target.value)}
          placeholder="Nome da view"
        />
        <button className="px-3 py-2 bg-slate-800 text-white rounded" onClick={saveView}>Salvar view</button>
        <select className="border rounded px-2 py-2" title="Carregar view" aria-label="Carregar view" onChange={e => e.target.value && loadView(e.target.value)}>
          <option value="">Carregar view...</option>
          {views.map(v => (
            <option key={v.name} value={v.name}>{v.name}</option>
          ))}
        </select>
      </div>

      <div>
        <input
          className="border rounded px-2 py-1 w-full"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Filtrar por texto (título, estado, etc.)"
        />
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left px-3 py-2 border-b bg-slate-50">
                    <button
                      className="font-medium"
                      onClick={() => setSortBy({ id: header.column.id, desc: sortBy?.id === header.column.id ? !sortBy.desc : false })}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </button>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="odd:bg-white even:bg-slate-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

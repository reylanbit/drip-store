import { useEffect, useMemo, useState } from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getGroupedRowModel, useReactTable } from '@tanstack/react-table'
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
  milestone: string | null
  firstLabel: string | null
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
  columnHelper.accessor('firstLabel', { header: 'Label (grupo)' }),
  columnHelper.accessor('milestone', { header: 'Milestone' }),
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
  const [groupingCol, setGroupingCol] = useState<string>('none')
  const [customFields, setCustomFields] = useState<Record<string, { prioridade?: string; entrega?: string }>>(() => {
    try {
      const raw = localStorage.getItem('gh_custom_fields')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })
  const [repositoryId, setRepositoryId] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncLog, setSyncLog] = useState<string>('')

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
            id
            issues(first: 50, orderBy: {field: UPDATED_AT, direction: DESC}) {
              nodes {
                id
                title
                number
                state
                updatedAt
                assignees(first: 10) { nodes { login } }
                labels(first: 10) { nodes { name } }
                milestone { title }
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
                milestone { title }
              }
            }
          }
        }
      `
      const data = await octokitGraphql<{ repository: any }>(query, { owner, repo })
      setRepositoryId(data.repository.id)
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
          updatedAt: n.updatedAt,
          milestone: n.milestone?.title ?? null,
          firstLabel: ((n.labels?.nodes ?? [])[0]?.name as string | undefined) ?? null
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
      grouping: groupingCol !== 'none' ? [groupingCol] : []
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
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

  const updateCustomField = (id: string, key: 'prioridade' | 'entrega', value: string) => {
    setCustomFields(prev => {
      const next = { ...prev, [id]: { ...(prev[id] ?? {}), [key]: value } }
      localStorage.setItem('gh_custom_fields', JSON.stringify(next))
      return next
    })
  }

  const ensureLabel = async (name: string, color = 'D4C5F9', description = 'Prioridade') => {
    if (!octokitGraphql || !repositoryId) throw new Error('Token ou repositório ausente')
    const getLabelQuery = `
      query($owner: String!, $repo: String!, $name: String!) {
        repository(owner: $owner, name: $repo) {
          label(name: $name) { id }
        }
      }
    `
    const resGet = await octokitGraphql<{ repository: { label: { id: string } | null } }>(getLabelQuery, { owner, repo, name })
    if (resGet.repository.label?.id) return resGet.repository.label.id
    const createMutation = `
      mutation($repositoryId: ID!, $name: String!, $color: String!, $description: String) {
        createLabel(input: { repositoryId: $repositoryId, name: $name, color: $color, description: $description }) {
          label { id }
        }
      }
    `
    const resCreate = await octokitGraphql<{ createLabel: { label: { id: string } } }>(createMutation, {
      repositoryId,
      name,
      color,
      description
    })
    return resCreate.createLabel.label.id
  }

  const addLabelToItem = async (labelId: string, labelableId: string) => {
    if (!octokitGraphql) throw new Error('Token ausente')
    const mut = `
      mutation($labelableId: ID!, $labelIds: [ID!]!) {
        addLabelsToLabelable(input: { labelableId: $labelableId, labelIds: $labelIds }) {
          clientMutationId
        }
      }
    `
    await octokitGraphql(mut, { labelableId, labelIds: [labelId] })
  }

  const ensureMilestone = async (title: string, dueOn?: string) => {
    if (!octokitGraphql || !repositoryId) throw new Error('Token ou repositório ausente')
    const listQuery = `
      query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          milestones(first: 100, states: [OPEN]) { nodes { id title } }
        }
      }
    `
    const resList = await octokitGraphql<{ repository: { milestones: { nodes: { id: string; title: string }[] } } }>(listQuery, { owner, repo })
    const found = resList.repository.milestones.nodes.find(m => m.title === title)
    if (found?.id) return found.id
    const createMut = `
      mutation($repositoryId: ID!, $title: String!, $dueOn: DateTime) {
        createMilestone(input: { repositoryId: $repositoryId, title: $title, dueOn: $dueOn }) {
          milestone { id }
        }
      }
    `
    const resCreate = await octokitGraphql<{ createMilestone: { milestone: { id: string } } }>(createMut, {
      repositoryId,
      title,
      dueOn: dueOn || null
    })
    return resCreate.createMilestone.milestone.id
  }

  const assignMilestoneToItem = async (itemId: string, milestoneId: string, type: 'issue' | 'pull') => {
    if (!octokitGraphql) throw new Error('Token ausente')
    if (type === 'issue') {
      const mutIssue = `
        mutation($id: ID!, $milestoneId: ID) {
          updateIssue(input: { id: $id, milestoneId: $milestoneId }) {
            issue { id }
          }
        }
      `
      await octokitGraphql(mutIssue, { id: itemId, milestoneId })
    } else {
      const mutPr = `
        mutation($pullRequestId: ID!, $milestoneId: ID) {
          updatePullRequest(input: { pullRequestId: $pullRequestId, milestoneId: $milestoneId }) {
            pullRequest { id }
          }
        }
      `
      await octokitGraphql(mutPr, { pullRequestId: itemId, milestoneId })
    }
  }

  const syncToGitHub = async () => {
    try {
      setSyncing(true)
      setSyncLog('')
      const labelNameFromPriority = (p: string) => {
        const norm = (p || '').trim().toLowerCase()
        if (!norm) return null
        if (norm.startsWith('alt')) return 'prioridade: alta'
        if (norm.startsWith('méd') || norm.startsWith('med')) return 'prioridade: média'
        if (norm.startsWith('bai')) return 'prioridade: baixa'
        return `prioridade: ${p}`
      }
      const labelIdsCache: Record<string, string> = {}
      for (const it of items) {
        const cf = customFields[it.id]
        if (!cf) continue
        if (cf.prioridade) {
          const lname = labelNameFromPriority(cf.prioridade)
          if (lname) {
            const lid = labelIdsCache[lname] ?? await ensureLabel(lname)
            labelIdsCache[lname] = lid
            await addLabelToItem(lid, it.id)
            setSyncLog(prev => prev + `\nLabel "${lname}" aplicado em #${it.number} (${it.type})`)
          }
        }
        if (cf.entrega) {
          const title = `Entrega ${cf.entrega}`
          const iso = new Date(cf.entrega).toISOString()
          const mid = await ensureMilestone(title, iso)
          await assignMilestoneToItem(it.id, mid, it.type)
          setSyncLog(prev => prev + `\nMilestone "${title}" atribuído em #${it.number} (${it.type})`)
        }
      }
      setSyncLog(prev => prev + '\nSincronização concluída.')
    } catch (e: any) {
      console.error(e)
      setSyncLog(prev => prev + `\nErro: ${e?.message ?? 'Falha ao sincronizar'}`)
    } finally {
      setSyncing(false)
    }
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
        <select
          className="border rounded px-2 py-2"
          title="Agrupar por"
          aria-label="Agrupar por"
          value={groupingCol}
          onChange={e => setGroupingCol(e.target.value)}
        >
          <option value="none">Sem agrupamento</option>
          <option value="firstLabel">Label (primeira)</option>
          <option value="milestone">Milestone</option>
          <option value="state">Estado</option>
          <option value="repository">Repositório</option>
          <option value="type">Tipo</option>
        </select>
        <button
          className="px-3 py-2 bg-green-700 text-white rounded disabled:opacity-50"
          onClick={syncToGitHub}
          disabled={!token || !repositoryId || syncing}
          title="Sincronizar com GitHub"
          aria-label="Sincronizar com GitHub"
        >
          {syncing ? 'Sincronizando...' : 'Sincronizar com GitHub'}
        </button>
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
                    {cell.getIsGrouped() ? (
                      <button
                        className="mr-2 px-2 py-1 border rounded"
                        onClick={row.getToggleExpandedHandler()}
                      >
                        {row.getIsExpanded() ? '-' : '+'}
                      </button>
                    ) : null}
                    {cell.getIsGrouped()
                      ? `${cell.getValue()} (${row.subRows.length})`
                      : cell.getIsAggregated()
                        ? flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Campos customizados</h2>
        <div className="overflow-auto border rounded mt-2">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left px-3 py-2 border-b bg-slate-50">Item</th>
                <th className="text-left px-3 py-2 border-b bg-slate-50">Prioridade</th>
                <th className="text-left px-3 py-2 border-b bg-slate-50">Entrega</th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => {
                const cf = customFields[it.id] ?? {}
                return (
                  <tr key={it.id} className="odd:bg-white even:bg-slate-50">
                    <td className="px-3 py-2 border-b">{it.title}</td>
                    <td className="px-3 py-2 border-b">
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={cf.prioridade ?? ''}
                        onChange={e => updateCustomField(it.id, 'prioridade', e.target.value)}
                        placeholder="Ex.: Alta, Média, Baixa"
                        title="Prioridade"
                        aria-label="Prioridade"
                      />
                    </td>
                    <td className="px-3 py-2 border-b">
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={cf.entrega ?? ''}
                        onChange={e => updateCustomField(it.id, 'entrega', e.target.value)}
                        placeholder="Data de entrega"
                        title="Entrega"
                        aria-label="Entrega"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {!!syncLog && (
        <div className="mt-2 border rounded p-2 bg-slate-50 whitespace-pre-wrap text-sm">
          {syncLog}
        </div>
      )}
    </div>
  )
}

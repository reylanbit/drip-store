export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { scope = 'repo,read:org' } = req.body ?? {}
    const client_id = process.env.GITHUB_CLIENT_ID
    if (!client_id) {
      res.status(500).json({ error: 'Missing server env GITHUB_CLIENT_ID' })
      return
    }
    const params = new URLSearchParams({
      client_id,
      scope
    })
    const resp = await fetch('https://github.com/login/device/code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
      body: params
    })
    const data = await resp.json()
    res.status(200).json(data)
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? 'Unknown error' })
  }
}

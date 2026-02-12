export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  try {
    const { device_code } = req.body ?? {}
    if (!device_code) {
      res.status(400).json({ error: 'device_code required' })
      return
    }
    const client_id = process.env.GITHUB_CLIENT_ID
    const client_secret = process.env.GITHUB_CLIENT_SECRET
    if (!client_id || !client_secret) {
      res.status(500).json({ error: 'Missing server env GITHUB_CLIENT_ID/SECRET' })
      return
    }
    const params = new URLSearchParams({
      client_id,
      device_code,
      grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      client_secret
    })
    const resp = await fetch('https://github.com/login/oauth/access_token', {
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

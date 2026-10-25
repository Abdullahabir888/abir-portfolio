// Vercel Serverless Function — POST /api/contact
// Sends the contact form to your inbox via Resend (https://resend.com).
// Keys live in Vercel env vars only. Nothing secret reaches the browser.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const escape = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' })
    }
  }
  const { name = '', email = '', subject = '', message = '', company = '' } = body || {}

  // Honeypot: pretend success for bots
  if (company) return res.status(200).json({ ok: true })

  if (String(name).trim().length < 2 || !EMAIL_RE.test(String(email).trim()) || String(subject).trim().length < 3 || String(message).trim().length < 10) {
    return res.status(400).json({ ok: false, error: 'Please fill in all fields correctly' })
  }
  if (String(message).length > 5000 || String(subject).length > 200 || String(name).length > 100) {
    return res.status(400).json({ ok: false, error: 'Input too long' })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return res.status(500).json({ ok: false, error: 'Email service not configured' })
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [CONTACT_TO_EMAIL],
        reply_to: String(email).trim(),
        subject: `[Portfolio] ${String(subject).trim()}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `<p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p><p><strong>Subject:</strong> ${escape(subject)}</p><hr/><p style="white-space:pre-wrap">${escape(message)}</p>`,
      }),
    })
    if (!r.ok) {
      const detail = await r.text()
      console.error('Resend error', r.status, detail)
      return res.status(502).json({ ok: false, error: 'Email service error' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, error: 'Unexpected server error' })
  }
}

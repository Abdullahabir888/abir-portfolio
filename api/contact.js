// Vercel Serverless Function — POST /api/contact
// Sends the contact form to your inbox via Resend (https://resend.com).
// Keys live in Vercel env vars only. Nothing secret reaches the browser.

import { autoReplyTemplate, autoReplyText, notifyTemplate } from './_templates.js'
import { availability, pickRule } from './_availability.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

async function sendEmail(apiKey, payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
}

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
  const raw = body || {}

  // Honeypot: pretend success for bots
  if (raw.company) return res.status(200).json({ ok: true })

  const name = String(raw.name || '').trim()
  const email = String(raw.email || '').trim()
  const subject = String(raw.subject || '').trim()
  const message = String(raw.message || '').trim()

  if (name.length < 2 || !EMAIL_RE.test(email) || subject.length < 3 || message.length < 10) {
    return res.status(400).json({ ok: false, error: 'Please fill in all fields correctly' })
  }
  if (message.length > 5000 || subject.length > 200 || name.length > 100) {
    return res.status(400).json({ ok: false, error: 'Input too long' })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_AUTOREPLY, SITE_URL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return res.status(500).json({ ok: false, error: 'Email service not configured' })
  }

  const from = CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>'
  const site = SITE_URL || `https://${req.headers['x-forwarded-host'] || req.headers.host || 'abir-portfolio.vercel.app'}`

  try {
    // 1. Message to you
    await sendEmail(RESEND_API_KEY, {
      from,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `${subject}`, // the visitor's own subject
      text: `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n\nReply to this email to answer ${name}.`,
      html: notifyTemplate({ name, email, subject, message, site }),
    })
  } catch (err) {
    console.error(err)
    return res.status(502).json({ ok: false, error: 'Email service error' })
  }

  // 2. Optional thank-you to the sender. Needs a verified domain in Resend.
  //    Never fails the request: your copy already arrived.
  if (CONTACT_AUTOREPLY === 'true') {
    const rule = pickRule(subject, message) // job / project / meeting / general
    try {
      await sendEmail(RESEND_API_KEY, {
        from,
        to: [email],
        reply_to: CONTACT_TO_EMAIL,
        subject: `Re: ${subject}`,
        text: autoReplyText({ name, subject, message, site, rule, availability }),
        html: autoReplyTemplate({ name, subject, message, site, rule, availability, linkedin: 'https://www.linkedin.com/in/abdullah-al-ahad-abir/' }),
      })
    } catch (err) {
      console.error('Auto-reply failed', err)
    }
  }

  return res.status(200).json({ ok: true })
}

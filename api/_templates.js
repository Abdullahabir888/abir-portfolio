// Email templates for the contact form.
// Files starting with "_" inside /api are helpers, not endpoints, on Vercel.
// Table layout + inline styles so it renders the same in Gmail, Outlook and Apple Mail.

const RED = '#E11D2E'
const INK = '#0F1224'
const MUTED = '#5B6178'
const LINE = '#E6E8F0'
const BG = '#F4F5F9'

export const escape = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Red square with a white "A" whose crossbar is a check mark (same as the site logo)
const logo = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="width:36px;height:36px;background:${RED};border-radius:9px;text-align:center;vertical-align:middle;color:#ffffff;font:700 20px/36px Arial,Helvetica,sans-serif;">A</td>
    <td style="padding-left:10px;font:700 18px Arial,Helvetica,sans-serif;letter-spacing:3px;color:${INK};">AB<span style="color:${RED};">I</span>R</td>
  </tr></table>`

function shell({ preheader, body, footer }) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>ABIR</title></head>
<body style="margin:0;padding:0;background:${BG};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${LINE};">
      <tr><td style="height:4px;background:${RED};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:24px 28px 8px;">${logo}</td></tr>
      ${body}
      <tr><td style="padding:18px 28px 24px;border-top:1px solid ${LINE};font:12px/1.6 Arial,Helvetica,sans-serif;color:${MUTED};">${footer}</td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

const btn = (href, label) =>
  `<a href="${href}" style="display:inline-block;background:${RED};color:#ffffff;text-decoration:none;font:700 14px Arial,Helvetica,sans-serif;padding:12px 22px;border-radius:999px;">${label}</a>`

/** Email YOU receive when someone sends the form. */
export function notifyTemplate({ name, email, subject, message, site }) {
  const when = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Dhaka', dateStyle: 'medium', timeStyle: 'short' })
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: ' + subject)}`
  const row = (label, value) => `
    <tr>
      <td style="padding:8px 0;width:90px;vertical-align:top;font:12px Arial,Helvetica,sans-serif;color:${MUTED};text-transform:uppercase;letter-spacing:1px;">${label}</td>
      <td style="padding:8px 0;font:15px Arial,Helvetica,sans-serif;color:${INK};">${value}</td>
    </tr>`

  const body = `
      <tr><td style="padding:8px 28px 0;">
        <p style="margin:0 0 4px;font:700 22px/1.3 Arial,Helvetica,sans-serif;color:${INK};">New message from your portfolio</p>
        <p style="margin:0;font:14px Arial,Helvetica,sans-serif;color:${MUTED};">${escape(when)} (Dhaka time)</p>
      </td></tr>
      <tr><td style="padding:20px 28px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${row('Name', `<strong>${escape(name)}</strong>`)}
          ${row('Email', `<a href="mailto:${escape(email)}" style="color:${RED};text-decoration:none;">${escape(email)}</a>`)}
          ${row('Subject', escape(subject))}
        </table>
      </td></tr>
      <tr><td style="padding:16px 28px 0;">
        <div style="background:${BG};border-left:3px solid ${RED};border-radius:8px;padding:16px 18px;font:15px/1.65 Arial,Helvetica,sans-serif;color:${INK};white-space:pre-wrap;">${escape(message)}</div>
      </td></tr>
      <tr><td style="padding:22px 28px 24px;">${btn(replyHref, `Reply to ${escape(name.split(' ')[0])}`)}</td></tr>`

  return shell({
    preheader: `${name}: ${message.slice(0, 90)}`,
    body,
    footer: `Sent from the contact form on <a href="${site}" style="color:${MUTED};">${escape(site.replace(/^https?:\/\//, ''))}</a>. Just hit Reply to answer them directly.`,
  })
}

/** Thank-you email the SENDER receives. Wording depends on their subject; shows your availability. */
export function autoReplyTemplate({ name, subject, message, site, linkedin, rule, availability }) {
  const first = escape(name.split(' ')[0])
  const p = (t) => `<p style="margin:0 0 12px;font:15px/1.65 Arial,Helvetica,sans-serif;color:${INK};">${t}</p>`
  const slots = availability.slots
    .map((s) => `<tr><td style="padding:5px 0;font:14px Arial,Helvetica,sans-serif;color:${INK};"><span style="color:${RED};">&#9679;</span>&nbsp;&nbsp;${escape(s)}</td></tr>`)
    .join('')
  const body = `
      <tr><td style="padding:8px 28px 0;">
        <p style="margin:0 0 14px;font:700 22px/1.3 Arial,Helvetica,sans-serif;color:${INK};">Hi ${first}. ${escape(rule.heading)}</p>
        ${rule.lines.map((l) => p(escape(l))).join('')}
      </td></tr>
      <tr><td style="padding:6px 28px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${LINE};border-radius:10px;">
          <tr><td style="padding:14px 18px 4px;font:700 12px Arial,Helvetica,sans-serif;letter-spacing:1px;text-transform:uppercase;color:${RED};">My availability · ${escape(availability.timezone)}</td></tr>
          <tr><td style="padding:2px 18px 6px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0">${slots}</table></td></tr>
          <tr><td style="padding:4px 18px 14px;font:13px Arial,Helvetica,sans-serif;color:${MUTED};">I usually reply ${escape(availability.replyTime)}.</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:18px 28px 0;">
        <p style="margin:0 0 8px;font:13px Arial,Helvetica,sans-serif;color:${MUTED};">Your message:</p>
        <div style="background:${BG};border-left:3px solid ${RED};border-radius:8px;padding:14px 16px;font:14px/1.6 Arial,Helvetica,sans-serif;color:${INK};">
          <strong>${escape(subject)}</strong><br><span style="white-space:pre-wrap;color:${MUTED};">${escape(message)}</span>
        </div>
      </td></tr>
      <tr><td style="padding:22px 28px 6px;font:15px/1.6 Arial,Helvetica,sans-serif;color:${INK};">
        Best,<br><strong>Abdullah Al Ahad Abir</strong><br><span style="color:${MUTED};">SQA Engineer · Manual &amp; Automation</span>
      </td></tr>
      <tr><td style="padding:14px 28px 24px;">
        ${availability.bookingUrl ? btn(availability.bookingUrl, 'Book a time') + '&nbsp;&nbsp;' : ''}${btn(site, 'Visit my portfolio')}
      </td></tr>`

  return shell({
    preheader: `${rule.heading} My availability inside.`,
    body,
    footer: `You're getting this because you used the contact form on my portfolio. Just reply to this email to continue the conversation.${linkedin ? ` · <a href="${linkedin}" style="color:${MUTED};">LinkedIn</a>` : ''}`,
  })
}

/** Plain-text version of the auto-reply (for email apps that block HTML). */
export function autoReplyText({ name, subject, message, site, rule, availability }) {
  return [
    `Hi ${name.split(' ')[0]}. ${rule.heading}`,
    '',
    ...rule.lines,
    '',
    `My availability (${availability.timezone}):`,
    ...availability.slots.map((s) => `- ${s}`),
    `I usually reply ${availability.replyTime}.`,
    availability.bookingUrl ? `Book a time: ${availability.bookingUrl}` : '',
    '',
    `Your message: ${subject}`,
    message,
    '',
    'Best,',
    'Abdullah Al Ahad Abir',
    'SQA Engineer · Manual & Automation',
    site,
  ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n')
}

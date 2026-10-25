// ─────────────────────────────────────────────────────────────
// Your availability + auto-reply wording. Edit freely.
// Shown in the thank-you email visitors get (when CONTACT_AUTOREPLY=true).
// ─────────────────────────────────────────────────────────────

export const availability = {
  timezone: 'Dhaka (GMT+6)',
  // One line per slot. Change these to your real hours.
  slots: [
    'Sunday – Thursday: 7:00 PM – 10:00 PM',
    'Friday – Saturday: 10:00 AM – 6:00 PM',
  ],
  replyTime: 'within 1–2 working days',
  // Optional: a booking link (Calendly, Google Calendar, etc.). Leave '' to hide the button.
  bookingUrl: '',
}

// The reply changes based on what the visitor's subject/message is about.
// First matching rule wins. Words are matched case-insensitively.
export const replyRules = [
  {
    id: 'job',
    match: ['job', 'hiring', 'hire', 'role', 'position', 'vacancy', 'opportunity', 'interview', 'career', 'recruit', 'opening', 'offer'],
    heading: 'Thanks for thinking of me for this role.',
    lines: [
      "I'm open to SQA, Automation Test Engineer and Software Test Engineer roles.",
      'I can do an interview call during the times below. Send a time that suits you and I will confirm.',
    ],
  },
  {
    id: 'project',
    match: ['freelance', 'project', 'contract', 'testing service', 'test my', 'qa for', 'audit', 'automation for', 'quote', 'collaborat'],
    heading: 'Thanks for sharing your project.',
    lines: [
      "I'll review the details and come back with questions, a rough testing plan and next steps.",
      "If it's easier, we can talk it through on a short call during the times below.",
    ],
  },
  {
    id: 'meeting',
    match: ['call', 'meeting', 'meet', 'schedule', 'chat', 'talk', 'zoom', 'google meet'],
    heading: 'Happy to have a call.',
    lines: ['Pick any slot below that works for you and I will send an invite.'],
  },
  {
    id: 'general',
    match: [], // fallback
    heading: 'Got your message.',
    lines: ['I read every message myself and will get back to you soon.'],
  },
]

export function pickRule(subject = '', message = '') {
  const text = `${subject} ${message}`.toLowerCase()
  return replyRules.find((r) => r.match.length === 0 || r.match.some((w) => text.includes(w)))
}

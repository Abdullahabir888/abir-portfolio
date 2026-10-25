import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, LoaderCircle, Mail, MapPin, Phone, Send, XCircle } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, Reveal, SectionHeading, ease } from './ui'

const empty = { name: '', email: '', subject: '', message: '', company: '' } // company = honeypot
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email.'
  if (v.subject.trim().length < 3) e.subject = 'Add a short subject.'
  if (v.message.trim().length < 10) e.message = 'Message needs at least 10 characters.'
  if (v.message.length > 5000) e.message = 'Message is too long (5000 max).'
  return e
}

function Field({ id, label, error, as = 'input', ...rest }) {
  const C = as
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <C
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`field ${error ? '!border-fail' : ''} ${as === 'textarea' ? 'min-h-[140px] resize-y' : ''}`}
        {...rest}
      />
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-fail">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus({ state: 'sending', msg: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || `Request failed (${res.status})`)
      setStatus({ state: 'success', msg: "Thanks! Your message is in my inbox. I'll reply soon." })
      setValues(empty)
    } catch (err) {
      setStatus({
        state: 'error',
        msg: `Couldn't send right now (${err.message}). Please email me directly at ${profile.email}.`,
      })
    }
  }

  const channels = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    profile.links.linkedin && { icon: LinkedInIcon, label: 'LinkedIn', value: 'abdullah-al-ahad-abir', href: profile.links.linkedin, ext: true },
    profile.links.github && { icon: GitHubIcon, label: 'GitHub', value: profile.links.github.replace(/^https?:\/\/(www\.)?/, ''), href: profile.links.github, ext: true },
    { icon: MapPin, label: 'Location', value: profile.location },
  ].filter(Boolean)

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-80 max-w-4xl rounded-full bg-blue/10 blur-[120px]" />
      <div className="container-site relative">
        <SectionHeading eyebrow="08 · Contact" title="Let's work together" sub="Hiring for QA, automation or test engineering? Drop a message." />

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="space-y-3">
            {channels.map((c) => {
              const I = c.icon
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                    <I size={20} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{c.label}</span>
                    <span className="block truncate font-medium">{c.value}</span>
                  </span>
                </>
              )
              return c.href ? (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.ext ? '_blank' : undefined}
                  rel={c.ext ? 'noreferrer' : undefined}
                  whileHover={{ x: 4 }}
                  className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-blue/50"
                >
                  {inner}
                </motion.a>
              ) : (
                <div key={c.label} className="glass flex items-center gap-4 rounded-2xl p-4">
                  {inner}
                </div>
              )
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} placeholder="Your name" />
                <Field id="email" label="Email" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} placeholder="you@company.com" />
              </div>
              <Field id="subject" label="Subject" value={values.subject} onChange={set('subject')} error={errors.subject} placeholder="QA Engineer role at …" />
              <Field id="message" label="Message" as="textarea" value={values.message} onChange={set('message')} error={errors.message} placeholder="Tell me about the role or project." />

              {/* honeypot: hidden from people, bots fill it */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
              </div>

              <motion.button
                type="submit"
                disabled={status.state === 'sending'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {status.state === 'sending' ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </motion.button>

              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {(status.state === 'success' || status.state === 'error') && (
                    <motion.p
                      key={status.state}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className={`flex items-start gap-2 rounded-xl p-3 text-sm ${
                        status.state === 'success' ? 'bg-pass/10 text-pass' : 'bg-fail/10 text-fail'
                      }`}
                    >
                      {status.state === 'success' ? <CheckCircle2 size={18} className="shrink-0" /> : <XCircle size={18} className="shrink-0" />}
                      {status.msg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

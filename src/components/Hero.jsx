import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Mail, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, ease } from './ui'

const chips = [
  { label: 'Selenium', cls: 'left-[2%] top-[18%]', d: 0 },
  { label: 'Postman', cls: 'right-[0%] top-[8%]', d: 0.8 },
  { label: 'Jira', cls: 'right-[4%] top-[46%]', d: 1.6 },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const nameParts = profile.name.split(' ')
  const nameLast = nameParts.pop()
  const nameStart = nameParts.join(' ')
  const words1 = profile.headline[0].split(' ')
  const words2 = profile.headline[1].split(' ')

  const word = (w, i, base, grad) => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
      <motion.span
        className={`inline-block ${grad ? 'grad-text' : ''}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease, delay: base + i * 0.07 }}
      >
        {w}&nbsp;
      </motion.span>
    </span>
  )

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-blue/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[380px] w-[380px] rounded-full bg-violet/25 blur-[120px]" />

      <div className="container-site relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pass opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pass" />
            </span>
            {profile.badge}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="mb-4 font-display text-lg font-bold uppercase tracking-[0.14em] text-ink/90 sm:text-xl"
          >
            <span className="sr-only">Hi, I'm </span>
            {nameStart} <span className="text-[#E11D2E]">{nameLast}</span>
          </motion.p>

          <h1 className="text-[2.35rem] font-bold leading-[1.05] sm:text-5xl lg:text-[4rem]">
            <span className="block">{words1.map((w, i) => word(w, i, 0.2, false))}</span>
            <span className="block">{words2.map((w, i) => word(w, i, 0.45, true))}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.9 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.05 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#projects" className="btn-primary">
              View My Projects <ArrowRight size={16} />
            </motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#skills" className="btn-ghost">
              <Sparkles size={16} /> Explore My Skills
            </motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href={profile.resume} download className="btn-ghost">
              <Download size={16} /> Download Resume
            </motion.a>
            <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} href="#contact" className="btn-ghost">
              <Mail size={16} /> Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {profile.location}
            </span>
            {profile.links.linkedin && (
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink" aria-label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" /> LinkedIn
              </a>
            )}
            {profile.links.github && (
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink" aria-label="GitHub">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
            )}
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.35 }}
            className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line border-y border-line py-4"
          >
            {profile.stats.map((s) => (
              <div key={s.label} className="px-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold sm:text-3xl">{s.value}</dd>
                <dd className="text-xs text-muted">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="relative mx-auto h-[440px] w-full max-w-[400px] sm:h-[520px] lg:h-[600px]"
        >
          <div className="absolute inset-x-6 bottom-0 top-16 rounded-[2.5rem] bg-gradient-to-b from-blue/30 via-violet/25 to-transparent" />
          <div className="absolute inset-x-6 bottom-0 top-16 rounded-[2.5rem] border border-line/60" />
          <motion.div
            className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full border border-dashed border-blue/40"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width="582"
            height="1065"
            className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 object-contain object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
            style={{ maskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent 100%)' }}
            fetchpriority="high"
          />

          {chips.map((c) => (
            <motion.span
              key={c.label}
              className={`glass absolute ${c.cls} rounded-full px-3 py-1.5 font-mono text-[11px] text-ink shadow-lg`}
              initial={{ opacity: 0, y: 10 }}
              animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
              transition={
                reduce
                  ? { delay: 1.2 + c.d / 2 }
                  : { opacity: { delay: 1.2 + c.d / 2 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: c.d } }
              }
              aria-hidden="true"
            >
              <span className="text-pass">●</span> {c.label}
            </motion.span>
          ))}

        </motion.div>
      </div>
    </section>
  )
}

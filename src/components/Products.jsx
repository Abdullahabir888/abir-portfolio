import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { products } from '../data/products'
import { SectionHeading, item, stagger } from './ui'

const tagColor = {
  Telecom: 'from-orange-500 to-amber-400',
  Fintech: 'from-emerald-500 to-teal-400',
  'E-commerce': 'from-sky-500 to-blue-500',
  Streaming: 'from-fuchsia-500 to-pink-500',
  Healthtech: 'from-cyan-500 to-emerald-400',
  'Travel SaaS': 'from-indigo-500 to-violet-500',
}

const host = (u) => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')

export default function Products() {
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="04 · Shipped" title="Live products I've tested" sub="Real apps. Real users. Tested before they went out." />

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {products.map((p) => (
            <motion.li key={p.url} variants={item}>
              <motion.a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass group flex h-full items-start gap-4 rounded-2xl p-5 transition-colors hover:border-blue/50"
                aria-label={`${p.name} — ${p.text} (opens in new tab)`}
              >
                {p.logo ? (
                  <span className={`grid h-14 w-20 shrink-0 place-items-center overflow-hidden rounded-xl p-1.5 shadow-lg ring-1 ${p.logoBg === 'dark' ? 'bg-black ring-white/10' : 'bg-white ring-black/5'}`}>
                    <img src={p.logo} alt={`${p.name} logo`} loading="lazy" className="h-full w-full object-contain" />
                  </span>
                ) : (
                  <span
                    className={`grid h-14 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${tagColor[p.tag] || 'from-blue to-violet'} font-display text-xl font-bold text-white shadow-lg`}
                    aria-hidden="true"
                  >
                    {p.name.charAt(0)}
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-semibold">{p.name}</span>
                    {p.badge && <span className="rounded-full bg-pass/15 px-2 py-0.5 text-[10px] font-semibold text-pass">{p.badge}</span>}
                    <ArrowUpRight size={16} className="ml-auto shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                  </span>
                  {p.company && <span className="block text-xs font-medium text-blue">at {p.company}</span>}
                  <span className="mt-1 block text-sm leading-snug text-muted">{p.text}</span>
                  <span className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted/80">
                    <span className="rounded-full border border-line px-2 py-0.5">{p.tag}</span>
                    <span className="truncate">{host(p.url)}</span>
                  </span>
                </span>
              </motion.a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

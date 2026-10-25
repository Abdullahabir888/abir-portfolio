import { motion } from 'framer-motion'
import { Award, BookOpen, ExternalLink, GraduationCap, Languages, Users } from 'lucide-react'
import { certifications, education, extras } from '../data/education'
import { Reveal, SectionHeading, item, stagger } from './ui'

const extraIcons = { 'Published Research': BookOpen, Leadership: Users, Languages }

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="container-site">
        <SectionHeading eyebrow="07 · Education" title="Learning never stops" />

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div className="space-y-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {education.map((e) => (
              <motion.article key={e.degree} variants={item} className="glass flex gap-4 rounded-2xl p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue/20 to-violet/20 text-blue">
                  <GraduationCap size={22} />
                </span>
                <div>
                  <p className="font-mono text-xs text-blue">{e.period}</p>
                  <h3 className="mt-1 font-semibold leading-snug">{e.degree}</h3>
                  <p className="text-sm text-ink/80">{e.school}</p>
                  {e.note && <p className="mt-1 text-sm text-muted">{e.note}</p>}
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="space-y-4">
            {certifications.length > 0 && (
              <Reveal className="glass rounded-2xl p-6">
                <h3 className="label-mono mb-4">Certifications</h3>
                <ul className="space-y-3">
                  {certifications.map((c) => (
                    <li key={c.name} className="flex items-start gap-3">
                      <Award size={20} className="mt-0.5 shrink-0 text-violet" />
                      <div>
                        <p className="font-medium leading-snug">
                          {c.url ? (
                            <a href={c.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-blue">
                              {c.name} <ExternalLink size={13} />
                            </a>
                          ) : (
                            c.name
                          )}
                        </p>
                        <p className="text-sm text-muted">
                          {c.issuer}
                          {c.year && ` · ${c.year}`}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={0.1} className="glass rounded-2xl p-6">
              <ul className="space-y-4">
                {extras.map((x) => {
                  const I = extraIcons[x.label] || BookOpen
                  return (
                    <li key={x.label} className="flex items-start gap-3">
                      <I size={18} className="mt-0.5 shrink-0 text-blue" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{x.label}</p>
                        <p className="text-sm">{x.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

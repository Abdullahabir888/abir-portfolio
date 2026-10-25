import { Mail } from 'lucide-react'
import { navLinks, profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './ui'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-site flex flex-col items-center justify-between gap-6 text-sm text-muted md:flex-row">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <a href="#top" aria-label="Back to top">
            <Logo size={28} />
          </a>
        <p>
          © {new Date().getFullYear()} {profile.name}.
        </p>
        </div>
        <ul className="flex flex-wrap justify-center gap-4">
          {navLinks.slice(0, 4).map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-3">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:text-ink">
            <Mail size={16} />
          </a>
          {profile.links.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:text-ink">
              <LinkedInIcon className="h-4 w-4" />
            </a>
          )}
          {profile.links.github && (
            <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-line hover:text-ink">
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

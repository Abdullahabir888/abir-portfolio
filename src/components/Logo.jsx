// ABIR logo: red mark (an "A" whose crossbar is a check ✓) + wordmark with a red "I".
export function LogoMark({ size = 32, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="abir-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF4757" />
          <stop offset="1" stopColor="#C8102E" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#abir-red)" />
      <path d="M12.5 37 L24 10.5 L35.5 37" fill="none" stroke="#fff" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.6 27.6 L21.4 31 L29.2 22.4" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Logo({ size = 32 }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span className="font-display text-lg font-bold tracking-[0.16em] text-ink">
        AB<span className="text-[#E11D2E]">I</span>R
      </span>
    </span>
  )
}

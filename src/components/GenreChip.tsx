import { Link } from 'react-router-dom'

export function GenreChip({
  slug,
  name,
  active = false,
}: {
  slug: string
  name: string
  active?: boolean
}) {
  return (
    <Link
      to={`/genre/${slug}`}
      className={`inline-flex items-center px-3 py-1.5 text-xs font-mono uppercase tracking-wide
        border transition-colors whitespace-nowrap
        ${active
          ? 'border-seal bg-seal/15 text-seal-bright'
          : 'border-ink-line text-paper-muted hover:border-gold hover:text-gold'}`}
    >
      {name}
    </Link>
  )
}

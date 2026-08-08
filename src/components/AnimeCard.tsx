import { Link } from 'react-router-dom'
import { Play, Star } from 'lucide-react'
import type { AnimeSummary } from '../lib/api'

export function AnimeCard({ anime, index }: { anime: AnimeSummary; index?: number }) {
  const poster = anime.poster || anime.image
  return (
    <Link to={`/anime/${anime.slug}`} className="group block">
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm border border-ink-line bg-ink-card">
        {poster ? (
          <img
            src={poster}
            alt={anime.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-paper-muted font-display text-sm">
            {anime.title}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-10 w-10 rounded-full bg-seal/90 flex items-center justify-center">
            <Play size={16} className="text-paper ml-0.5" fill="currentColor" />
          </div>
        </div>

        {anime.episode && (
          <span className="seal absolute top-2 right-2 h-8 min-w-8 px-2 text-[11px]">
            {anime.episode}
          </span>
        )}

        {typeof index === 'number' && (
          <span className="absolute -left-1 -top-1 font-display text-4xl text-ink-line/80 [-webkit-text-stroke:1px_rgba(236,229,211,0.25)]">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        {anime.rating && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-ink/80 px-1.5 py-0.5 text-[11px] font-mono text-gold">
            <Star size={11} fill="currentColor" />
            {anime.rating}
          </div>
        )}
      </div>

      <div className="mt-2">
        <p className="font-display text-sm text-paper leading-snug line-clamp-2 group-hover:text-seal-bright transition-colors">
          {anime.title}
        </p>
        <p className="mt-0.5 text-[11px] font-mono uppercase tracking-wide text-paper-muted">
          {[anime.type, anime.status].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}

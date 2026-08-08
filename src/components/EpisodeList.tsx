import { Link } from 'react-router-dom'
import { PlayCircle } from 'lucide-react'
import type { Episode } from '../lib/api'

export function EpisodeList({
  slug,
  episodes,
  activeEpisode,
  layout = 'grid',
}: {
  slug: string
  episodes: Episode[]
  activeEpisode?: string | number
  layout?: 'grid' | 'list'
}) {
  if (!episodes?.length) return null

  if (layout === 'list') {
    return (
      <div className="flex flex-col divide-y divide-ink-line border border-ink-line">
        {episodes.map((ep) => {
          const isActive = String(ep.episode) === String(activeEpisode)
          return (
            <Link
              key={String(ep.episode)}
              to={`/watch/${slug}/${ep.episode}`}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors
                ${isActive ? 'bg-seal/10 text-seal-bright' : 'text-paper hover:bg-ink-card'}`}
            >
              <PlayCircle size={16} className={isActive ? 'text-seal-bright' : 'text-paper-muted'} />
              <span className="font-mono">Eps {ep.episode}</span>
              {ep.title && <span className="text-paper-muted truncate">— {ep.title}</span>}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
      {episodes.map((ep) => {
        const isActive = String(ep.episode) === String(activeEpisode)
        return (
          <Link
            key={String(ep.episode)}
            to={`/watch/${slug}/${ep.episode}`}
            className={`flex items-center justify-center h-10 text-sm font-mono border transition-colors
              ${isActive
                ? 'border-seal bg-seal/15 text-seal-bright'
                : 'border-ink-line text-paper hover:border-gold hover:text-gold'}`}
          >
            {ep.episode}
          </Link>
        )
      })}
    </div>
  )
}

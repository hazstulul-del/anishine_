import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Play, ChevronDown } from 'lucide-react'
import { useAnimeDetail } from '../lib/hooks/useAnichin'
import { EpisodeList } from '../components/EpisodeList'
import { GenreChip } from '../components/GenreChip'
import { DetailSkeleton } from '../components/Skeleton'
import { ErrorState } from '../components/ErrorState'
import { useFavoritesStore } from '../store/favoritesStore'

export default function AnimeDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: anime, isLoading, isError, error, refetch } = useAnimeDetail(slug)
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const [expanded, setExpanded] = useState(false)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <DetailSkeleton />
      </div>
    )
  }

  if (isError || !anime) {
    return (
      <ErrorState
        message={(error as Error)?.message || 'Anime tidak ditemukan.'}
        onRetry={() => refetch()}
      />
    )
  }

  const poster = anime.poster || anime.image
  const favorited = isFavorite(anime.slug)
  const firstEpisode = anime.episodes?.[0]
  const synopsis = anime.synopsis || ''
  const isLong = synopsis.length > 320

  return (
    <div>
      {/* Backdrop */}
      <div className="relative h-56 sm:h-72 w-full overflow-hidden border-b border-ink-line">
        {poster && (
          <img src={poster} alt="" className="h-full w-full object-cover blur-md scale-110 opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 -mt-28 relative z-10 pb-16">
        <div className="grid sm:grid-cols-[200px_1fr] gap-6 sm:gap-8">
          <div className="aspect-[2/3] w-40 sm:w-full mx-auto sm:mx-0 border border-ink-line bg-ink-card overflow-hidden shadow-2xl">
            {poster ? (
              <img src={poster} alt={anime.title} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-paper-muted font-display text-sm px-2 text-center">
                {anime.title}
              </div>
            )}
          </div>

          <div className="pt-2 sm:pt-24">
            <p className="eyebrow mb-2">
              {[anime.type, anime.status].filter(Boolean).join(' · ') || 'Anime'}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl text-paper leading-tight">
              {anime.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-mono text-paper-muted">
              {anime.year && <span>{anime.year}</span>}
              {anime.rating && (
                <span className="text-gold">★ {anime.rating}</span>
              )}
            </div>

            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {anime.genres.map((g) => (
                  <GenreChip key={g} slug={g.toLowerCase().replace(/\s+/g, '-')} name={g} />
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 mt-6">
              {firstEpisode && (
                <Link
                  to={`/watch/${anime.slug}/${firstEpisode.episode}`}
                  className="inline-flex items-center gap-2 bg-seal hover:bg-seal-bright transition-colors px-5 py-2.5 text-sm font-medium text-paper"
                >
                  <Play size={15} fill="currentColor" />
                  Mulai Nonton
                </Link>
              )}
              <button
                onClick={() =>
                  toggleFavorite({
                    slug: anime.slug,
                    title: anime.title,
                    poster: anime.poster,
                    image: anime.image,
                    type: anime.type,
                    status: anime.status,
                  })
                }
                className={`inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors
                  ${favorited ? 'border-seal text-seal-bright' : 'border-ink-line text-paper hover:border-gold hover:text-gold'}`}
              >
                <Heart size={15} fill={favorited ? 'currentColor' : 'none'} />
                {favorited ? 'Difavoritkan' : 'Favoritkan'}
              </button>
            </div>
          </div>
        </div>

        {synopsis && (
          <div className="mt-10">
            <p className="eyebrow mb-3">Sinopsis</p>
            <p className={`text-sm text-paper-dim leading-relaxed ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
              {synopsis}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-mono text-gold hover:text-gold-soft"
              >
                {expanded ? 'Tutup' : 'Baca selengkapnya'}
                <ChevronDown size={13} className={expanded ? 'rotate-180' : ''} />
              </button>
            )}
          </div>
        )}

        {anime.episodes && anime.episodes.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <p className="eyebrow">Daftar Episode</p>
              <div className="h-px flex-1 bg-ink-line" />
              <span className="font-mono text-xs text-paper-muted">
                {anime.episodes.length} eps
              </span>
            </div>
            <EpisodeList slug={anime.slug} episodes={anime.episodes} />
          </div>
        )}
      </div>
    </div>
  )
}

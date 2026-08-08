import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAnimeDetail, useVideoSource } from '../lib/hooks/useAnichin'
import { VideoPlayer } from '../components/VideoPlayer'
import { EpisodeList } from '../components/EpisodeList'
import { ErrorState } from '../components/ErrorState'
import { useHistoryStore } from '../store/favoritesStore'

export default function Watch() {
  const { slug, episode } = useParams<{ slug: string; episode: string }>()
  const { data: anime, isLoading: loadingAnime } = useAnimeDetail(slug)

  const episodeSlug = anime?.episodes?.find(
    (e) => String(e.episode) === String(episode)
  )?.slug

  const {
    data: source,
    isLoading: loadingSource,
    isError,
    error,
    refetch,
  } = useVideoSource(episodeSlug)

  const addToHistory = useHistoryStore((s) => s.addToHistory)

  useEffect(() => {
    if (anime && slug && episode) {
      addToHistory({ slug, episode, title: anime.title })
    }
  }, [anime, slug, episode, addToHistory])

  const episodes = anime?.episodes || []
  const currentIdx = episodes.findIndex((e) => String(e.episode) === String(episode))
  const prevEp = currentIdx > 0 ? episodes[currentIdx - 1] : undefined
  const nextEp = currentIdx >= 0 && currentIdx < episodes.length - 1 ? episodes[currentIdx + 1] : undefined

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-4 flex items-center gap-2 text-xs font-mono text-paper-muted">
        <Link to={`/anime/${slug}`} className="hover:text-paper truncate">
          {anime?.title || slug}
        </Link>
        <span>/</span>
        <span className="text-paper">Episode {episode}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          {loadingSource || loadingAnime ? (
            <div className="aspect-video w-full bg-ink-card border border-ink-line animate-pulse" />
          ) : isError ? (
            <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
          ) : (
            <VideoPlayer source={source} />
          )}

          <div className="flex items-center justify-between mt-4">
            {prevEp ? (
              <Link
                to={`/watch/${slug}/${prevEp.episode}`}
                className="inline-flex items-center gap-1.5 border border-ink-line px-4 py-2 text-sm text-paper hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft size={15} />
                Episode {prevEp.episode}
              </Link>
            ) : <span />}

            {nextEp ? (
              <Link
                to={`/watch/${slug}/${nextEp.episode}`}
                className="inline-flex items-center gap-1.5 bg-seal hover:bg-seal-bright transition-colors px-4 py-2 text-sm text-paper"
              >
                Episode {nextEp.episode}
                <ChevronRight size={15} />
              </Link>
            ) : <span />}
          </div>

          {!loadingAnime && anime && (
            <div className="mt-8 border-t border-ink-line pt-6">
              <h1 className="font-display text-xl text-paper mb-2">{anime.title}</h1>
              {anime.synopsis && (
                <p className="text-sm text-paper-dim leading-relaxed line-clamp-3">
                  {anime.synopsis}
                </p>
              )}
            </div>
          )}
        </div>

        <aside className="lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:sticky lg:top-24">
          <p className="eyebrow mb-3">Daftar Episode</p>
          {episodes.length > 0 ? (
            <EpisodeList slug={slug!} episodes={episodes} activeEpisode={episode} layout="list" />
          ) : (
            <div className="h-24 bg-ink-card border border-ink-line animate-pulse" />
          )}
        </aside>
      </div>
    </div>
  )
}

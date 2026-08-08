import { useParams } from 'react-router-dom'
import { useGenres } from '../lib/hooks/useAnichin'
import { GenreChip } from '../components/GenreChip'
import { ErrorState } from '../components/ErrorState'

// Note: the Anichin API's /genres endpoint lists genres. Filtering anime by a
// specific genre slug depends on a per-genre endpoint from the same API
// (e.g. /genre/{slug}) — wire that up in lib/api.ts as `getByGenre` once
// confirmed, then swap the placeholder below for a real AnimeCard grid.

export default function GenrePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: genres, isLoading, isError, error, refetch } = useGenres()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <p className="eyebrow mb-3">Genre</p>
      <h1 className="font-display text-3xl text-paper mb-8">
        {slug ? `Anime bergenre ${slug.replace(/-/g, ' ')}` : 'Semua Genre'}
      </h1>

      {isLoading && (
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-ink-card animate-pulse" />
          ))}
        </div>
      )}

      {isError && <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />}

      {!isLoading && !isError && (
        <div className="flex flex-wrap gap-2 mb-10">
          {genres?.map((g) => (
            <GenreChip key={g.slug} slug={g.slug} name={g.name} active={g.slug === slug} />
          ))}
        </div>
      )}

      {slug && (
        <div className="border border-dashed border-ink-line p-8 text-center">
          <p className="text-sm text-paper-muted">
            Hasil untuk genre ini akan tampil di sini setelah endpoint filter genre
            tersambung pada <code className="text-gold">lib/api.ts</code>.
          </p>
        </div>
      )}
    </div>
  )
}

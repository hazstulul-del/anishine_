import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { AnimeCard } from '../components/AnimeCard'
import { PosterGridSkeleton } from '../components/Skeleton'
import { ErrorState, EmptyState } from '../components/ErrorState'
import { useSearchAnime } from '../lib/hooks/useAnichin'

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const { data, isLoading, isError, error, refetch } = useSearchAnime(query)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-8 max-w-xl">
        <p className="eyebrow mb-3">Pencarian</p>
        <SearchBar />
      </div>

      {query.length <= 1 && (
        <EmptyState title="Ketik minimal 2 huruf" hint="Cari judul anime atau donghua favoritmu." />
      )}

      {query.length > 1 && (
        <>
          <p className="text-sm text-paper-muted mb-6">
            Hasil untuk <span className="text-paper">“{query}”</span>
          </p>

          {isLoading && <PosterGridSkeleton />}

          {isError && (
            <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
          )}

          {!isLoading && !isError && data?.length === 0 && (
            <EmptyState
              title="Tidak ditemukan"
              hint="Coba kata kunci lain, atau periksa ejaan judulnya."
            />
          )}

          {!isLoading && !isError && data && data.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.map((anime, i) => (
                <AnimeCard key={anime.slug + i} anime={anime} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

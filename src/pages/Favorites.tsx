import { AnimeCard } from '../components/AnimeCard'
import { EmptyState } from '../components/ErrorState'
import { useFavoritesStore } from '../store/favoritesStore'

export default function Favorites() {
  const favorites = useFavoritesStore((s) => s.favorites)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <p className="eyebrow mb-3">Tersimpan Lokal</p>
      <h1 className="font-display text-3xl text-paper mb-8">Favorit Saya</h1>

      {favorites.length === 0 ? (
        <EmptyState
          title="Belum ada favorit"
          hint="Tekan tombol Favoritkan di halaman detail anime untuk menyimpannya di sini."
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {favorites.map((anime) => (
            <AnimeCard key={anime.slug} anime={anime} />
          ))}
        </div>
      )}
    </div>
  )
}

import { Link } from 'react-router-dom'
import { useHome, useGenres } from '../lib/hooks/useAnichin'
import { AnimeCard } from '../components/AnimeCard'
import { GenreChip } from '../components/GenreChip'
import { PosterGridSkeleton } from '../components/Skeleton'
import { ErrorState } from '../components/ErrorState'
import { Play, Sparkles } from 'lucide-react'

export default function Home() {
  const { data: sections, isLoading, isError, error, refetch } = useHome()
  const { data: genres } = useGenres()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <section className="relative overflow-hidden border border-ink-line bg-ink-card mb-12 rounded-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-seal/20 via-transparent to-gold/10 pointer-events-none" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-seal/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="grid md:grid-cols-[1fr_auto] relative z-10">
          <div className="p-8 sm:p-12 md:p-16">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-gold/30 bg-gold/5">
              <Sparkles size={12} className="text-gold" />
              <span className="eyebrow !text-gold">Fansub Donghua Sub Indo</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-paper max-w-xl">
              Anishine
              <span className="block text-seal-bright mt-1">tanpa jeda cerita.</span>
            </h1>

            <div className="brush-underline w-28 mt-6 mb-6" />

            <p className="text-paper-dim max-w-md text-sm leading-relaxed mb-8">
              Ribuan judul donghua & anime China, subtitle Indonesia akurat,
              episode baru setiap hari — dari silat klasik sampai isekai musim ini.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/genre"
                className="inline-flex items-center gap-2 bg-seal hover:bg-seal-bright transition-colors px-5 py-2.5 text-sm font-medium text-paper"
              >
                <Play size={16} fill="currentColor" />
                Jelajahi Sekarang
              </Link>
              <Link
                to="/favorites"
                className="inline-flex items-center gap-2 border border-ink-line hover:border-gold hover:text-gold transition-colors px-5 py-2.5 text-sm text-paper"
              >
                Favorit Saya
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center pr-10 gap-4">
            <span className="rail-label text-gold/80">新 · 番 · 組 · 放 · 送</span>
            <div className="seal h-16 w-16 text-xl">安</div>
          </div>
        </div>
      </section>

      {genres && genres.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="eyebrow">Jelajahi Genre</span>
            <div className="h-px flex-1 bg-ink-line" />
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {genres.slice(0, 18).map((g) => (
              <GenreChip key={g.slug} slug={g.slug} name={g.name} />
            ))}
          </div>
        </section>
      )}

      {isLoading && (
        <div className="space-y-14">
          {[0, 1].map((i) => (
            <div key={i}>
              <div className="h-4 w-40 bg-ink-card mb-5 animate-pulse rounded" />
              <PosterGridSkeleton />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
      )}

      {!isLoading && !isError && (!sections || sections.length === 0) && (
        <ErrorState message="Tidak ada konten yang bisa ditampilkan saat ini." onRetry={() => refetch()} />
      )}

      {sections?.map((section, sIdx) => (
        <section key={section.title + sIdx} className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="font-display text-2xl text-paper">{section.title}</h2>
            <div className="h-px flex-1 bg-ink-line" />
            <span className="font-mono text-xs text-paper-muted">
              {String(sIdx + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {section.items.map((anime, i) => (
              <AnimeCard key={anime.slug + i} anime={anime} index={i} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

import { Link } from 'react-router-dom'
import { History, Trash2 } from 'lucide-react'
import { useHistoryStore } from '../store/favoritesStore'

export default function Riwayat() {
  const history = useHistoryStore((s) => s.history)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="seal h-10 w-10 text-sm">歴</div>
        <div>
          <h1 className="font-display text-3xl text-paper">Riwayat Tonton</h1>
          <p className="text-sm text-paper-muted mt-0.5">Episode yang baru saja kamu tonton</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="border border-ink-line bg-ink-card p-12 text-center">
          <History size={32} className="mx-auto text-paper-muted mb-4" />
          <p className="text-paper-dim text-sm">Belum ada riwayat tontonan.</p>
          <Link to="/" className="inline-block mt-4 text-sm text-gold hover:underline">
            Mulai menonton →
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {history.map((h, i) => (
            <li key={`${h.slug}-${h.episode}-${i}`}>
              <Link
                to={`/watch/${h.slug}/${h.episode}`}
                className="flex items-center justify-between gap-4 border border-ink-line bg-ink-card px-4 py-3 hover:border-gold/50 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-paper text-sm font-medium truncate group-hover:text-gold transition-colors">
                    {h.title}
                  </p>
                  <p className="text-xs text-paper-muted font-mono mt-0.5">
                    Episode {h.episode}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-paper-muted shrink-0">
                  {new Date(h.watchedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

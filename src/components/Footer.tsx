import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-ink-line mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="seal h-9 w-9 text-xs">安</span>
            <div>
              <p className="font-display text-paper text-lg">Anishine</p>
              <p className="text-[10px] font-mono uppercase tracking-widest2 text-gold">
                Fansub Donghua Sub Indo
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest2 text-paper-muted">
            <Link to="/" className="hover:text-paper transition-colors">Beranda</Link>
            <Link to="/genre" className="hover:text-paper transition-colors">Genre</Link>
            <Link to="/favorites" className="hover:text-paper transition-colors">Favorit</Link>
            <Link to="/jadwal" className="hover:text-paper transition-colors">Jadwal</Link>
            <Link to="/riwayat" className="hover:text-paper transition-colors">Riwayat</Link>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-ink-line flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-paper-muted">
          <p>© {new Date().getFullYear()} Anishine. Semua hak dilindungi.</p>
          <p className="font-mono">Update harian · Subtitle Indonesia</p>
        </div>
      </div>
    </footer>
  )
}

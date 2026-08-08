import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Heart, MoreVertical, Calendar, Bookmark, History, Search } from 'lucide-react'
import { SearchBar } from './SearchBar'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/genre', label: 'Genre' },
  { to: '/favorites', label: 'Favorit' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/80 bg-ink/85 backdrop-blur-xl">
      <div className="bg-gradient-to-r from-seal via-seal-bright to-gold text-[10px] sm:text-[11px] font-mono tracking-widest2 text-center py-1.5 text-paper uppercase">
        ANISHINE · FANSUB DONGHUA SUB INDO · UPDATE HARIAN
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="seal h-10 w-10 text-sm group-hover:scale-105 transition-transform">安</span>
            <div className="leading-tight">
              <span className="font-display text-lg sm:text-xl tracking-wide text-paper block">
                Anishine
              </span>
              <span className="hidden sm:block text-[10px] font-mono text-gold tracking-widest2 uppercase">
                Donghua Sub Indo
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-widest2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'border-seal text-paper'
                      : 'border-transparent text-paper-muted hover:text-paper'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block w-64 lg:w-80">
            <SearchBar compact />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/favorites"
              className="p-2 text-paper-muted hover:text-seal-bright transition-colors"
              aria-label="Favorit"
              title="Favorit"
            >
              <Heart size={18} />
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`p-2 rounded-md transition-colors ${
                  menuOpen ? 'bg-ink-card text-gold' : 'text-paper-muted hover:text-paper hover:bg-ink-card'
                }`}
                aria-label="Menu lainnya"
              >
                <MoreVertical size={18} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-lg border border-ink-line bg-ink-card shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="px-3 py-2 border-b border-ink-line">
                    <p className="text-[10px] font-mono uppercase tracking-widest2 text-gold">Menu</p>
                  </div>
                  <Link
                    to="/jadwal"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-paper hover:bg-ink-line/40 transition-colors"
                  >
                    <Calendar size={16} className="text-gold" />
                    Jadwal Rilis
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-paper hover:bg-ink-line/40 transition-colors"
                  >
                    <Bookmark size={16} className="text-gold" />
                    Tandai / Favorit
                  </Link>
                  <Link
                    to="/riwayat"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-paper hover:bg-ink-line/40 transition-colors"
                  >
                    <History size={16} className="text-gold" />
                    Riwayat Tonton
                  </Link>
                  <div className="border-t border-ink-line" />
                  <Link
                    to="/search"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-paper-muted hover:bg-ink-line/40 transition-colors md:hidden"
                  >
                    <Search size={16} />
                    Cari
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 text-paper"
              aria-label="Buka menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-line px-4 py-4 space-y-4 bg-ink/95">
          <SearchBar compact />
          <nav className="flex flex-col gap-1 font-mono text-xs uppercase tracking-widest2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 px-1 ${isActive ? 'text-seal-bright' : 'text-paper-muted'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/jadwal" onClick={() => setOpen(false)} className="py-2.5 px-1 text-paper-muted">
              Jadwal
            </Link>
            <Link to="/riwayat" onClick={() => setOpen(false)} className="py-2.5 px-1 text-paper-muted">
              Riwayat
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

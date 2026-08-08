import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 flex flex-col items-center text-center">
      <div className="seal h-16 w-16 text-lg mb-6">404</div>
      <h1 className="font-display text-3xl text-paper mb-2">Halaman tidak ditemukan</h1>
      <p className="text-sm text-paper-muted max-w-sm mb-8">
        Gulungan yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-seal hover:bg-seal-bright transition-colors px-5 py-2.5 text-sm text-paper"
      >
        Kembali ke Beranda
      </Link>
    </div>
  )
}

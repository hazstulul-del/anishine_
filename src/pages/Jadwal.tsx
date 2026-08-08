import { Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export default function Jadwal() {
  const today = new Date().getDay() // 0 = Minggu
  const todayIdx = today === 0 ? 6 : today - 1

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="seal h-10 w-10 text-sm">日</div>
        <div>
          <h1 className="font-display text-3xl text-paper">Jadwal Rilis</h1>
          <p className="text-sm text-paper-muted mt-0.5">Update episode donghua setiap hari</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {days.map((day, i) => (
          <div
            key={day}
            className={`border px-4 py-4 ${
              i === todayIdx
                ? 'border-seal bg-seal/10'
                : 'border-ink-line bg-ink-card'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`font-display text-lg ${i === todayIdx ? 'text-seal-bright' : 'text-paper'}`}>
                {day}
              </span>
              {i === todayIdx && (
                <span className="text-[10px] font-mono uppercase tracking-widest2 text-gold">Hari ini</span>
              )}
            </div>
            <p className="text-xs text-paper-muted">
              Episode baru biasanya tayang sore–malam WIB.
            </p>
          </div>
        ))}
      </div>

      <div className="border border-ink-line bg-ink-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Calendar size={28} className="text-gold shrink-0" />
        <div className="flex-1">
          <p className="text-paper text-sm font-medium">Cek update terbaru di Beranda</p>
          <p className="text-xs text-paper-muted mt-1">
            Section “Latest Release” / “Popular Today” selalu menampilkan episode paling baru.
          </p>
        </div>
        <Link
          to="/"
          className="shrink-0 bg-seal hover:bg-seal-bright transition-colors px-4 py-2 text-sm text-paper"
        >
          Ke Beranda
        </Link>
      </div>
    </div>
  )
}

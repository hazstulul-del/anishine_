import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import AnimeDetail from './pages/AnimeDetail'
import Watch from './pages/Watch'
import GenrePage from './pages/GenrePage'
import Favorites from './pages/Favorites'
import Riwayat from './pages/Riwayat'
import Jadwal from './pages/Jadwal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/anime/:slug" element={<AnimeDetail />} />
          <Route path="/watch/:slug/:episode" element={<Watch />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/genre/:slug" element={<GenrePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

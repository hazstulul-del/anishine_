import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnimeSummary } from '../lib/api'

interface FavoritesState {
  favorites: AnimeSummary[]
  addFavorite: (anime: AnimeSummary) => void
  removeFavorite: (slug: string) => void
  isFavorite: (slug: string) => boolean
  toggleFavorite: (anime: AnimeSummary) => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (anime) =>
        set((state) => ({
          favorites: state.favorites.some((f) => f.slug === anime.slug)
            ? state.favorites
            : [...state.favorites, anime],
        })),
      removeFavorite: (slug) =>
        set((state) => ({ favorites: state.favorites.filter((f) => f.slug !== slug) })),
      isFavorite: (slug) => get().favorites.some((f) => f.slug === slug),
      toggleFavorite: (anime) => {
        const exists = get().favorites.some((f) => f.slug === anime.slug)
        if (exists) {
          get().removeFavorite(anime.slug)
        } else {
          get().addFavorite(anime)
        }
      },
    }),
    { name: 'anishine-favorites' },
  ),
)

interface HistoryEntry {
  slug: string
  episode: string | number
  title: string
  watchedAt: number
}

interface HistoryState {
  history: HistoryEntry[]
  addToHistory: (entry: Omit<HistoryEntry, 'watchedAt'>) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (entry) =>
        set((state) => {
          const filtered = state.history.filter(
            (h) => !(h.slug === entry.slug && h.episode === entry.episode),
          )
          return { history: [{ ...entry, watchedAt: Date.now() }, ...filtered].slice(0, 50) }
        }),
      clearHistory: () => set({ history: [] }),
    }),
    { name: 'anishine-history' },
  ),
)

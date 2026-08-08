const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`)
  } catch (err) {
    throw new ApiError('Tidak bisa terhubung ke server. Pastikan API berjalan di ' + BASE_URL)
  }

  if (!res.ok) {
    throw new ApiError(`Server merespons dengan status ${res.status}`, res.status)
  }

  const data = await res.json()

  // Anichin API convention: { result: null, error: "..." } on failure
  if (data && typeof data === 'object' && 'error' in data && data.error) {
    throw new ApiError(data.error)
  }

  return (data && typeof data === 'object' && 'result' in data ? data.result : data) as T
}

// ---- Types ----
export interface AnimeSummary {
  slug: string
  title: string
  poster?: string
  image?: string
  type?: string
  status?: string
  rating?: string | number
  episode?: string | number
}

export interface Episode {
  slug: string
  episode: string | number
  title?: string
  release_date?: string
}

export interface AnimeDetail {
  slug: string
  title: string
  poster?: string
  image?: string
  synopsis?: string
  status?: string
  type?: string
  year?: string | number
  rating?: string | number
  genres?: string[]
  episodes?: Episode[]
}

export interface VideoSource {
  slug: string
  title?: string
  servers?: { name: string; url: string; quality?: string }[]
  url?: string
}

export interface Genre {
  name: string
  slug: string
}

export interface HomeSection {
  title: string
  items: AnimeSummary[]
}

// ---- Endpoints ----
export const api = {
  search: (query: string) =>
    request<AnimeSummary[]>(`/search/${encodeURIComponent(query)}`),

  getDetail: (slug: string) => request<AnimeDetail>(`/${slug}`),

  getVideoSource: (slug: string) => request<VideoSource>(`/video-source/${slug}`),

  getGenres: () => request<Genre[]>('/genres'),

  getHome: () => request<HomeSection[]>('/'),
}

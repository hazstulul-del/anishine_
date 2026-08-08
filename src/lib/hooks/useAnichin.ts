import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export function useHome() {
  return useQuery({
    queryKey: ['home'],
    queryFn: api.getHome,
  })
}

export function useSearchAnime(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => api.search(query),
    enabled: query.trim().length > 1,
  })
}

export function useAnimeDetail(slug: string | undefined) {
  return useQuery({
    queryKey: ['anime', slug],
    queryFn: () => api.getDetail(slug as string),
    enabled: !!slug,
  })
}

export function useVideoSource(slug: string | undefined) {
  return useQuery({
    queryKey: ['video-source', slug],
    queryFn: () => api.getVideoSource(slug as string),
    enabled: !!slug,
  })
}

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: api.getGenres,
  })
}

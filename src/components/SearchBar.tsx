import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const q = value.trim()
    if (q.length > 1) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={submit} className="relative w-full">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-paper-muted"
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari anime atau donghua…"
        className={`w-full bg-ink-card border border-ink-line pl-9 pr-9 text-sm text-paper
          placeholder:text-paper-muted focus:border-seal outline-none transition-colors
          ${compact ? 'py-2' : 'py-3'}`}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-muted hover:text-paper"
        >
          <X size={14} />
        </button>
      )}
    </form>
  )
}

export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

import { ScrollText, RefreshCw } from 'lucide-react'

export function ErrorState({
  message = 'Server sedang bermasalah, coba lagi nanti.',
  onRetry,
}: {
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="seal h-14 w-14 mb-5">
        <ScrollText size={22} />
      </div>
      <p className="font-display text-lg text-paper mb-1">Terjadi kendala</p>
      <p className="text-sm text-paper-muted max-w-sm mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 border border-ink-line px-4 py-2 text-sm
            hover:border-seal hover:text-seal-bright transition-colors"
        >
          <RefreshCw size={14} />
          Coba lagi
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="rail-label mb-4">無 · 空</div>
      <p className="font-display text-lg text-paper mb-1">{title}</p>
      {hint && <p className="text-sm text-paper-muted max-w-sm">{hint}</p>}
    </div>
  )
}

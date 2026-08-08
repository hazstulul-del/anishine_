export function PosterSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-sm bg-ink-card border border-ink-line" />
      <div className="mt-2 h-3 w-4/5 rounded-sm bg-ink-card" />
      <div className="mt-1.5 h-3 w-1/2 rounded-sm bg-ink-card" />
    </div>
  )
}

export function PosterGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PosterSkeleton key={i} />
      ))}
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 w-full rounded-sm bg-ink-card border border-ink-line" />
      <div className="h-6 w-2/3 rounded-sm bg-ink-card" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded-sm bg-ink-card" />
        <div className="h-3 w-11/12 rounded-sm bg-ink-card" />
        <div className="h-3 w-2/3 rounded-sm bg-ink-card" />
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Tv } from 'lucide-react'
import type { VideoSource } from '../lib/api'

export function VideoPlayer({ source }: { source: VideoSource | undefined }) {
  const servers = source?.servers?.length ? source.servers : source?.url ? [{ name: 'Default', url: source.url }] : []
  const [activeIdx, setActiveIdx] = useState(0)
  const active = servers[activeIdx]

  if (!servers.length) {
    return (
      <div className="aspect-video w-full flex flex-col items-center justify-center gap-3 bg-ink-card border border-ink-line text-paper-muted">
        <Tv size={28} />
        <p className="text-sm">Sumber video tidak tersedia untuk episode ini.</p>
      </div>
    )
  }

  const isDirect = /\.(mp4|m3u8|webm)(\?|$)/i.test(active.url)

  return (
    <div>
      <div className="aspect-video w-full bg-black border border-ink-line overflow-hidden">
        {isDirect ? (
          <video key={active.url} src={active.url} controls autoPlay className="h-full w-full" />
        ) : (
          <iframe
            key={active.url}
            src={active.url}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            className="h-full w-full"
          />
        )}
      </div>

      {servers.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="eyebrow self-center mr-1">Server</span>
          {servers.map((s, i) => (
            <button
              key={s.name + i}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 text-xs font-mono border transition-colors
                ${i === activeIdx
                  ? 'border-seal bg-seal/15 text-seal-bright'
                  : 'border-ink-line text-paper-muted hover:border-gold hover:text-gold'}`}
            >
              {s.name}{s.quality ? ` · ${s.quality}` : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

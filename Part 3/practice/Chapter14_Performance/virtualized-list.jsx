// Tiny virtual scroller (illustrative)
import { useMemo, useRef, useState } from 'react'

export default function VirtualList({ rowHeight = 36, height = 300, items = [] }) {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = (e) => setScrollTop(e.currentTarget.scrollTop)
  const total = items.length * rowHeight
  const start = Math.floor(scrollTop / rowHeight)
  const end = start + Math.ceil(height / rowHeight) + 5
  const slice = items.slice(start, end)
  const offset = start * rowHeight
  return (
    <div style={{ overflow: 'auto', height }} onScroll={onScroll}>
      <div style={{ height: total, position: 'relative' }}>
        <div style={{ position: 'absolute', top: offset, left: 0, right: 0 }}>
          {slice.map((it, i) => (
            <div key={start + i} style={{ height: rowHeight, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
              {String(it)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

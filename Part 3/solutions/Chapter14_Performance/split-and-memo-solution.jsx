// After: lazy + memo + prefetch hint
import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
const BigChart = lazy(() => import('./BigChart'))

export default function Dashboard() {
  const [data, setData] = useState([])
  useEffect(() => { fetch('/api/data').then(r => r.json()).then(setData) }, [])
  const series = useMemo(() => transform(data), [data])
  return (
    <>
      <link rel=\"prefetch\" href=\"/assets/BigChart.chunk.js\" as=\"script\"/>
      <Suspense fallback={<p>Loading chart…</p>}>
        <BigChart data={series}/>
      </Suspense>
    </>
  )
}
function transform(d){ return d }

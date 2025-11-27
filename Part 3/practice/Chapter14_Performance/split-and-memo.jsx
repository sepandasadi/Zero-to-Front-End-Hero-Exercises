// Before: heavy component bundling everything
import { useEffect, useState } from 'react'
import BigChart from './BigChart' // large dep bundled on first load

export default function Dashboard() {
  const [data, setData] = useState([])
  useEffect(() => { fetch('/api/data').then(r => r.json()).then(setData) }, [])
  return <BigChart data={data}/>
}

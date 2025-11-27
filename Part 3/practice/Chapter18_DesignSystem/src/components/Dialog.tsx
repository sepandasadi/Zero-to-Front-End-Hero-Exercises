// src/components/Dialog.tsx
import React, { useEffect, useRef } from 'react'

export function Dialog({ open, onClose, children, labelledBy }:{ open:boolean, onClose:()=>void, labelledBy?:string, children:React.ReactNode }){
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const focusables = ref.current?.querySelectorAll<HTMLElement>('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])') || []
    focusables[0]?.focus()
    function onKey(e:KeyboardEvent){
      if(e.key==='Escape'){ e.preventDefault(); onClose() }
      if(e.key==='Tab' && focusables.length){
        const first = focusables[0], last = focusables[focusables.length-1]
        if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus() }
        else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); prev?.focus() }
  },[open,onClose])
  if(!open) return null
  return (
    <div className="ds-overlay" role="dialog" aria-modal="true" aria-labelledby={labelledBy} ref={ref}>
      {children}
      <button className="btn btn--ghost" onClick={onClose} aria-label="Close">Close</button>
    </div>
  )
}

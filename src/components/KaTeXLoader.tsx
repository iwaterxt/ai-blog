'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    renderMathInElement: (el: HTMLElement, options: object) => void
  }
}

export default function KaTeXLoader() {
  useEffect(() => {
    const load = () => {
      if (typeof window !== 'undefined' && (window as any).renderMathInElement) {
        document.querySelectorAll('.katex-display, .katex-inline').forEach(el => {
          const math = el.getAttribute('data-math')
          if (math) {
            try {
              const katex = (window as any).katex
              if (katex) {
                el.innerHTML = katex.renderToString(decodeURIComponent(math), {
                  throwOnError: false,
                  displayMode: el.classList.contains('katex-display'),
                })
              }
            } catch {}
          }
        })
      }
    }

    if (document.readyState === 'complete') {
      setTimeout(load, 100)
    } else {
      window.addEventListener('load', () => setTimeout(load, 100))
    }
  }, [])

  return null
}

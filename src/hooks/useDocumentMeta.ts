import { useEffect } from 'react'

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${title} | Hestiia Restaurant Kanpur`

    let meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta ? meta.getAttribute('content') : ''

    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = prevTitle
      if (meta && prevDesc) {
        meta.setAttribute('content', prevDesc)
      }
    }
  }, [title, description])
}

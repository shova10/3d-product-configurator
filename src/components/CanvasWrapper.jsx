import { useState, useEffect, lazy, Suspense } from 'react'

const SceneCanvas = lazy(() =>
  import('./SceneCanvas').then((m) => ({ default: m.SceneCanvas }))
)

export function CanvasWrapper({ config }) {
  // 1. Initialize state directly using functions so it's correct on first render
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  const [isLowPower] = useState(() => {
    return (
      typeof navigator !== 'undefined' &&
      navigator.deviceMemory &&
      navigator.deviceMemory < 4
    )
  })

  // 2. Use effect strictly for event subscription (updates happen in the callback, not synchronously in the effect body)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e) => setPrefersReducedMotion(e.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotion || isLowPower) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          color: '#fff',
        }}
      >
        <p
          style={{
            marginTop: '1rem',
            color: '#aaa',
            textAlign: 'center',
            padding: '0 1rem',
          }}
        >
          {prefersReducedMotion
            ? 'Reduced motion enabled.'
            : 'Low-power mode detected.'}{' '}
          Displaying static fallback view.
        </p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div style={{ color: '#fff', textAlign: 'center', paddingTop: '20vh' }}>
          Loading 3D Engine...
        </div>
      }
    >
      <SceneCanvas config={config} />
    </Suspense>
  )
}

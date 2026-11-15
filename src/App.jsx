import { useControls } from 'leva'
import { CanvasWrapper } from './components/CanvasWrapper'

export default function App() {
  const config = useControls('3D Configurator', {
    color: '#3b82f6',
    wireframe: false,
    autoRotate: true,
    environment: {
      value: 'city',
      options: ['city', 'sunset', 'studio', 'dawn', 'night'],
    },
  })

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CanvasWrapper config={config} />
    </main>
  )
}

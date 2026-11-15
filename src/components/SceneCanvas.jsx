import  { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Loader,
} from '@react-three/drei'
import { ModelViewer } from './ModelViewer'

export function SceneCanvas({ config }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        background: '#111',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]} // Performance scaling for retina vs low-end devices
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <Suspense fallback={null}>
          <ModelViewer
            color={config.color}
            wireframe={config.wireframe}
            autoRotate={config.autoRotate}
          />
          <Environment preset={config.environment} />
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.6}
            scale={10}
            blur={1.5}
            far={0.8}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2}
          maxDistance={7}
        />
      </Canvas>
      <Loader />
    </div>
  )
}

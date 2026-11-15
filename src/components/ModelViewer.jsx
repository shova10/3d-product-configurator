import  { useRef, useState } from 'react'
import { useGLTF, Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function ModelViewer({ color, wireframe, autoRotate }) {
  // Load optimized model
  const { scene, materials } = useGLTF('/models/product.glb')
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Subtle frame-by-frame animation (rotation)
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={groupRef}
        dispose={null}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
        scale={clicked ? 1.1 : 1.0}
      >
        <primitive object={scene} />

        {/* Dynamic material overrides across scene meshes */}
        {Object.values(materials).map((mat) => {
          mat.color.set(color)
          mat.wireframe = wireframe
          return null
        })}

        {/* Interactive Annotations / Tooltips */}
        {hovered && (
          <Html position={[0, 1.2, 0]} center distanceFactor={10}>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Click to toggle scale | Drag to rotate
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

// Preload asset to avoid waterfall load delays
useGLTF.preload('/models/product.glb')

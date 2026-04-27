import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 2000 }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    const colorA = new THREE.Color('#8b5cf6')
    const colorB = new THREE.Color('#06b6d4')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 8 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const mixFactor = Math.random()
      const color = colorA.clone().lerp(colorB, mixFactor)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 3 + 0.5
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05
      mesh.current.rotation.x = Math.sin(time * 0.03) * 0.1
    }
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.7) * 3
      light.current.position.y = Math.cos(time * 0.5) * 4
    }
  })

  return (
    <group ref={mesh}>
      <pointLight ref={light} distance={40} intensity={8} color="#8b5cf6" />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

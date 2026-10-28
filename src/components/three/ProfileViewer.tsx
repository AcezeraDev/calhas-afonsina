import { Float, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group, MathUtils } from 'three'
import type { Perfil } from '@/data'
import { GutterProfile } from './GutterProfile'
import { makeSteel } from './materials'
import { Studio } from './Studio'

function Spinning({ perfil }: { perfil: Perfil }) {
  const ref = useRef<Group>(null)
  const steel = useMemo(makeSteel, [])
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.35
    ref.current.scale.setScalar(MathUtils.lerp(ref.current.scale.x, 1, 0.12))
  })
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      {/* key força remontagem e a animação de escala a cada troca de perfil */}
      <group ref={ref} key={perfil.id} scale={0.6} rotation={[0.35, 0.6, 0]}>
        <GutterProfile pontos={perfil.pontos} length={3.2} scale={0.02} thickness={0.045} material={steel} />
      </group>
    </Float>
  )
}

export default function ProfileViewer({ perfil }: { perfil: Perfil }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.4, 5.2], fov: 38 }} gl={{ alpha: true, antialias: true }}>
      <Studio />
      <Spinning perfil={perfil} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

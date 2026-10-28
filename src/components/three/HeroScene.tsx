import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group, MathUtils, Mesh } from 'three'
import { perfis } from '@/data'
import { heroProgress } from '@/lib/gsap'
import { makeSteel } from './materials'
import { Studio } from './Studio'

type Props = { mobile: boolean }

// Dobradeira virtual: a chapa começa plana e cada dobra gira proporcionalmente ao progresso,
// mantendo o comprimento de cada trecho, até formar o perfil da calha colonial.
function FoldingSheet({ mobile }: Props) {
  const pts = perfis[0].pontos
  const scale = mobile ? 0.0072 : 0.0135
  const thickness = mobile ? 0.03 : 0.04
  const length = mobile ? 2.3 : 4.6

  const segs = useMemo(() => {
    const out: { len: number; turn: number }[] = []
    let prev = 0
    for (let i = 1; i < pts.length; i++) {
      const dx = (pts[i][0] - pts[i - 1][0]) * scale
      const dy = -(pts[i][1] - pts[i - 1][1]) * scale
      const a = Math.atan2(dy, dx)
      let turn = i === 1 ? a : a - prev
      turn = Math.atan2(Math.sin(turn), Math.cos(turn))
      out.push({ len: Math.hypot(dx, dy), turn })
      prev = a
    }
    return out
  }, [pts, scale])

  const steel = useMemo(() => makeSteel(), [])
  const meshes = useRef<(Mesh | null)[]>([])
  const pivot = useRef<Group>(null)
  const spin = useRef<Group>(null)
  const intro = useRef(0)

  useFrame(({ pointer }, dt) => {
    const p = heroProgress.p
    intro.current = Math.min(1, intro.current + dt / 2.2)
    const e = 1 - Math.pow(1 - intro.current, 3)
    // Ao carregar dobra até 35%; a rolagem completa a dobra nos primeiros 70% do pin
    const fold = MathUtils.clamp(0.35 * e + 0.65 * Math.min(p / 0.7, 1), 0, 1)

    let ang = 0
    let x = 0
    let y = 0
    const pos: [number, number, number][] = []
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    segs.forEach((s, i) => {
      ang += s.turn * fold
      const nx = x + Math.cos(ang) * s.len
      const ny = y + Math.sin(ang) * s.len
      pos[i] = [(x + nx) / 2, (y + ny) / 2, ang]
      minX = Math.min(minX, x, nx)
      maxX = Math.max(maxX, x, nx)
      minY = Math.min(minY, y, ny)
      maxY = Math.max(maxY, y, ny)
      x = nx
      y = ny
    })
    const cx = (minX + maxX) / 2
    const cy = (minY + maxY) / 2
    pos.forEach(([px, py, a], i) => {
      const m = meshes.current[i]
      if (!m) return
      m.position.set(px - cx, py - cy, 0)
      m.rotation.z = a
    })

    const k = 1 - Math.pow(0.002, dt)
    const turn = Math.max(0, (p - 0.65) / 0.35)
    if (spin.current) {
      spin.current.rotation.y = MathUtils.lerp(spin.current.rotation.y, -0.55 + turn * 1.1 + pointer.x * 0.25, k)
      spin.current.rotation.x = MathUtils.lerp(spin.current.rotation.x, 0.32 - turn * 0.15 - pointer.y * 0.12, k)
    }
    if (pivot.current) {
      pivot.current.position.y = (mobile ? 1.15 : 0.1 + turn * 0.45) + Math.sin(performance.now() / 1400) * 0.06
      pivot.current.scale.setScalar(MathUtils.lerp(pivot.current.scale.x, 1 - turn * 0.2, k))
    }
  })

  return (
    <group ref={pivot} position={mobile ? [0, 1.15, 0] : [1.7, 0.1, 0]}>
      <group ref={spin} rotation={[0.32, -0.55, 0]}>
        {segs.map((s, i) => (
          <mesh
            key={i}
            ref={(m) => {
              meshes.current[i] = m
            }}
            material={steel}
          >
            <boxGeometry args={[s.len + thickness, thickness, length]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function HeroScene({ mobile }: Props) {
  return (
    <Canvas dpr={[1, mobile ? 1.5 : 2]} camera={{ position: [0, 0, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
      <Studio rim={36} />
      <spotLight position={[2, 6, 4]} angle={0.5} penumbra={0.8} intensity={60} color="#ffffff" />
      <FoldingSheet mobile={mobile} />
    </Canvas>
  )
}

import { useMemo } from 'react'
import type { Material } from 'three'

type Props = {
  pontos: [number, number][]
  length?: number
  thickness?: number
  scale?: number
  material: Material
}

// Chapa dobrada: cada trecho do perfil vira uma tira fina extrudada no comprimento da calha.
export function GutterProfile({ pontos, length = 4, thickness = 0.03, scale = 0.012, material }: Props) {
  const segs = useMemo(() => {
    const xs = pontos.map((p) => p[0])
    const ys = pontos.map((p) => p[1])
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2
    const pts = pontos.map(([x, y]) => [(x - cx) * scale, -(y - cy) * scale] as const)
    return pts.slice(1).map((b, i) => {
      const a = pts[i]
      const dx = b[0] - a[0]
      const dy = b[1] - a[1]
      return {
        x: (a[0] + b[0]) / 2,
        y: (a[1] + b[1]) / 2,
        len: Math.hypot(dx, dy) + thickness,
        rot: Math.atan2(dy, dx),
      }
    })
  }, [pontos, scale, thickness])

  return (
    <group>
      {segs.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, 0]} rotation={[0, 0, s.rot]} material={material}>
          <boxGeometry args={[s.len, thickness, length]} />
        </mesh>
      ))}
    </group>
  )
}

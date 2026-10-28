import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Reflexos de estúdio gerados localmente (sem baixar HDR) + luz-chave branca e contraluz vermelho da marca.
export function Studio({ rim = 18 }: { rim?: number }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04).texture
    scene.environment = env
    scene.environmentIntensity = 0.9
    return () => {
      scene.environment = null
      env.dispose()
      room.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])

  return (
    <>
      <directionalLight position={[-3, 5, 6]} intensity={1.6} />
      <pointLight position={[6, 1, -1]} intensity={rim} color="#e33926" distance={14} />
    </>
  )
}

import { MeshPhysicalMaterial } from 'three'

export const makeSteel = () =>
  new MeshPhysicalMaterial({
    color: '#d6dade',
    metalness: 1,
    roughness: 0.26,
    clearcoat: 0.4,
    clearcoatRoughness: 0.3,
  })

export const makeBrand = () =>
  new MeshPhysicalMaterial({
    color: '#e33926',
    metalness: 0.55,
    roughness: 0.32,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  })

export const makeDark = () =>
  new MeshPhysicalMaterial({
    color: '#5a5552',
    metalness: 0.9,
    roughness: 0.35,
    clearcoat: 0.6,
  })

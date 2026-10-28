import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Progresso do hero (0 a 1) compartilhado entre a timeline do GSAP e a cena 3D.
export const heroProgress = { p: 0 }

export { gsap, ScrollTrigger, useGSAP }

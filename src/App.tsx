import Lenis from 'lenis'
import { useEffect } from 'react'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Areas } from './components/sections/Areas'
import { Calhas } from './components/sections/Calhas'
import { Contato } from './components/sections/Contato'
import { Dicas } from './components/sections/Dicas'
import { Diferenciais } from './components/sections/Diferenciais'
import { Manifesto } from './components/sections/Manifesto'
import { Trabalhos } from './components/sections/Trabalhos'
import { gsap, ScrollTrigger } from './lib/gsap'

export default function App() {
  // Fontes e imagens mudam a altura do texto depois do primeiro cálculo; sem recalcular,
  // as seções fixadas começam no lugar errado e se sobrepõem.
  useEffect(() => {
    let t = 0
    const refresh = () => {
      clearTimeout(t)
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    const ro = new ResizeObserver(refresh)
    const main = document.querySelector('main')
    if (main) ro.observe(main)
    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Lenis dirige a rolagem e o ScrollTrigger lê dela, no mesmo relógio do GSAP.
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Diferenciais />
        <Areas />
        <Calhas />
        <Trabalhos />
        <Dicas />
        <Contato />
      </main>
      <Footer />
    </>
  )
}

import { useRef } from 'react'
import { servicos } from '@/data'
import { gsap, useGSAP } from '@/lib/gsap'
import { Marquee } from '../ui/marquee'

const texto =
  'Desde 2005 em São Bernardo do Campo, fabricamos e instalamos calhas, rufos, coifas, dutos e condutores. Nossa oficina móvel vai até a obra, com equipamentos e profissionais capacitados.'

// Destaques em vermelho
const fortes = new Set(['2005', 'fabricamos', 'instalamos', 'oficina', 'móvel'])

// Baralho de fotos reais: a de cima voa para fora conforme a rolagem
const fotos = [
  { src: '/img/ai/obra-residencia-tratada.webp', legenda: 'Calhas em residência' },
  { src: '/img/calhasafonsina-duto.jpg', legenda: 'Chaminé em inox' },
  { src: '/img/172878_7559f62dd513420bbad3524ab228760b.jpg', legenda: 'Coifa para churrasqueira' },
  { src: '/img/ai/obra-calha-corrente-tratada.webp', legenda: 'Calha com corrente de chuva' },
]

const numeros = [
  { v: '2005', l: 'Fundação em São Bernardo' },
  { v: '3', l: 'Materiais: galvanizado, alumínio e inox' },
  { v: 'ABCD', l: 'Atendimento em toda a região' },
]

export function Manifesto() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.mf-card')
      gsap.set(cards, { zIndex: (i) => cards.length - i, rotate: (i) => (i % 2 ? 4 : -3) * Math.min(i, 2), y: (i) => i * 14, scale: (i) => 1 - i * 0.04 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.mf-pin', start: 'top top', end: '+=160%', scrub: 0.8, pin: true },
      })
      tl.fromTo('.mf-word', { opacity: 0.12 }, { opacity: 1, stagger: 0.04, ease: 'none', duration: 1.6 }, 0)
      // Cada foto (menos a última) sai voando e as de trás sobem uma posição
      cards.slice(0, -1).forEach((c, i) => {
        const at = 0.25 + i * 0.5
        tl.to(c, { xPercent: i % 2 ? -130 : 130, yPercent: -20, rotate: i % 2 ? -18 : 18, opacity: 0, ease: 'power2.in', duration: 0.45 }, at)
        cards.slice(i + 1).forEach((rest, j) => {
          tl.to(rest, { y: j * 14, scale: 1 - j * 0.04, rotate: j === 0 ? 0 : (j % 2 ? 4 : -3), ease: 'power2.out', duration: 0.4 }, at + 0.1)
        })
      })
      tl.fromTo('.mf-num', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, ease: 'power2.out', duration: 0.4 }, 0.9)
      tl.fromTo('.mf-line', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1.8 }, 0)
    },
    { scope: root },
  )

  return (
    <section ref={root} id="manifesto" className="relative isolate bg-ink">
      <div className="relative z-10 -rotate-2 border-y border-brand/40 bg-brand py-4 text-white">
        <Marquee className="[--duration:30s] [--gap:2rem] p-0">
          {servicos.map((s) => (
            <span key={s} className="font-display flex items-center gap-8 text-3xl whitespace-nowrap sm:text-5xl">
              {s} <span className="text-white/50">✕</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mf-pin relative flex min-h-[100svh] items-center overflow-hidden py-16 sm:py-20">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:gap-10 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <p className="eyebrow shrink-0">Quem somos</p>
              <div className="h-px flex-1 bg-white/10">
                <div className="mf-line h-px origin-left bg-brand" />
              </div>
            </div>
            <p className="font-display text-[1.8rem] leading-[0.98] sm:text-5xl lg:text-[4.2rem]">
              {texto.split(' ').map((w, i) => (
                <span key={i} className={`mf-word inline-block pr-[0.22em] ${fortes.has(w.replace(/[.,]/g, '')) ? 'text-brand' : 'text-white'}`}>
                  {w}
                </span>
              ))}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-4 sm:mt-10 sm:pt-6">
              {numeros.map((n) => (
                <div key={n.l} className="mf-num">
                  <dt className="sr-only">{n.l}</dt>
                  <dd className="font-display text-4xl leading-none text-white sm:text-6xl">{n.v}</dd>
                  <p className="mt-2 text-xs leading-snug text-white/45 sm:text-sm">{n.l}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-[44%] max-w-[420px] sm:w-[55%] lg:w-full">
            {fotos.map((f) => (
              <figure key={f.src} className="mf-card absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink-3 shadow-[0_40px_80px_-25px_rgba(0,0,0,0.9)]">
                <img src={f.src} alt={f.legenda} loading="lazy" className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-12 sm:p-5 sm:pt-16">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-brand uppercase">Obra real</span>
                  <p className="font-display text-lg leading-none text-white sm:text-3xl">{f.legenda}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

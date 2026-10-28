import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { obras, type Obra } from '@/data'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { spring, useIsMobile } from '../ui-kit'

const categorias = ['Todos', 'Calhas e Rufos', 'Dutos', 'Coifas e Exaustores'] as const

// Cilindro 3D de fotos: a seção fica fixa e a rolagem gira o anel; a obra de frente vira destaque.
export function Trabalhos() {
  const mobile = useIsMobile()
  const root = useRef<HTMLElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [cat, setCat] = useState<(typeof categorias)[number]>('Todos')
  const lista = useMemo(() => (cat === 'Todos' ? obras : obras.filter((o) => o.categoria === cat)), [cat])
  const [ativo, setAtivo] = useState(0)
  const [aberta, setAberta] = useState<Obra | null>(null)

  const n = Math.max(lista.length, 6) // mínimo de 6 faces para o anel não ficar "achatado"
  const step = 360 / n
  const cardW = mobile ? 200 : 300
  const radius = Math.round(cardW / 2 / Math.tan(Math.PI / n) + (mobile ? 30 : 70))

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.tb-card')
      const atualiza = (rot: number) => {
        // Brilho e opacidade conforme o ângulo de cada carta em relação à câmera
        cards.forEach((c, i) => {
          const a = (((i * step + rot) % 360) + 540) % 360 - 180
          const f = Math.cos((a * Math.PI) / 180)
          gsap.set(c, { opacity: f < -0.2 ? 0.08 : 0.25 + 0.75 * Math.max(f, 0), filter: `brightness(${0.35 + 0.65 * Math.max(f, 0)}) saturate(${0.4 + 0.6 * Math.max(f, 0)})` })
        })
      }
      const total = (lista.length - 1) * step
      const st = gsap.fromTo(
        ring.current,
        { rotateY: 0 },
        {
          rotateY: -total,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${Math.max(lista.length - 1, 1) * window.innerHeight * 0.35}`,
            scrub: 1,
            pin: true,
            snap: lista.length > 1 ? { snapTo: 1 / (lista.length - 1), duration: { min: 0.2, max: 0.6 }, ease: 'power2.inOut' } : undefined,
            onUpdate: (self) => setAtivo(Math.round(self.progress * (lista.length - 1))),
          },
          onUpdate() {
            atualiza(Number(gsap.getProperty(ring.current, 'rotateY')))
          },
        },
      )
      atualiza(0)
      // Entrada do anel: sobe girando
      gsap.from('.tb-stage', { y: 120, rotateX: 25, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
      gsap.fromTo('.tb-big-a', { xPercent: 0 }, { xPercent: -35, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      return () => st.scrollTrigger?.kill()
    },
    { scope: root, dependencies: [lista, mobile], revertOnUpdate: true },
  )

  const escolher = (c: (typeof categorias)[number]) => {
    setCat(c)
    setAtivo(0)
    // Volta ao início da seção para o anel recomeçar
    const top = root.current?.getBoundingClientRect().top ?? 0
    if (top < 0) window.scrollBy({ top, behavior: 'instant' as ScrollBehavior })
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }

  const atual = lista[ativo] ?? lista[0]

  return (
    <section
      ref={root}
      id="trabalhos"
      className="relative isolate flex h-[100svh] flex-col overflow-hidden bg-[radial-gradient(120%_80%_at_50%_100%,#4a1712_0%,#1a0b09_45%,#0b0a0a_100%)] pt-24 sm:pt-28"
    >
      <p aria-hidden className="tb-big-a font-display pointer-events-none absolute top-[30%] left-0 -z-10 text-[30vw] leading-none whitespace-nowrap text-white/[0.04]" style={{ fontWeight: 900 }}>
        Obras reais · Obras reais ·
      </p>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Trabalhos realizados</p>
            <h2 className="font-display text-[3rem] leading-[0.88] text-white sm:text-7xl">
              Obras que falam <span className="text-brand">por nós.</span>
            </h2>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {categorias.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => escolher(c)}
                className={cn(
                  'relative isolate shrink-0 rounded-full border px-4 py-2 text-sm transition-colors',
                  cat === c ? 'border-brand text-white' : 'border-white/10 text-white/50 hover:text-white',
                )}
              >
                {cat === c && <motion.span layoutId="cat" transition={spring} className="absolute inset-0 -z-10 rounded-full bg-brand" />}
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Palco 3D */}
      <div className="tb-stage relative flex flex-1 items-center justify-center" style={{ perspective: mobile ? 900 : 1600 }}>
        <div
          ref={ring}
          className="relative"
          style={{ width: cardW, height: mobile ? 270 : 380, transformStyle: 'preserve-3d', transform: `translateZ(${-radius}px)` }}
        >
          {lista.map((o, i) => (
            <button
              type="button"
              key={o.img}
              onClick={() => setAberta(o)}
              aria-label={`Ampliar foto: ${o.titulo}`}
              className="tb-card group absolute inset-0 overflow-hidden rounded-[1.5rem] border border-white/15 bg-ink-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)`, backfaceVisibility: 'hidden' }}
            >
              <img src={o.img} alt={o.titulo} loading="lazy" draggable={false} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur">
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        {/* Reflexo/chão */}
        <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[100%] bg-brand/25 blur-3xl" />
      </div>

      {/* Legenda da obra em destaque */}
      <div className="mx-auto mb-8 flex w-full max-w-6xl items-end justify-between gap-6 pr-20 pl-5 sm:mb-10 sm:px-6">
        <div className="min-h-[5.5rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={atual?.img}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[11px] tracking-[0.18em] text-brand uppercase">{atual?.categoria}</p>
              <p className="font-display mt-1 text-4xl leading-none text-white sm:text-6xl">{atual?.titulo}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="font-display text-5xl leading-none text-white sm:text-7xl">
            {String(ativo + 1).padStart(2, '0')}
            <span className="text-2xl text-white/30 sm:text-3xl"> / {String(lista.length).padStart(2, '0')}</span>
          </span>
          <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10 sm:w-40">
            <motion.div className="h-full bg-brand" animate={{ width: `${((ativo + 1) / lista.length) * 100}%` }} transition={spring} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {aberta && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAberta(null)}
            role="dialog"
            aria-modal
            aria-label={aberta.titulo}
          >
            <motion.figure initial={{ scale: 0.9, rotateY: -15 }} animate={{ scale: 1, rotateY: 0 }} exit={{ scale: 0.95 }} transition={spring} className="max-w-4xl">
              <img src={aberta.img} alt={aberta.titulo} className="max-h-[78vh] w-auto rounded-3xl" />
              <figcaption className="font-display mt-4 text-center text-3xl text-white">{aberta.titulo}</figcaption>
            </motion.figure>
            <button type="button" aria-label="Fechar" className="glass absolute top-5 right-5 grid size-12 place-items-center rounded-full text-white">
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

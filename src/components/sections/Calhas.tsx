import { AnimatePresence, motion, useInView } from 'motion/react'
import { Move3d } from 'lucide-react'
import { lazy, Suspense, useRef, useState } from 'react'
import { materiais, perfis } from '@/data'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { BorderBeam } from '../ui/border-beam'
import { Reveal, SectionHead, spring } from '../ui-kit'

const ProfileViewer = lazy(() => import('../three/ProfileViewer'))

function ProfileSvg({ pontos, active }: { pontos: [number, number][]; active: boolean }) {
  const d = pontos.map((p, i) => `${i ? 'L' : 'M'}${p[0] + 20},${p[1] + 10}`).join(' ')
  return (
    <svg viewBox="0 0 175 120" className="h-10 w-14 shrink-0" aria-hidden>
      <motion.path
        d={d}
        fill="none"
        stroke={active ? '#e33926' : 'rgba(255,255,255,0.5)'}
        strokeWidth={7}
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </svg>
  )
}

function CalculadoraCorte() {
  const [l, setL] = useState(10)
  const [p, setP] = useState(10)
  const [a, setA] = useState(1.5)
  const corte = l + 2 * p + 2 * a
  // Desenho proporcional da calha quadrada
  const s = 6
  const W = l * s
  const H = p * s
  const A = a * s
  const ox = 30
  const oy = 20
  const path = `M${ox - A},${oy} L${ox},${oy} L${ox},${oy + H} L${ox + W},${oy + H} L${ox + W},${oy} L${ox + W + A},${oy}`

  const campo = (label: string, v: number, set: (n: number) => void, max: number, step = 0.5) => (
    <label className="block">
      <span className="flex justify-between text-sm text-white/60">
        {label}
        <span className="font-mono text-white">{v.toLocaleString('pt-BR')} cm</span>
      </span>
      <input
        type="range"
        min={step}
        max={max}
        step={step}
        value={v}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-2 w-full accent-[#e33926]"
      />
    </label>
  )

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <BorderBeam size={120} duration={9} colorFrom="#e33926" colorTo="#ffffff" />
      <p className="eyebrow">Calculadora</p>
      <h3 className="mt-2 font-display text-4xl text-white">Qual é o meu corte?</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Corte é a soma das medidas das dobras. A cobrança é por metro linear e o preço depende do corte. Vale também
        para rufo.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_1.1fr] sm:items-center">
        <div className="space-y-5">
          {campo('Largura', l, setL, 40)}
          {campo('Profundidade (cada lateral)', p, setP, 30)}
          {campo('Aba (cada lado)', a, setA, 5)}
        </div>
        <div className="rounded-2xl bg-black/30 p-4">
          <svg viewBox={`0 0 ${Math.max(W + 60 + A, 200)} ${H + 50}`} className="h-36 w-full">
            <motion.path
              d={path}
              fill="none"
              stroke="#d6dade"
              strokeWidth={4}
              strokeLinejoin="round"
              animate={{ d: path }}
              transition={spring}
            />
          </svg>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-sm text-white/50">Corte</span>
            <motion.span key={corte} initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={spring} className="font-display text-6xl text-brand">
              {corte.toLocaleString('pt-BR')}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Calhas() {
  const [ativo, setAtivo] = useState(0)
  const viewerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(viewerRef, { margin: '200px' })
  const perfil = perfis[ativo]
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // A janela do visualizador abre como um corte de chapa
      gsap.fromTo(
        '.cl-viewer',
        { clipPath: 'inset(18% 30% 18% 30% round 2rem)' },
        { clipPath: 'inset(0% 0% 0% 0% round 2rem)', ease: 'none', scrollTrigger: { trigger: '.cl-viewer', start: 'top 90%', end: 'top 35%', scrub: true } },
      )
      gsap.fromTo('.cl-chapas', { yPercent: -15, scale: 1.2 }, { yPercent: 15, scale: 1, ease: 'none', scrollTrigger: { trigger: '.cl-mat', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.cl-big', { xPercent: 10 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.cl-mat', start: 'top bottom', end: 'bottom top', scrub: true } })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="calhas" className="relative overflow-hidden py-24 sm:py-32">
      <div className="blueprint pointer-events-none absolute inset-x-0 top-0 h-[900px] opacity-70" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHead
          eyebrow="Modelos de calha"
          title={
            <>
              Para cada telhado, <em className="text-brand">um perfil.</em>
            </>
          }
          lead="Toda calha capta água, mas cada caso pede um modelo. Ajustamos medidas e dobramos calhas especiais com larguras e profundidades diferentes."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-2" role="tablist" aria-label="Modelos de calha">
            {perfis.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={ativo === i}
                onClick={() => setAtivo(i)}
                className={cn(
                  'relative isolate flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors',
                  ativo === i ? 'text-white' : 'text-white/50 hover:text-white/80',
                )}
              >
                {ativo === i && (
                  <motion.span layoutId="perfil-ativo" transition={spring} className="glass absolute inset-0 -z-10 rounded-2xl" />
                )}
                <ProfileSvg pontos={p.pontos} active={ativo === i} />
                <span className="font-display text-2xl sm:text-3xl">{p.nome}</span>
              </button>
            ))}
          </div>

          <div className="cl-viewer relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(80%_80%_at_50%_30%,#2a1a18_0%,#0e0d0d_70%)]">
            <div ref={viewerRef} className="h-[320px] cursor-grab active:cursor-grabbing sm:h-[380px]">
              {inView && (
                <Suspense fallback={null}>
                  <ProfileViewer perfil={perfil} />
                </Suspense>
              )}
            </div>
            <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/60 uppercase">
              <Move3d className="size-3.5" /> Arraste para girar
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={perfil.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="border-t border-white/10 p-6"
              >
                <p className="text-[15px] leading-relaxed text-white/80">{perfil.finalidade}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{perfil.detalhe}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Materiais sobre a foto de chapas dobradas */}
      <div className="cl-mat relative mt-24 overflow-hidden">
        <img
          src="/img/ai/chapas-dobradas.webp"
          alt=""
          loading="lazy"
          className="cl-chapas absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
        <p aria-hidden className="cl-big font-display text-outline pointer-events-none absolute top-6 left-0 text-[30vw] leading-none whitespace-nowrap opacity-60 md:text-[18vw]">Galvanizado · Alumínio · Inox</p>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow mb-4">Materiais</p>
            <h3 className="font-display text-5xl leading-none text-white sm:text-6xl">
              Chapa certa,
              <br />
              <span className="text-steel">dobra precisa.</span>
            </h3>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {materiais.map((m) => (
                <li key={m.nome} className="flex items-baseline justify-between py-4">
                  <span className="text-lg text-white">{m.nome}</span>
                  <span className="font-mono text-sm text-white/60">{m.spec}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-white/40">Outras espessuras sob consulta.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <CalculadoraCorte />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

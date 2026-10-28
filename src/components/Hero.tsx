import { lazy, Suspense, useRef } from 'react'
import { empresa, waLink } from '@/data'
import { gsap, heroProgress, useGSAP } from '@/lib/gsap'
import { useIsMobile, WhatsIcon } from './ui-kit'

const HeroScene = lazy(() => import('./three/HeroScene'))

const anos = new Date().getFullYear() - empresa.fundacao

const etapas = [
  { n: '01', t: 'Chapa', d: 'Galvanizada, alumínio ou inox' },
  { n: '02', t: 'Dobra', d: 'Na nossa oficina, sob medida' },
  { n: '03', t: 'Calha', d: 'Instalada pela equipe própria' },
]

export function Hero() {
  const mobile = useIsMobile()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const intro = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.3 } })
      intro
        .from('.hx-line', { yPercent: 115, stagger: 0.08 })
        .from('.hx-fade', { y: 20, opacity: 0, stagger: 0.07, duration: 1 }, '-=0.9')
        .from('.hx-spot', { opacity: 0, scale: 0.6, duration: 2 }, 0)

      // Rolagem fixa: a chapa termina de dobrar e as etapas acendem uma a uma
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.hx-pin',
            start: 'top top',
            end: '+=170%',
            scrub: 0.8,
            pin: true,
            onUpdate: (self) => {
              heroProgress.p = self.progress
              const etapa = self.progress < 0.2 ? 0 : self.progress < 0.62 ? 1 : 2
              gsap.utils.toArray<HTMLElement>('.hx-step').forEach((el, i) => el.classList.toggle('is-on', i <= etapa))
              gsap.set('.hx-bar', { scaleX: Math.max(0.05, Math.min(self.progress / 0.85, 1)) })
            },
          },
        })
        .to('.hx-copy', { yPercent: -12, opacity: 0.1, ease: 'none', duration: 0.3 }, 0.55)
        .fromTo('.hx-done', { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none', duration: 0.3 }, 0.7)
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" className="relative">
      <div className="hx-pin relative h-[100svh] overflow-hidden bg-[linear-gradient(180deg,#0b0a0a_0%,#120d0c_60%,#1c0f0d_100%)]">
        {/* Cone de luz de oficina, brilho no piso e réguas */}
        <div className="hx-spot pointer-events-none absolute top-[-20%] right-[-10%] h-[120%] w-[80%] bg-[radial-gradient(ellipse_at_60%_10%,rgba(255,255,255,0.10)_0%,transparent_55%)] md:right-[-5%]" />
        <div className="hx-spot pointer-events-none absolute bottom-[8%] left-1/2 h-40 w-[90%] -translate-x-1/2 rounded-[100%] bg-brand/25 blur-[90px] md:left-[66%] md:w-[50%]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.035)_0_1px,transparent_1px_80px)] [mask-image:linear-gradient(transparent,#000)]" />

        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene mobile={mobile} />
          </Suspense>
        </div>

        <div className="pointer-events-none relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-8 sm:px-8 md:justify-center md:pb-0">
          <div className="hx-copy pointer-events-auto max-w-xl">
            <p className="hx-fade eyebrow mb-5 flex items-center gap-2">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-brand" />
              Fabricação própria · São Bernardo do Campo
            </p>
            <h1 className="font-display text-[3.9rem] leading-[0.84] text-white sm:text-8xl lg:text-[8.2rem]">
              {['Dobramos', 'aço em', 'calhas.'].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-1">
                  <span className={`hx-line block ${i === 2 ? 'text-brand' : 'text-steel'}`}>{l}</span>
                </span>
              ))}
            </h1>
            <p className="hx-fade mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              Calhas, rufos, coifas e dutos sob medida, da chapa à instalação, há {anos} anos no Grande ABCD.
            </p>
            <div className="hx-fade mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink('Olá! Gostaria de agendar uma visita para orçamento.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 font-semibold text-white shadow-[0_12px_40px_-8px_rgba(227,57,38,0.8)] transition-transform hover:scale-[1.03]"
              >
                <WhatsIcon className="size-5" /> Agendar visita técnica
              </a>
              <a href="#trabalhos" className="glass flex items-center justify-center rounded-full px-7 py-4 font-medium text-white/90 hover:bg-white/10">
                Ver obras
              </a>
            </div>
          </div>
        </div>

        {/* Linha do processo: acompanha a dobra */}
        <div className="hx-fade absolute top-24 right-5 left-5 sm:top-auto sm:right-8 sm:bottom-8 sm:left-auto sm:w-[min(560px,46vw)]">
          <div className="h-px w-full bg-white/10">
            <div className="hx-bar h-px origin-left scale-x-[0.05] bg-brand" />
          </div>
          <ol className="mt-3 grid grid-cols-3 gap-3">
            {etapas.map((e, i) => (
              <li key={e.n} className={`hx-step group text-white/30 transition-colors duration-500 [&.is-on]:text-white ${i === 0 ? 'is-on' : ''}`}>
                <span className="font-mono text-[10px] tracking-widest group-[.is-on]:text-brand">{e.n}</span>
                <p className="font-display text-2xl leading-none sm:text-3xl">{e.t}</p>
                <p className="mt-1 hidden text-xs text-white/40 sm:block">{e.d}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="hx-done font-display pointer-events-none absolute right-5 bottom-[34%] text-right text-4xl leading-[0.9] text-white opacity-0 sm:right-8 sm:bottom-32 sm:text-6xl">
          Pronta para
          <br />
          <span className="text-brand">a próxima chuva.</span>
        </p>
      </div>
    </section>
  )
}

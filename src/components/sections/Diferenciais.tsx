import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

const paineis = [
  {
    n: '01',
    titulo: 'Fabricação própria',
    texto:
      'Todos os produtos em chapa galvanizada, inox ou alumínio saem da nossa oficina. Temos os equipamentos para concluir o projeto com atendimento personalizado.',
    img: '/img/ai/chapas-dobradas.webp',
  },
  {
    n: '02',
    titulo: 'Instalação com equipe própria',
    texto:
      'Profissionais especializados instalam calhas, rufos, coifas e dutos. Fornecemos o conjunto completo, com todos os acessórios de montagem.',
    img: '/img/ai/obra-residencia-tratada.webp',
  },
  {
    n: '03',
    titulo: 'Visita técnica para orçar',
    texto:
      'Reconhecer o local é a forma mais precisa de orçar. Para peças sob medida, você também pode enviar o seu desenho.',
    img: '/img/desenho-calha-1.jpg',
  },
]

// Rolagem horizontal fixada: a seção para e os painéis correm de lado.
export function Diferenciais() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = track.current
      if (!el) return
      const dist = () => el.scrollWidth - window.innerWidth
      const tween = gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
      // Imagens com paralaxe interna enquanto o trilho anda
      gsap.utils.toArray<HTMLElement>('.df-img').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        )
      })
      gsap.to('.df-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: true },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="empresa" className="relative h-[100svh] overflow-hidden bg-paper text-ink">
      <div className="absolute inset-x-0 top-0 h-1 bg-ink/10">
        <div className="df-progress h-full origin-left scale-x-0 bg-brand" />
      </div>
      <div ref={track} className="flex h-full w-max items-center gap-6 px-5 sm:gap-10 sm:px-12">
        <div className="flex w-[85vw] shrink-0 flex-col justify-center sm:w-[42vw]">
          <p className="font-mono text-[11px] tracking-[0.18em] text-brand-deep uppercase">Por que a Afonsina</p>
          <h2 className="font-display mt-4 text-[4.2rem] leading-[0.85] sm:text-[8.5rem]">
            Três coisas
            <br />
            que a gente
            <br />
            <span className="text-brand">não terceiriza.</span>
          </h2>
          <p className="mt-6 max-w-sm text-ink/60">Role para o lado →</p>
        </div>

        {paineis.map((p) => (
          <article key={p.n} className="relative flex h-[78svh] w-[85vw] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-ink text-white sm:w-[62vw] lg:w-[48vw]">
            <div className="relative h-1/2 overflow-hidden">
              <img src={p.img} alt="" loading="lazy" className={`df-img absolute inset-0 h-full w-[124%] max-w-none -translate-x-[12%] object-cover opacity-80 ${p.n === "03" ? "invert" : ""}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-7 sm:p-10">
              <h3 className="font-display text-[2.6rem] leading-[0.9] sm:text-6xl">{p.titulo}</h3>
              <div className="flex items-end justify-between gap-6">
                <p className="max-w-sm text-[15px] leading-relaxed text-white/65">{p.texto}</p>
                <span className="font-display text-outline text-8xl leading-none sm:text-9xl">{p.n}</span>
              </div>
            </div>
          </article>
        ))}
        <div className="w-[5vw] shrink-0" />
      </div>
    </section>
  )
}

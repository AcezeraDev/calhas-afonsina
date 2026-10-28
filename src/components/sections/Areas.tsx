import { useRef } from 'react'
import { areas } from '@/data'
import { gsap, useGSAP } from '@/lib/gsap'

const tons = ['#1d1a1a', '#7f2721', '#e33926']

// Cartas empilhadas: cada área gruda no topo e a anterior encolhe e escurece por baixo.
export function Areas() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.ar-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card.querySelector('.ar-inner'), {
          scale: 0.9,
          filter: 'brightness(0.45)',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 15%', scrub: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.ar-photo').forEach((img) => {
        gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative bg-ink px-4 pt-24 pb-24 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">Áreas de atuação</p>
        <h2 className="font-display text-[3.4rem] leading-[0.88] text-white sm:text-8xl">
          Da casa
          <br />à indústria.
        </h2>
      </div>

      <div className="mx-auto mt-14 max-w-6xl">
        {areas.map((a, i) => (
          <div key={a.titulo} className="ar-card sticky top-20 pb-6 sm:top-24">
            <div
              className="ar-inner grid origin-top overflow-hidden rounded-[2rem] border border-white/10 md:grid-cols-[1.1fr_1fr]"
              style={{ background: tons[i] }}
            >
              <div className="flex flex-col justify-between gap-10 p-7 sm:p-12">
                <div className="flex items-center justify-between font-mono text-xs tracking-[0.18em] text-white/60 uppercase">
                  <span>Área {String(i + 1).padStart(2, '0')}</span>
                  <span>{i + 1} / {areas.length}</span>
                </div>
                <div>
                  <h3 className="font-display text-6xl leading-[0.85] text-white sm:text-8xl">{a.titulo}</h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-base">{a.texto}</p>
                </div>
              </div>
              <div className="relative h-56 overflow-hidden sm:h-80 md:h-auto md:min-h-[420px]">
                <img src={a.img} alt={`Trabalho ${a.titulo.toLowerCase()}`} loading="lazy" className="ar-photo absolute inset-0 h-[120%] w-full -translate-y-[10%] object-cover" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

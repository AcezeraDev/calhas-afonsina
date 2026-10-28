import { AnimatePresence, motion } from 'motion/react'
import { CloudRain, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { dicas, faq } from '@/data'
import { gsap, useGSAP } from '@/lib/gsap'
import { Reveal, spring } from '../ui-kit'

function Faq() {
  const [aberto, setAberto] = useState<number | null>(0)
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {faq.map((f, i) => {
        const on = aberto === i
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setAberto(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-2xl text-white sm:text-3xl">{f.q}</span>
              <motion.span animate={{ rotate: on ? 45 : 0 }} transition={spring} className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 text-brand">
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={spring}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 leading-relaxed text-white/60">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

function Captacao() {
  const [chuva, setChuva] = useState(1400)
  const [area, setArea] = useState(120)
  const litros = Math.round(chuva * area * 0.85)
  const meta = 120000
  const pct = Math.min(litros / meta, 1)

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <CloudRain className="absolute -top-6 -right-6 size-40 text-white/[0.04]" />
      <p className="eyebrow">Captação de água da chuva</p>
      <h3 className="mt-2 font-display text-4xl text-white">Vale a pena captar?</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Precipitação média × área do telhado × 0,85 (fator de perda) = volume disponível por ano. Para uma casa de 4
        pessoas, o ideal é chegar a 120 mil litros. O telhado mínimo recomendado é de 100 m².
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-white/60">Chuva média da região (mm/ano)</span>
          <input
            type="number"
            inputMode="numeric"
            value={chuva}
            min={0}
            onChange={(e) => setChuva(Math.max(0, Number(e.target.value)))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-white outline-none focus:border-brand"
          />
          <span className="mt-1 block text-xs text-white/35">Valor de exemplo. Confira a média da sua cidade.</span>
        </label>
        <label className="block">
          <span className="text-sm text-white/60">Área do telhado (m²)</span>
          <input
            type="number"
            inputMode="numeric"
            value={area}
            min={0}
            onChange={(e) => setArea(Math.max(0, Number(e.target.value)))}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-white outline-none focus:border-brand"
          />
          {area > 0 && area < 100 && <span className="mt-1 block text-xs text-brand">Abaixo dos 100 m² recomendados.</span>}
        </label>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <span className="text-sm text-white/50">Volume por ano</span>
          <span className="font-display text-5xl text-white">
            {litros.toLocaleString('pt-BR')} <span className="text-2xl text-white/50">L</span>
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-deep to-brand" animate={{ width: `${pct * 100}%` }} transition={spring} />
        </div>
        <p className="mt-2 text-xs text-white/40">{Math.round(pct * 100)}% da meta de 120 mil litros/ano (casa de 4 pessoas)</p>
      </div>
    </div>
  )
}

export function Dicas() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // O "reservatório" ao lado enche conforme você lê as dicas
      gsap.fromTo('.dc-water', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.dc-list', start: 'top 70%', end: 'bottom 60%', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.dc-item').forEach((el) => {
        gsap.from(el, { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
    },
    { scope: root },
  )

  const itens = dicas.flatMap((d) => d.itens.map((t) => ({ grupo: d.titulo, t })))

  return (
    <section ref={root} id="dicas" className="relative bg-ink-2 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow mb-4">Dicas da Calhas Afonsina</p>
          <h2 className="font-display text-[3.4rem] leading-[0.88] text-white sm:text-8xl">
            Calha bem
            <br />
            cuidada
            <br />
            <span className="text-brand">dura mais.</span>
          </h2>
          <div className="mt-10 hidden items-end gap-5 lg:flex">
            <div className="relative h-56 w-24 overflow-hidden rounded-b-3xl border-2 border-t-0 border-white/25">
              <div className="dc-water absolute inset-0 origin-bottom bg-[linear-gradient(180deg,#e33926_0%,#7f2721_100%)]" />
              <div className="absolute inset-x-0 top-1/4 h-px bg-white/20" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
              <div className="absolute inset-x-0 top-3/4 h-px bg-white/20" />
            </div>
            <p className="max-w-[16rem] pb-2 text-sm leading-relaxed text-white/50">
              Água parada na calha leva à corrosão da chapa. Limpeza e revisão periódicas evitam infiltrações.
            </p>
          </div>
        </div>

        <ol className="dc-list space-y-3">
          {itens.map((it, i) => (
            <li key={it.t} className="dc-item flex gap-5 rounded-2xl border border-white/10 bg-ink p-6">
              <span className="font-display text-4xl leading-none text-brand">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase">{it.grupo}</p>
                <p className="mt-1.5 leading-relaxed text-white/80">{it.t}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-24 grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="eyebrow mb-4">Perguntas frequentes</p>
          <Faq />
        </Reveal>
        <Reveal delay={0.1}>
          <Captacao />
        </Reveal>
      </div>
    </section>
  )
}

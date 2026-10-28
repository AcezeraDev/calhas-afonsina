import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { empresa, waLink } from '@/data'
import { gsap, useGSAP } from '@/lib/gsap'
import { BorderBeam } from '../ui/border-beam'
import { Reveal, WhatsIcon } from '../ui-kit'

const opcoes = ['Calhas', 'Rufos', 'Coifas e exaustores', 'Dutos e chaminés', 'Peça sob medida', 'Manutenção']

const input =
  'w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand'

export function Contato() {
  const [servico, setServico] = useState(opcoes[0])
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Chamada gigante cresce e a faixa vermelha se abre a partir de uma fresta
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.ct-band', start: 'top 85%', end: 'center 45%', scrub: true } })
      tl.fromTo('.ct-band', { clipPath: 'inset(40% 8% 40% 8% round 3rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 0rem)', ease: 'none' }, 0)
      tl.fromTo('.ct-big', { scale: 0.55, yPercent: 30 }, { scale: 1, yPercent: 0, ease: 'none' }, 0)
    },
    { scope: root },
  )

  // Sem backend: monta a mensagem e abre o WhatsApp da empresa. Nada é enviado sem o visitante confirmar no app.
  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const texto = [
      'Olá! Gostaria de um orçamento.',
      `Nome: ${f.get('nome')}`,
      `Telefone: ${f.get('telefone')}`,
      `Cidade/bairro: ${f.get('cidade') || '-'}`,
      `Serviço: ${servico}`,
      `Detalhes: ${f.get('mensagem') || '-'}`,
    ].join('\n')
    window.open(waLink(texto), '_blank', 'noopener')
  }

  return (
    <section ref={root} id="contato" className="relative overflow-hidden pb-24 sm:pb-32">
      <div className="ct-band mb-20 flex min-h-[70svh] items-center justify-center overflow-hidden bg-brand px-4 sm:mb-28">
        <p className="ct-big font-display text-center text-[22vw] leading-[0.82] text-ink md:text-[15vw]" style={{ fontWeight: 900 }}>
          Vamos
          <br />
          <span className="text-white">orçar?</span>
        </p>
      </div>
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[160px]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="eyebrow mb-4">Orçamento</p>
          <h2 className="font-display text-[3.4rem] leading-[0.88] text-white sm:text-8xl">
            Visitamos
            <br />
            o local <em className="text-brand">para orçar.</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-white/60">
            Reconhecer o ambiente da obra é a melhor forma de fazer um orçamento preciso. Para peças sob medida, envie
            seu desenho. Se tiver dúvidas, chame a gente ou ligamos para você.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <WhatsIcon className="mt-1 size-5 shrink-0 text-brand" />
              <a href={waLink()} target="_blank" rel="noreferrer" className="text-lg text-white hover:text-brand">
                {empresa.whatsappLabel} <span className="text-sm text-white/40">WhatsApp</span>
              </a>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-brand" />
              <span className="flex flex-col text-lg text-white">
                {empresa.telefones.map((t) => (
                  <a key={t} href={`tel:+55${t.replace(/\D/g, '')}`} className="hover:text-brand">
                    {t}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-4">
              <Mail className="mt-1 size-5 shrink-0 text-brand" />
              <a href={`mailto:${empresa.email}`} className="text-lg break-all text-white hover:text-brand">
                {empresa.email}
              </a>
            </li>
            <li className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-brand" />
              <a href={empresa.mapa} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">
                {empresa.endereco}
                <br />
                {empresa.cidade} · CEP {empresa.cep}
              </a>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 size-5 shrink-0 text-brand" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-white/80">
                {empresa.horarios.map(([d, h]) => (
                  <div key={d} className="contents">
                    <dt className="text-white/50">{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={enviar} className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <BorderBeam size={160} duration={10} colorFrom="#e33926" colorTo="#7f2721" />
            <h3 className="font-display text-4xl text-white">Solicite um orçamento</h3>
            <p className="mt-1 text-sm text-white/50">Atendemos {empresa.area}.</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <input name="nome" required placeholder="Seu nome*" autoComplete="name" className={input} />
              <input name="telefone" required type="tel" placeholder="Seu telefone*" autoComplete="tel" className={input} />
              <input name="cidade" placeholder="Cidade / bairro" className={`${input} sm:col-span-2`} />
            </div>

            <fieldset className="mt-5">
              <legend className="mb-3 text-sm text-white/60">O que você precisa?</legend>
              <div className="flex flex-wrap gap-2">
                {opcoes.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setServico(o)}
                    aria-pressed={servico === o}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      servico === o ? 'border-brand bg-brand/20 text-white' : 'border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <textarea name="mensagem" rows={4} placeholder="Conte um pouco sobre a obra (medidas, tipo de telhado...)" className={`${input} mt-5 resize-none`} />

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold text-white shadow-[0_12px_40px_-8px_rgba(227,57,38,0.8)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="size-4" /> Enviar pelo WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-white/35">A mensagem abre no seu WhatsApp para você revisar antes de enviar.</p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

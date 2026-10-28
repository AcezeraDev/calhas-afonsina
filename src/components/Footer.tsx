import { empresa, nav, waLink } from '@/data'
import { WhatsIcon } from './ui-kit'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 pt-16 pb-28 md:pb-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <img src="/img/logo.png" alt="Calhas Afonsina" width={570} height={100} className="h-8 w-auto" loading="lazy" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Calhas, rufos, coifas, dutos e peças sob medida. Fabricação própria e instalação no Grande ABCD desde{' '}
              {empresa.fundacao}.
            </p>
          </div>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-white/60 hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <p
          aria-hidden
          className="text-steel pointer-events-none mt-16 font-display text-[19vw] leading-[0.8] tracking-tight opacity-[0.12] select-none md:text-[13vw]"
        >
          Afonsina
        </p>
        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-white/5 pt-6 text-xs text-white/35 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.
          </span>
          <span>
            {empresa.endereco} · {empresa.cidade}
          </span>
        </div>
      </div>

      {/* Atalho fixo de WhatsApp, sempre ao alcance do polegar */}
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
      >
        <WhatsIcon className="size-7" />
      </a>
    </footer>
  )
}

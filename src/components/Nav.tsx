import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { nav, waLink } from '@/data'
import { cn } from '@/lib/utils'
import { spring, WhatsIcon } from './ui-kit'

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.2 }}
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pr-2 pl-4 transition-colors duration-500 sm:pl-5',
          scrolled || open ? 'border border-white/10 bg-ink/80 shadow-2xl backdrop-blur-xl' : 'border border-transparent',
        )}
      >
        <a href="#topo" className="flex items-center" aria-label="Calhas Afonsina, início">
          <img src="/img/logo.png" alt="Calhas Afonsina" width={570} height={100} className="h-6 w-auto sm:h-7" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(227,57,38,0.7)] transition-transform hover:scale-[1.03] sm:flex"
          >
            <WhatsIcon className="size-4" /> Orçamento
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full bg-white/5 text-white md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={spring}
            className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl p-3 md:hidden"
          >
            {nav.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...spring, delay: 0.04 * i }}
                className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-3xl text-white active:bg-white/5"
              >
                {n.label}
                <span className="font-mono text-xs text-white/30">0{i + 1}</span>
              </motion.a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand py-4 font-semibold text-white"
            >
              <WhatsIcon className="size-5" /> Pedir orçamento no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

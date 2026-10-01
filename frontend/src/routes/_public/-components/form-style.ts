/**
 * A aparência dos campos dos formulários do site: contato, sócio, checkout e
 * a newsletter do rodapé.
 *
 * Classe sobre o `Input` do registry, e não variante nova nele: o
 * `components/ui/` é do shadcn e o próximo `shadcn add input` desfaria a
 * mudança. A régua é 48px de altura, que passa com folga dos 44px de alvo de
 * toque.
 */
export const FIELD =
  'h-12 rounded-none border border-foreground/35 bg-surface px-4 text-body md:text-body shadow-none placeholder:text-foreground/45 focus-visible:border-ink focus-visible:shadow-[3px_3px_0_0_var(--primary-glow)] focus-visible:ring-0'

/** O mesmo campo sobre o palco escuro do rodapé. */
export const FIELD_ON_STAGE =
  'h-12 rounded-sm border-2 border-on-stage/60 bg-transparent px-4 text-body md:text-body text-on-stage placeholder:text-on-stage/50 focus-visible:border-on-stage focus-visible:ring-0'

/** O rótulo acima de cada campo. */
export const LABEL = 'text-micro font-bold text-foreground '

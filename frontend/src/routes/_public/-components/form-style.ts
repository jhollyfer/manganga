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
  'h-12 rounded-xl border-foreground/15 bg-surface px-4 text-body placeholder:text-foreground/45 focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring/20'

/** O mesmo campo sobre o palco escuro do rodapé. */
export const FIELD_ON_STAGE =
  'h-12 rounded-full border-on-stage/20 bg-on-stage/[0.06] px-5 text-body text-on-stage placeholder:text-on-stage/45 focus-visible:border-brand-leaf/70 focus-visible:ring-2 focus-visible:ring-brand-leaf/25'

/** O rótulo acima de cada campo. */
export const LABEL = 'text-small font-medium text-foreground'

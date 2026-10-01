import { cva } from 'class-variance-authority'

/**
 * O estilo dos links de navegação: os da barra do desktop, os do painel do
 * celular e os do rodapé.
 *
 * O link ativo é marcado pelo `data-status="active"` que o `Link` do router
 * escreve sozinho, junto com `aria-current="page"`, e não por comparação de
 * `pathname` à mão.
 */
export const navLinkVariants = cva(
  'transition-colors duration-300 motion-reduce:transition-none',
  {
    variants: {
      tone: {
        /**
         * A barra do desktop, dentro do `NavigationMenu`. Metade da string é
         * reposição: o link do catálogo nasce com altura, recuo e fundo no
         * hover, e aqui ele é uma pílula de texto que só troca de cor.
         */
        bar: 'h-9 rounded-full bg-transparent px-3.5 py-2 text-small font-medium text-foreground/75 hover:bg-primary/[0.06] hover:text-foreground focus:bg-primary/[0.06] data-popup-open:bg-primary/[0.06] data-[status=active]:text-primary',
        /**
         * O painel do celular: títulos em serifa, um por linha. `min-h-11`
         * passa com folga dos 44px da WCAG 2.5.5.
         */
        sheet:
          'flex min-h-11 items-center border-b border-border py-3 font-display text-3xl text-foreground/75 data-[status=active]:text-primary',
        /** O rodapé, sobre o palco. `min-h-9` com a entrelinha cobre o alvo. */
        footer:
          'inline-flex min-h-9 items-center gap-1 text-small text-on-stage/70 hover:text-on-stage',
      },
    },
    defaultVariants: {
      tone: 'footer',
    },
  },
)

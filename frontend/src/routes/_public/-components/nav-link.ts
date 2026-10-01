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
        bar: 'h-9 rounded-none bg-transparent px-3 py-2 text-small font-medium text-foreground hover:bg-transparent hover:text-primary-glow focus:bg-transparent data-popup-open:bg-transparent data-popup-open:text-primary-glow data-[status=active]:underline data-[status=active]:decoration-1 data-[status=active]:underline-offset-[6px]',
        /**
         * O painel do celular: títulos grandes, um por linha. `min-h-11`
         * passa com folga dos 44px da WCAG 2.5.5.
         */
        sheet:
          'flex min-h-11 items-center border-b border-border py-2 font-display text-3xl font-bold tracking-[-0.02em] text-foreground [font-stretch:80%] data-[status=active]:text-primary-glow',
        /** O rodapé, sobre o palco. `min-h-9` com a entrelinha cobre o alvo. */
        footer:
          'inline-flex min-h-9 items-center gap-1 text-small text-on-stage/80 hover:text-primary-glow',
      },
    },
    defaultVariants: {
      tone: 'footer',
    },
  },
)

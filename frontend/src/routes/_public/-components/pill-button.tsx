import type * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { Merge } from '#/lib/interfaces'

/**
 * O botão do site: retângulo chapado, letra em caixa normal, e um afundar de
 * um pixel no clique. Sem a sombra deslocada da versão cartaz, que virou
 * enfeite repetido em toda chamada.
 *
 * Mora fora de `components/ui/button.tsx` porque aquele diretório é o que o
 * `shadcn` entrega, e `shadcn add button` reescreve o arquivo inteiro. O que é
 * do Mangangá **compõe** o botão de fábrica, que continua tratando foco,
 * `disabled`, `render` e ícone. O nome ficou `PillButton` da primeira versão,
 * redonda, e trocá-lo agora seria mexer em todo consumidor por estética.
 *
 *   ink            a ação principal: tinta escura com letra de papel
 *   outline        a secundária, só o fio do contorno
 *   light          a principal sobre a faixa verde ou sobre foto
 *   light-outline  a secundária sobre a faixa verde ou sobre foto
 */
const pillVariants = cva(
  "rounded-none border font-semibold tracking-[-0.005em] transition-[background-color,color,border-color,transform] duration-200 ease-out-expo active:translate-y-px motion-reduce:transition-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        ink: 'border-foreground bg-foreground text-background hover:border-primary hover:bg-primary hover:text-primary-foreground',
        outline:
          'border-foreground/40 bg-transparent text-foreground hover:border-foreground hover:bg-transparent hover:text-foreground',
        light:
          'border-on-stage bg-on-stage text-stage hover:border-primary-glow hover:bg-primary-glow hover:text-stage',
        'light-outline':
          'border-on-stage/50 bg-transparent text-on-stage hover:border-on-stage hover:bg-transparent hover:text-on-stage',
      },
      scale: {
        sm: 'h-8 gap-1.5 px-3 text-micro',
        md: 'h-10 gap-2 px-4 text-small',
        lg: 'h-12 gap-2 px-6 text-body',
      },
    },
    defaultVariants: {
      tone: 'ink',
      scale: 'lg',
    },
  },
)

/**
 * O resto das props vai para o `Button`, e `variant`/`size` ficam de fora: quem
 * decide os dois é este componente. Sem o `Omit`, um `variant="link"`
 * esquecido passaria pelo tipo e desmontaria a pílula em silêncio.
 */
type PillButtonProps = Merge<
  Omit<React.ComponentProps<typeof Button>, 'variant' | 'size'>,
  VariantProps<typeof pillVariants>
>

function PillButton({
  className,
  tone = 'ink',
  scale = 'lg',
  render,
  nativeButton,
  ...props
}: PillButtonProps): React.JSX.Element {
  /*
    Quase toda pílula daqui é um link. O `Button` do Base UI assume
    `nativeButton` verdadeiro e avisa no console a cada render quando o
    elemento final não é `<button>`; com `render` presente o padrão passa a
    ser `false`, e quem quiser o contrário ainda diz na chamada.
  */
  let isNativeButton = nativeButton
  if (isNativeButton === undefined) isNativeButton = !render

  return (
    <Button
      {...props}
      render={render}
      nativeButton={isNativeButton}
      className={cn(pillVariants({ tone, scale }), className)}
    />
  )
}

export { PillButton, pillVariants }

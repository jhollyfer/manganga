import type * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { Merge } from '#/lib/interfaces'

/**
 * A pílula do site: o botão redondo do hero, das seções e da loja.
 *
 * Mora fora de `components/ui/button.tsx` porque aquele diretório é o que o
 * `shadcn` entrega, e `shadcn add button` reescreve o arquivo inteiro. O que é
 * do Mangangá **compõe** o botão de fábrica, que continua tratando foco,
 * `disabled`, `render` e ícone.
 *
 *   ink            a ação principal: verde-mata com texto branco
 *   outline        a secundária ao lado dela
 *   light          a principal sobre o palco escuro: branco com texto verde
 *   light-outline  a secundária sobre o palco
 */
const pillVariants = cva(
  "rounded-full border-[1.5px] font-semibold transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.98] motion-reduce:transition-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        ink: 'border-transparent bg-primary text-primary-foreground shadow-[0_10px_28px_-14px_var(--primary)] hover:bg-primary/90 hover:text-primary-foreground',
        outline:
          'border-foreground/20 bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/[0.05] hover:text-foreground',
        light:
          'border-transparent bg-on-stage text-stage hover:bg-white hover:text-stage',
        'light-outline':
          'border-on-stage/35 bg-transparent text-on-stage hover:border-on-stage/70 hover:bg-on-stage/10 hover:text-on-stage',
      },
      scale: {
        sm: 'h-8 gap-1.5 px-3 text-micro',
        md: 'h-10 gap-2 px-4 text-small',
        lg: 'h-12 gap-2 px-6 text-small',
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

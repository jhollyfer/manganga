import type * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { Merge } from '#/lib/interfaces'

/**
 * O botão do cartaz: retângulo de tinta com a sombra deslocada da
 * serigrafia, que afunda no clique como carimbo apertado no papel.
 *
 * Mora fora de `components/ui/button.tsx` porque aquele diretório é o que o
 * `shadcn` entrega, e `shadcn add button` reescreve o arquivo inteiro. O que é
 * do Mangangá **compõe** o botão de fábrica, que continua tratando foco,
 * `disabled`, `render` e ícone. O nome ficou `PillButton` da primeira versão,
 * redonda, e trocá-lo agora seria mexer em todo consumidor por estética.
 *
 *   ink            a ação principal: verde-mata com letra cor de osso
 *   outline        a secundária, só a tinta do contorno
 *   light          a principal sobre a folha verde: osso com letra verde
 *   light-outline  a secundária sobre a folha verde
 */
const pillVariants = cva(
  "rounded-sm border-2 font-bold tracking-[0.02em] uppercase transition-[transform,box-shadow,background-color,color] duration-150 ease-out-expo active:translate-x-[3px] active:translate-y-[3px] active:shadow-none motion-reduce:transition-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        ink: 'border-ink bg-primary text-primary-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-primary hover:text-primary-foreground hover:shadow-[2px_2px_0_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px]',
        outline:
          'border-ink bg-surface text-foreground shadow-[4px_4px_0_0_var(--ink)] hover:bg-surface hover:text-foreground hover:shadow-[2px_2px_0_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px]',
        light:
          'border-on-stage bg-on-stage text-stage shadow-[4px_4px_0_0_var(--primary-glow)] hover:bg-on-stage hover:text-stage hover:shadow-[2px_2px_0_0_var(--primary-glow)] hover:translate-x-[2px] hover:translate-y-[2px]',
        'light-outline':
          'border-on-stage bg-transparent text-on-stage hover:bg-on-stage/10 hover:text-on-stage',
      },
      scale: {
        sm: 'h-8 gap-1.5 px-3 text-micro',
        md: 'h-10 gap-2 px-4 text-micro',
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

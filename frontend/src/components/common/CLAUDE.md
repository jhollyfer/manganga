# Components Common

O **kit** do site: peças que mais de uma área alcança. Diferente de
`components/ui` (design system puro sobre Base UI), estas carregam a cara do
Mangangá.

## O critério: rota, não pasta

Da skill `code-pattern` §8: um componente só mora aqui se **mais de uma área**
o usa, e o que conta é quantas áreas o alcançam, não quantas vezes ele é
importado.

O que é peça da vitrine e só a vitrine usa mora na casca pública, em
`routes/_public/-components/`, mesmo quando dez páginas o consomem. É o caso do
`PageHero`, do `PillButton`, do `SectionHeading`, do `reveal.ts`, do `menu.ts`,
do carrinho e dos formulários. Sobe para cá o que uma área **fora** da vitrine
(a entrada e o painel) também desenha.

| Peça                 | Por que mora aqui                                               |
| -------------------- | --------------------------------------------------------------- |
| `not-found-page.tsx` | o `router.tsx` desenha o 404 e o erro fora de qualquer casca    |
| `brand-mark.tsx`     | a estrela do Besouro aparece na vitrine, na entrada e no painel |
| `theme-toggle.tsx`   | a vitrine e o painel alternam o tema com o mesmo botão          |
| `scenery.tsx`        | a paisagem desenhada serve a vitrine e o 404 do `router.tsx`    |

## Compound onde há estado compartilhado

`not-found-page.tsx` é compound sem diretório próprio: `NotFoundPage` com
`Title`, `Subtitle`, `Description`, `Actions` e `HomeButton`. O texto vai por
slot; o que fica em prop é o `code` e o destino do botão.

Peça sem estado compartilhado não vira compound: um provider vazio é só
cerimônia.

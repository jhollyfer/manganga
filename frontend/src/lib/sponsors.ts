/**
 * Quem apoia o boi.
 *
 * **Vazia de propósito.** A faixa de apoiadores da home desenha o nome de cada
 * marca, e nome de empresa ou órgão público só entra aqui com o acordo
 * fechado: anunciar apoio que não existe é o tipo de coisa que não se
 * publica. Enquanto a lista estiver vazia, a faixa vira o convite para
 * patrocinar.
 */
export type Sponsor = {
  name: string
  href?: string
}

export const SPONSORS: ReadonlyArray<Sponsor> = []

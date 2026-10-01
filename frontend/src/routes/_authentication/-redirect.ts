/**
 * O `?redirect=` da entrada: para onde voltar depois do login.
 *
 * Quem escreve é o guarda do painel, quando manda para a entrada quem chegou
 * sem sessão por um link direto (`/painel/membros?page=3`). Validado à mão
 * porque o `validateSearch` é síncrono e o VineJS não é.
 *
 * Só caminho interno passa. O parâmetro mora na URL, e URL se cola e se edita:
 * sem esta régua, `/entrar?redirect=https://golpe.example` levaria a diretoria
 * para outro site logo depois de digitar a senha, que é o momento em que ela
 * mais confia no que vê. `//golpe.example` é endereço absoluto para o
 * navegador, então a barra dupla também fica de fora.
 */
export type SignInSearch = {
  redirect?: string
}

const MAX_LENGTH = 512

export function safeRedirect(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  if (value.length > MAX_LENGTH) return undefined
  if (!value.startsWith('/')) return undefined
  if (value.startsWith('//') || value.startsWith('/\\')) return undefined

  return value
}

export function validateSignInSearch(
  search: Record<string, unknown>,
): SignInSearch {
  const redirect = safeRedirect(search.redirect)
  if (!redirect) return {}

  return { redirect }
}

/**
 * O cliente HTTP da API AdonisJS do Mangangá.
 *
 * `fetch` e não axios, que o site antigo usava: o que ele fazia aqui era base
 * URL, cookie e um cabeçalho, e são dez linhas sem dependência. O resto (cache,
 * nova tentativa, invalidação) é trabalho do TanStack Query, não do cliente.
 *
 * A sessão é cookie `httpOnly` emitido pela API, então toda chamada vai com
 * `credentials: 'include'` e nenhum token passa pelo JavaScript.
 *
 * O fuso vai em `X-Timezone`, como no site antigo: o painel conta "cadastros
 * de hoje", e hoje em Benjamin Constant (UTC-5) não é hoje em Brasília.
 */
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

/** O corpo de erro que a API devolve, quando devolve um. */
export type ApiErrorBody = {
  message?: string
  cause?: string
}

/**
 * Uma resposta fora da faixa 2xx.
 *
 * `status` e `reason` separados porque é por eles que a tela decide: o 409 com
 * `MEMBER_ALREADY_EXISTS` vira erro no campo de documento, o 401 manda para a
 * entrada, o resto vira aviso genérico.
 */
export class HttpError extends Error {
  readonly status: number
  readonly reason: string | undefined

  constructor(status: number, body: ApiErrorBody) {
    super(body.message ?? `HTTP ${status}`)
    this.name = 'HttpError'
    this.status = status
    this.reason = body.cause
  }
}

function timezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

async function errorBody(response: Response): Promise<ApiErrorBody> {
  try {
    const data: unknown = await response.json()
    if (typeof data !== 'object' || data === null) return {}

    const message: unknown = Reflect.get(data, 'message')
    const cause: unknown = Reflect.get(data, 'cause')

    const body: ApiErrorBody = {}
    if (typeof message === 'string') body.message = message
    if (typeof cause === 'string') body.cause = cause

    return body
  } catch {
    return {}
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  query?: Record<string, string | number | undefined>
  signal?: AbortSignal
}

function buildUrl(path: string, query: RequestOptions['query']): string {
  const url = new URL(path, API_URL)

  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined || value === '') continue
    url.searchParams.set(key, String(value))
  }

  return url.toString()
}

async function send(path: string, options: RequestOptions): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-Timezone': timezone(),
  }

  let body: string | undefined
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(options.body)
  }

  const response = await fetch(buildUrl(path, options.query), {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers,
    body,
    signal: options.signal,
  })

  if (!response.ok)
    throw new HttpError(response.status, await errorBody(response))

  return response
}

/**
 * Uma chamada que devolve JSON.
 *
 * O tipo de retorno é **declarado por quem chama**, não verificado: a API é
 * nossa, e o contrato mora nos tipos de `lib/model.ts`. `unknown` no meio e o
 * genérico na ponta, que é o único lugar onde o tipo é afirmado.
 */
export async function http<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const response = await send(path, options)

  if (response.status === 204) return parseJson<TResponse>('null')

  return parseJson<TResponse>(await response.text())
}

function parseJson<TResponse>(text: string): TResponse {
  const data: TResponse = JSON.parse(text || 'null')

  return data
}

/** Uma chamada que devolve arquivo, como a exportação da planilha de membros. */
export async function httpBlob(
  path: string,
  options: RequestOptions = {},
): Promise<Blob> {
  const response = await send(path, options)

  return response.blob()
}

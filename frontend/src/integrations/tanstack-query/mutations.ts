import { mutationOptions } from '@tanstack/react-query'

import { http, httpBlob } from './http'
import type { Member, MemberPayload } from '#/lib/model'
import type { SignInPayload } from '#/lib/validator'

/**
 * As escritas da API, uma `mutationOptions()` por operação.
 *
 * Só a chamada mora aqui: `mutationKey` e `mutationFn`. O que acontece depois
 * (aviso, navegação, erro no campo, invalidação) é da tela, que é quem sabe
 * para onde a pessoa vai e qual campo acusar. Quem usa espalha a opção e
 * acrescenta os próprios `onSuccess` e `onError`:
 *
 *     useMutation({ ...createMemberMutation(), onSuccess() { ... } })
 *
 * A chave existe para o `useMutationState` e o `isMutating`, e porque o
 * devtools mostra uma mutação sem chave como anônima.
 */

export function signInMutation() {
  return mutationOptions({
    mutationKey: ['authentication', 'sign-in'],
    mutationFn: (payload: SignInPayload) =>
      http<unknown>('/authentication/sign-in', {
        method: 'POST',
        body: payload,
      }),
  })
}

export function signOutMutation() {
  return mutationOptions({
    mutationKey: ['authentication', 'sign-out'],
    mutationFn: () =>
      http<unknown>('/authentication/sign-out', { method: 'POST' }),
  })
}

export function createMemberMutation() {
  return mutationOptions({
    mutationKey: ['administrator', 'members', 'create'],
    mutationFn: (payload: MemberPayload) =>
      http<Member>('/administrator/members', {
        method: 'POST',
        body: payload,
      }),
  })
}

export function updateMemberMutation(id: string) {
  return mutationOptions({
    mutationKey: ['administrator', 'members', 'update', id],
    mutationFn: (payload: MemberPayload) =>
      http<Member>('/administrator/members/'.concat(encodeURIComponent(id)), {
        method: 'PATCH',
        body: payload,
      }),
  })
}

/** A planilha de todos os membros, como `Blob`: quem chama decide o download. */
export function exportMembersMutation() {
  return mutationOptions({
    mutationKey: ['administrator', 'members', 'export'],
    mutationFn: () => httpBlob('/administrator/members/export-to-excel'),
  })
}

/** O 409 que a API devolve quando o documento já é de outro membro. */
export const MEMBER_ALREADY_EXISTS = 'MEMBER_ALREADY_EXISTS'

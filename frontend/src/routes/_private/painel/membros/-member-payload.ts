import { isoToBrDate } from '#/lib/formatter'
import type { Member, MemberPayload } from '#/lib/model'
import { digitsOnly, toIsoDate } from '#/lib/validator'
import type { MemberUpsertPayload } from '#/lib/validator'

/**
 * A ponte entre o formulário de membro e a API, nos dois sentidos.
 *
 * O formulário fala a língua de quem digita: data `dd/mm/aaaa`, CPF com ou sem
 * pontuação, nome da mãe e do pai soltos. A API fala a dela: data ISO,
 * documento só com dígitos e a filiação dentro de `responsible`. Converter num
 * lugar só, e testado, é o que impede o cadastro e a edição de mandarem
 * corpos diferentes para o mesmo endpoint, que era o risco no painel antigo,
 * onde cada folha montava o seu.
 */

/** O que vai no `POST` e no `PATCH` de `/administrator/members`. */
export function toMemberPayload(values: MemberUpsertPayload): MemberPayload {
  return {
    name: values.name,
    document: digitsOnly(values.document),
    birthDate: toIsoDate(values.birthDate),
    role: values.role,
    extras: values.extras ?? null,
    responsible: {
      mother: values.mother,
      father: values.father ?? null,
    },
  }
}

/** O cadastro novo começa como brincante, que é quase todo mundo. */
export const EMPTY_MEMBER: MemberUpsertPayload = {
  name: '',
  document: '',
  birthDate: '',
  role: 'PARTICIPANT',
  mother: '',
  father: null,
  extras: null,
}

/**
 * O membro da API como valores iniciais da edição.
 *
 * `user` pode vir `null` num registro antigo, sem conta ligada; o formulário
 * abre com os campos dele vazios em vez de quebrar, e a validação pede o que
 * faltar.
 */
export function toMemberFormValues(member: Member): MemberUpsertPayload {
  return {
    name: member.user?.name ?? '',
    document: member.document,
    birthDate: isoToBrDate(member.birthDate),
    role: member.user?.role ?? EMPTY_MEMBER.role,
    mother: member.user?.responsible?.mother ?? '',
    father: member.user?.responsible?.father ?? null,
    extras: member.extras,
  }
}

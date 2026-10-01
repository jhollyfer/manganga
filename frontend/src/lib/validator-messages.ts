import { SimpleMessagesProvider } from '@vinejs/vine'
import type { MessagesProviderContact } from '@vinejs/vine/types'

import { getLocale } from '#/paraglide/runtime'
import type { Locale } from '#/paraglide/runtime'

/**
 * As mensagens por regra, nos três idiomas do site.
 *
 * A busca do VineJS vai do mais específico ao mais genérico (`campo.regra`,
 * depois `regra`), então a regra genérica cobre o caso comum e só o que destoa
 * ganha linha própria.
 *
 * `{{ field }}` é trocado pelo nome amigável de `FIELD_LABELS`, e só aparece
 * onde a frase começa por verbo. Nas demais o nome é omitido: o erro sai sob o
 * campo já rotulado.
 *
 * Tabela em código e não no `messages/*.json` do paraglide: as chaves do
 * VineJS têm ponto (`message.minLength`) e as variáveis usam `{{ }}`, e as duas
 * coisas colidiriam com a sintaxe das mensagens do paraglide.
 */
export const RULE_MESSAGES: Record<Locale, Record<string, string>> = {
  'pt-BR': {
    required: 'Informe {{ field }}',
    string: 'Informe {{ field }}',
    enum: 'Selecione {{ field }}',
    email: 'Informe um e-mail válido',
    regex: 'Confira o formato de {{ field }}',
    minLength: 'Informe ao menos {{ min }} caracteres',
    maxLength: 'Informe no máximo {{ max }} caracteres',
  },
  en: {
    required: 'Enter {{ field }}',
    string: 'Enter {{ field }}',
    enum: 'Select {{ field }}',
    email: 'Enter a valid email',
    regex: 'Check the format of {{ field }}',
    minLength: 'Enter at least {{ min }} characters',
    maxLength: 'Enter at most {{ max }} characters',
  },
  es: {
    required: 'Ingresa {{ field }}',
    string: 'Ingresa {{ field }}',
    enum: 'Selecciona {{ field }}',
    email: 'Ingresa un correo válido',
    regex: 'Revisa el formato de {{ field }}',
    minLength: 'Ingresa al menos {{ min }} caracteres',
    maxLength: 'Ingresa como máximo {{ max }} caracteres',
  },
}

/**
 * O nome amigável de cada campo, na forma que cai bem depois do verbo.
 *
 * Campo fora deste mapa aparece com o nome cru ("Informe birthDate").
 * `validator-messages.test.ts` percorre os validators e cobra a lista inteira,
 * nos três idiomas.
 */
export const FIELD_LABELS: Record<Locale, Record<string, string>> = {
  'pt-BR': {
    name: 'o nome',
    email: 'o e-mail',
    subject: 'o assunto',
    message: 'a mensagem',
    document: 'o CPF ou RG',
    birthDate: 'a data de nascimento',
    category: 'como quer participar',
    role: 'o papel',
    mother: 'o nome da mãe',
    father: 'o nome do pai',
    extras: 'as observações',
    password: 'a senha',
    phone: 'o telefone',
    cep: 'o CEP',
    street: 'a rua',
    number: 'o número',
    complement: 'o complemento',
    district: 'o bairro',
    city: 'a cidade',
    state: 'a UF',
    payment: 'a forma de pagamento',
  },
  en: {
    name: 'your name',
    email: 'your email',
    subject: 'a subject',
    message: 'a message',
    document: 'your ID number',
    birthDate: 'your date of birth',
    category: 'how you want to take part',
    role: 'a role',
    mother: "your mother's name",
    father: "your father's name",
    extras: 'the notes',
    password: 'your password',
    phone: 'your phone',
    cep: 'the postal code',
    street: 'the street',
    number: 'the number',
    complement: 'the complement',
    district: 'the district',
    city: 'the city',
    state: 'the state',
    payment: 'a payment method',
  },
  es: {
    name: 'tu nombre',
    email: 'tu correo',
    subject: 'un asunto',
    message: 'un mensaje',
    document: 'tu documento',
    birthDate: 'tu fecha de nacimiento',
    category: 'cómo quieres participar',
    role: 'un rol',
    mother: 'el nombre de tu madre',
    father: 'el nombre de tu padre',
    extras: 'las observaciones',
    password: 'tu contraseña',
    phone: 'tu teléfono',
    cep: 'el código postal',
    street: 'la calle',
    number: 'el número',
    complement: 'el complemento',
    district: 'el barrio',
    city: 'la ciudad',
    state: 'el estado',
    payment: 'una forma de pago',
  },
}

/** O provider do idioma da requisição. */
function current(): SimpleMessagesProvider {
  const locale = getLocale()

  return new SimpleMessagesProvider(RULE_MESSAGES[locale], FIELD_LABELS[locale])
}

/**
 * O provider global do `vine`, que troca de idioma a cada mensagem.
 *
 * É a única diferença para o academy, que atribui um `SimpleMessagesProvider`
 * fixo: lá o site só fala português. Aqui um provider montado uma vez no
 * carregamento do módulo congelaria as mensagens no idioma da primeira
 * requisição do servidor, então ele delega para um provider do idioma de agora.
 */
export const messages: MessagesProviderContact = {
  getMessage(defaultMessage, rule, field, meta) {
    return current().getMessage(defaultMessage, rule, field, meta)
  },
}

import type { LocalizedText } from './i18n'

/**
 * Os textos de privacidade e termos de uso.
 *
 * Escritos para o que o site faz hoje: o cadastro de sócio vai para a API, a
 * newsletter e o contato não guardam nada no servidor, e o carrinho e os
 * pedidos da loja ficam no navegador de quem compra. Quando isso mudar, o
 * texto muda junto, no mesmo commit.
 *
 * **Revisar com a assessoria jurídica da associação** antes de publicar: o
 * texto segue a LGPD e o Código de Defesa do Consumidor, mas não substitui a
 * leitura de quem responde por eles.
 */
export type LegalSection = {
  title: LocalizedText
  paragraphs: ReadonlyArray<LocalizedText>
}

export type LegalDocument = {
  updatedAt: string
  sections: ReadonlyArray<LegalSection>
}

export const PRIVACY: LegalDocument = {
  updatedAt: '2026-10-01',
  sections: [
    {
      title: {
        'pt-BR': 'Quem cuida dos seus dados',
        en: 'Who looks after your data',
        es: 'Quién cuida tus datos',
      },
      paragraphs: [
        {
          'pt-BR':
            'A Associação Folclórica Boi Bumbá Mangangá, de Benjamin Constant, Amazonas, é a controladora dos dados pessoais tratados neste site, nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018).',
          en: 'The Boi Bumbá Mangangá Folk Association, of Benjamin Constant, Amazonas, is the controller of the personal data processed on this website, under Brazil’s General Data Protection Law (Law 13,709/2018).',
          es: 'La Asociación Folclórica Boi Bumbá Mangangá, de Benjamin Constant, Amazonas, es la responsable de los datos personales tratados en este sitio, según la Ley General de Protección de Datos de Brasil (Ley 13.709/2018).',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'O que coletamos e por quê',
        en: 'What we collect and why',
        es: 'Qué recogemos y por qué',
      },
      paragraphs: [
        {
          'pt-BR':
            'No cadastro de sócio e brincante: nome, documento, data de nascimento, filiação e observações, usados para organizar os grupos, os ensaios e a prestação de contas da associação. A filiação existe porque parte de quem brinca é menor de idade.',
          en: 'In the member and performer sign-up: name, ID number, date of birth, parents’ names and notes, used to organise groups, rehearsals and the association’s accountability. Parents’ names are requested because some performers are minors.',
          es: 'En el registro de socios y bailarines: nombre, documento, fecha de nacimiento, filiación y observaciones, usados para organizar los grupos, los ensayos y la rendición de cuentas de la asociación. La filiación se pide porque parte de quienes bailan son menores de edad.',
        },
        {
          'pt-BR':
            'Na loja: os dados de entrega e contato do pedido, que ficam guardados no seu navegador e são enviados à equipe só quando você confirma o pedido pelo WhatsApp ou pelo e-mail.',
          en: 'In the store: the order’s delivery and contact details, which stay in your browser and reach the team only when you confirm the order via WhatsApp or email.',
          es: 'En la tienda: los datos de entrega y contacto del pedido, que se guardan en tu navegador y llegan al equipo solo cuando confirmas el pedido por WhatsApp o correo.',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'Com quem compartilhamos',
        en: 'Who we share it with',
        es: 'Con quién compartimos',
      },
      paragraphs: [
        {
          'pt-BR':
            'Não vendemos nem cedemos dados pessoais. Eles podem ser compartilhados com a organização do festival quando a inscrição de brincantes exigir, e com transportadoras para a entrega de pedidos da loja.',
          en: 'We do not sell or hand over personal data. It may be shared with the festival organisers when performer registration requires it, and with carriers to deliver store orders.',
          es: 'No vendemos ni cedemos datos personales. Pueden compartirse con la organización del festival cuando la inscripción de bailarines lo exija, y con transportistas para entregar los pedidos de la tienda.',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'Seus direitos',
        en: 'Your rights',
        es: 'Tus derechos',
      },
      paragraphs: [
        {
          'pt-BR':
            'Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados, e revogar o consentimento, escrevendo para o e-mail de contato da associação. Respondemos em até quinze dias.',
          en: 'You may request access, correction or deletion of your data at any time, and withdraw consent, by writing to the association’s contact email. We reply within fifteen days.',
          es: 'Puedes pedir en cualquier momento el acceso, la corrección o la eliminación de tus datos, y revocar el consentimiento, escribiendo al correo de contacto de la asociación. Respondemos en hasta quince días.',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'Cookies e armazenamento local',
        en: 'Cookies and local storage',
        es: 'Cookies y almacenamiento local',
      },
      paragraphs: [
        {
          'pt-BR':
            'O site guarda no seu navegador o tema escolhido, o carrinho e os pedidos da loja. O painel da diretoria usa um cookie de sessão. Não usamos cookies de publicidade.',
          en: 'The website stores your chosen theme, the cart and store orders in your browser. The board panel uses a session cookie. We do not use advertising cookies.',
          es: 'El sitio guarda en tu navegador el tema elegido, el carrito y los pedidos de la tienda. El panel de la directiva usa una cookie de sesión. No usamos cookies publicitarias.',
        },
      ],
    },
  ],
}

export const TERMS: LegalDocument = {
  updatedAt: '2026-10-01',
  sections: [
    {
      title: {
        'pt-BR': 'Sobre o site',
        en: 'About the website',
        es: 'Sobre el sitio',
      },
      paragraphs: [
        {
          'pt-BR':
            'Este é o site oficial do Boi Bumbá Mangangá. Ao navegar e usar a loja, você aceita estes termos, que podem ser atualizados a qualquer tempo com a data no topo da página.',
          en: 'This is the official website of Boi Bumbá Mangangá. By browsing and using the store you accept these terms, which may be updated at any time with the date at the top of the page.',
          es: 'Este es el sitio oficial del Boi Bumbá Mangangá. Al navegar y usar la tienda aceptas estos términos, que pueden actualizarse en cualquier momento con la fecha en la parte superior de la página.',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'Marca e conteúdo',
        en: 'Brand and content',
        es: 'Marca y contenido',
      },
      paragraphs: [
        {
          'pt-BR':
            'O nome Mangangá, a estrela do Boi Besouro, as toadas, as fotos e os textos pertencem à associação ou a seus autores. O uso comercial depende de autorização por escrito.',
          en: 'The Mangangá name, the Boi Besouro star, the toadas, photos and texts belong to the association or their authors. Commercial use requires written permission.',
          es: 'El nombre Mangangá, la estrella del Boi Besouro, las toadas, las fotos y los textos pertenecen a la asociación o a sus autores. El uso comercial requiere autorización por escrito.',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'Compras na loja oficial',
        en: 'Official store purchases',
        es: 'Compras en la tienda oficial',
      },
      paragraphs: [
        {
          'pt-BR':
            'O pedido feito no site é confirmado pela equipe da loja, que combina o pagamento e a entrega. Preço, estoque e frete valem no momento da confirmação. Você pode desistir da compra em até sete dias do recebimento, como garante o Código de Defesa do Consumidor.',
          en: 'Orders placed on the website are confirmed by the store team, who arrange payment and delivery. Price, stock and shipping apply at the time of confirmation. You may cancel within seven days of receipt, as guaranteed by Brazil’s Consumer Protection Code.',
          es: 'El pedido hecho en el sitio lo confirma el equipo de la tienda, que acuerda el pago y la entrega. Precio, stock y envío valen al momento de la confirmación. Puedes desistir de la compra hasta siete días después de recibirla, como garantiza el Código de Defensa del Consumidor de Brasil.',
        },
      ],
    },
    {
      title: {
        'pt-BR': 'Responsabilidade',
        en: 'Liability',
        es: 'Responsabilidad',
      },
      paragraphs: [
        {
          'pt-BR':
            'Datas de eventos podem mudar por decisão da organização do festival ou por condições do rio. Avisamos as mudanças na agenda e no canal do WhatsApp assim que as recebemos.',
          en: 'Event dates may change by decision of the festival organisers or because of river conditions. We announce changes on the calendar and the WhatsApp channel as soon as we receive them.',
          es: 'Las fechas de los eventos pueden cambiar por decisión de la organización del festival o por las condiciones del río. Avisamos los cambios en la agenda y en el canal de WhatsApp en cuanto los recibimos.',
        },
      ],
    },
  ],
}

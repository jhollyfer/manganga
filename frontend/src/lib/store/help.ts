import type { LocalizedText } from '#/lib/i18n'

/**
 * A central de ajuda da loja: como comprar, entrega, pagamento, troca,
 * tamanhos e as perguntas que chegam toda semana no WhatsApp.
 *
 * Registro em `lib/` e não mensagem do paraglide, como notícia e item: é
 * conteúdo, com parágrafos que crescem e mudam a cada temporada, e mantê-lo
 * junto do próprio tópico impede uma tradução de ficar para trás da outra sem
 * ninguém ver.
 *
 * Os prazos e as regras valem para a loja estática de hoje. O que é lei
 * (arrependimento em sete dias, garantia de noventa) segue o Código de Defesa
 * do Consumidor e não muda com a temporada; o resto a diretoria revisa antes
 * de abrir as vendas, junto com os preços.
 */
export const HELP_SLUGS = [
  'como-comprar',
  'entregas-e-prazos',
  'pagamentos',
  'trocas-e-devolucoes',
  'guia-de-tamanhos',
  'perguntas-frequentes',
] as const

export type HelpSlug = (typeof HELP_SLUGS)[number]

export type HelpQuestion = {
  question: LocalizedText
  answer: LocalizedText
}

export type HelpTopic = {
  slug: HelpSlug
  title: LocalizedText
  summary: LocalizedText
  /** Os parágrafos do corpo, na ordem de leitura. */
  body: ReadonlyArray<LocalizedText>
  /** As perguntas do tópico, abertas uma de cada vez. */
  faq?: ReadonlyArray<HelpQuestion>
  /** Se a página desenha as tabelas de `sizes.ts` depois do texto. */
  sizeChart?: boolean
}

export const HELP_TOPICS: ReadonlyArray<HelpTopic> = [
  {
    slug: 'como-comprar',
    title: {
      'pt-BR': 'Como comprar',
      en: 'How to buy',
      es: 'Cómo comprar',
    },
    summary: {
      'pt-BR': 'Do carrinho à confirmação pelo WhatsApp, passo a passo.',
      en: 'From the cart to the WhatsApp confirmation, step by step.',
      es: 'Del carrito a la confirmación por WhatsApp, paso a paso.',
    },
    body: [
      {
        'pt-BR':
          'Escolha a peça, a cor e o tamanho na página do produto e toque em "Adicionar ao carrinho". No carrinho você ajusta as quantidades, aplica um cupom e calcula o frete pelo CEP. Não é preciso criar conta nem senha.',
        en: 'Pick the item, color and size on the product page and tap "Add to cart". In the cart you can adjust quantities, apply a coupon and estimate shipping with your postal code. No account or password needed.',
        es: 'Elige la prenda, el color y la talla en la página del producto y toca "Agregar al carrito". En el carrito ajustas las cantidades, aplicas un cupón y calculas el envío con el código postal. No hace falta crear cuenta ni contraseña.',
      },
      {
        'pt-BR':
          'Em "Finalizar compra", informe seus dados, o endereço de entrega e a forma de pagamento. Ao confirmar, o pedido recebe um código no formato MGA-XXXXXX, que aparece na tela e fica guardado neste navegador.',
        en: 'At "Checkout", enter your details, the delivery address and the payment method. When you confirm, the order gets a code like MGA-XXXXXX, shown on screen and saved in this browser.',
        es: 'En "Finalizar compra", ingresa tus datos, la dirección de entrega y la forma de pago. Al confirmar, el pedido recibe un código con el formato MGA-XXXXXX, que aparece en pantalla y queda guardado en este navegador.',
      },
      {
        'pt-BR':
          'O pagamento ainda não é processado no site. Em até um dia útil a equipe da loja chama você no WhatsApp com o código do pedido para confirmar os itens e enviar a chave Pix, o link do cartão ou o boleto. Se preferir adiantar, mande o código para nós pelo botão da página de confirmação.',
        en: 'Payment is not processed on the site yet. Within one business day the store team messages you on WhatsApp with the order code to confirm the items and send the Pix key, the card link or the boleto. If you want to speed things up, send us the code with the button on the confirmation page.',
        es: 'El pago todavía no se procesa en el sitio. En hasta un día hábil el equipo de la tienda te escribe por WhatsApp con el código del pedido para confirmar los artículos y enviar la clave Pix, el enlace de la tarjeta o el boleto. Si prefieres adelantar, envíanos el código con el botón de la página de confirmación.',
      },
      {
        'pt-BR':
          'Com o pagamento confirmado, o pedido vai para a separação no curral e depois para o envio. Cada mudança de etapa é avisada pelo mesmo WhatsApp, com o código de rastreio quando houver.',
        en: 'Once payment is confirmed, the order is packed at the curral and then shipped. Every step is announced on the same WhatsApp chat, with the tracking code when there is one.',
        es: 'Con el pago confirmado, el pedido pasa a la preparación en el corral y luego al envío. Cada cambio de etapa se avisa por el mismo WhatsApp, con el código de seguimiento cuando lo haya.',
      },
    ],
  },
  {
    slug: 'entregas-e-prazos',
    title: {
      'pt-BR': 'Entregas e prazos',
      en: 'Delivery and timing',
      es: 'Envíos y plazos',
    },
    summary: {
      'pt-BR': 'Correios, frete grátis acima de R$ 250 e retirada no curral.',
      en: 'Post office, free shipping over R$ 250 and pickup at the curral.',
      es: 'Correo, envío gratis desde R$ 250 y retiro en el corral.',
    },
    body: [
      {
        'pt-BR':
          'Os pedidos saem de Benjamin Constant, no Amazonas, pelos Correios. O prazo mostrado no carrinho é uma estimativa em dias úteis, contada a partir da confirmação do pagamento, e não da data da compra.',
        en: 'Orders ship from Benjamin Constant, Amazonas, through the Brazilian post office. The time shown in the cart is an estimate in business days, counted from payment confirmation, not from the purchase date.',
        es: 'Los pedidos salen de Benjamin Constant, Amazonas, por el correo brasileño. El plazo que muestra el carrito es una estimación en días hábiles, contada desde la confirmación del pago y no desde la fecha de compra.',
      },
      {
        'pt-BR':
          'O envio padrão é grátis em compras a partir de R$ 250 em produtos. O expresso continua cobrado, porque é o que mais custa para subir o rio. Daqui para qualquer lugar a carga viaja de barco ou de avião, e na vazante dos rios os prazos podem passar alguns dias do estimado; quando isso acontece, avisamos pelo WhatsApp.',
        en: 'Standard shipping is free on orders of R$ 250 or more in products. Express is still charged, since it is the most expensive way up the river. From here, parcels travel by boat or plane, and in the dry season deliveries can run a few days past the estimate; when that happens, we let you know on WhatsApp.',
        es: 'El envío estándar es gratis en compras desde R$ 250 en productos. El exprés se sigue cobrando, porque es el que más cuesta para subir el río. Desde aquí la carga viaja en barco o en avión, y en la bajante de los ríos los plazos pueden pasar algunos días de lo estimado; cuando eso ocurre, avisamos por WhatsApp.',
      },
      {
        'pt-BR':
          'Quem mora em Benjamin Constant (CEP 69630) pode retirar o pedido sem custo no curral do Mangangá, no Beco 50, bairro Coaban (Javarizinho). A retirada fica disponível a partir do dia útil seguinte à confirmação do pagamento, de segunda a sexta, das 14h às 18h, e em dias de ensaio até o fim do ensaio. Leve um documento com foto e o código do pedido.',
        en: 'If you live in Benjamin Constant (postal code 69630), you can pick up your order for free at the Mangangá curral, Beco 50, Coaban (Javarizinho). Pickup is available from the business day after payment confirmation, Monday to Friday, 2 pm to 6 pm, and on rehearsal days until the rehearsal ends. Bring a photo ID and the order code.',
        es: 'Quien vive en Benjamin Constant (código postal 69630) puede retirar el pedido sin costo en el corral del Mangangá, en el Beco 50, barrio Coaban (Javarizinho). El retiro está disponible desde el día hábil siguiente a la confirmación del pago, de lunes a viernes, de 14 h a 18 h, y en días de ensayo hasta que termina el ensayo. Lleva un documento con foto y el código del pedido.',
      },
    ],
    faq: [
      {
        question: {
          'pt-BR': 'Vocês entregam no Peru e na Colômbia?',
          en: 'Do you deliver to Peru and Colombia?',
          es: '¿Entregan en Perú y Colombia?',
        },
        answer: {
          'pt-BR':
            'Por enquanto a loja só envia para endereços no Brasil. Quem está em Tabatinga, Letícia ou Islândia pode comprar normalmente e retirar no curral, em Benjamin Constant.',
          en: 'For now the store only ships to addresses in Brazil. If you are in Tabatinga, Leticia or Islandia, you can buy as usual and pick up at the curral in Benjamin Constant.',
          es: 'Por ahora la tienda solo envía a direcciones en Brasil. Quien está en Tabatinga, Leticia o Islandia puede comprar normalmente y retirar en el corral, en Benjamin Constant.',
        },
      },
      {
        question: {
          'pt-BR': 'Como acompanho a entrega?',
          en: 'How do I track my delivery?',
          es: '¿Cómo sigo mi envío?',
        },
        answer: {
          'pt-BR':
            'Assim que o pacote é postado, mandamos o código de rastreio pelo WhatsApp e por e-mail. Ele pode levar até um dia útil para aparecer no site dos Correios.',
          en: 'As soon as the parcel is posted, we send the tracking code by WhatsApp and email. It can take up to one business day to show up on the post office website.',
          es: 'Apenas se despacha el paquete, enviamos el código de seguimiento por WhatsApp y por correo. Puede tardar hasta un día hábil en aparecer en el sitio del correo.',
        },
      },
    ],
  },
  {
    slug: 'pagamentos',
    title: {
      'pt-BR': 'Pagamentos',
      en: 'Payments',
      es: 'Pagos',
    },
    summary: {
      'pt-BR': '5% de desconto no Pix, até 6x sem juros no cartão e boleto.',
      en: '5% off with Pix, up to 6 interest-free installments and boleto.',
      es: '5% de descuento con Pix, hasta 6 cuotas sin interés y boleto.',
    },
    body: [
      {
        'pt-BR':
          'Pix tem 5% de desconto sobre o valor dos produtos (o frete não entra no desconto). A chave e o valor exato chegam pelo WhatsApp junto com a confirmação do pedido, e o pedido fica reservado por 48 horas esperando o pagamento.',
        en: 'Pix gets 5% off the product amount (shipping is not discounted). The key and the exact amount arrive on WhatsApp with the order confirmation, and the order is held for 48 hours awaiting payment.',
        es: 'Pix tiene 5% de descuento sobre el valor de los productos (el envío no entra en el descuento). La clave y el monto exacto llegan por WhatsApp junto con la confirmación del pedido, y el pedido queda reservado 48 horas esperando el pago.',
      },
      {
        'pt-BR':
          'No cartão de crédito o pedido pode ser dividido em até 6 vezes sem juros, com parcela mínima de R$ 20. O pagamento é feito por um link seguro da operadora, que a equipe envia pelo WhatsApp; a loja nunca pede o número do cartão por mensagem e não guarda dados de cartão.',
        en: 'By credit card the order can be split into up to 6 interest-free installments, with a minimum installment of R$ 20. Payment goes through a secure link from the card processor, which the team sends on WhatsApp; the store never asks for your card number by message and does not store card data.',
        es: 'Con tarjeta de crédito el pedido se puede dividir en hasta 6 cuotas sin interés, con cuota mínima de R$ 20. El pago se hace por un enlace seguro de la procesadora, que el equipo envía por WhatsApp; la tienda nunca pide el número de la tarjeta por mensaje y no guarda datos de tarjeta.',
      },
      {
        'pt-BR':
          'O boleto é enviado por e-mail e WhatsApp, vence em três dias úteis e leva até dois dias úteis para ser compensado. O prazo de entrega começa a contar depois da compensação.',
        en: 'The boleto is sent by email and WhatsApp, is due in three business days and takes up to two business days to clear. The delivery time starts counting after it clears.',
        es: 'El boleto se envía por correo y WhatsApp, vence en tres días hábiles y tarda hasta dos días hábiles en acreditarse. El plazo de entrega empieza a contar después de la acreditación.',
      },
    ],
    faq: [
      {
        question: {
          'pt-BR': 'Posso usar cupom e desconto do Pix juntos?',
          en: 'Can I combine a coupon with the Pix discount?',
          es: '¿Puedo usar cupón y descuento de Pix juntos?',
        },
        answer: {
          'pt-BR':
            'Pode. O cupom desconta primeiro sobre os produtos, e os 5% do Pix valem sobre o que sobrar. Vale um cupom por pedido.',
          en: 'Yes. The coupon applies first to the products, and the 5% Pix discount applies to what is left. One coupon per order.',
          es: 'Sí. El cupón descuenta primero sobre los productos, y el 5% del Pix vale sobre lo que queda. Un cupón por pedido.',
        },
      },
    ],
  },
  {
    slug: 'trocas-e-devolucoes',
    title: {
      'pt-BR': 'Trocas e devoluções',
      en: 'Exchanges and returns',
      es: 'Cambios y devoluciones',
    },
    summary: {
      'pt-BR': 'Troca em até 30 dias e arrependimento em 7, como manda o CDC.',
      en: 'Exchange within 30 days and a 7-day cooling-off period.',
      es: 'Cambio en hasta 30 días y arrepentimiento en 7, según la ley.',
    },
    body: [
      {
        'pt-BR':
          'Você pode trocar tamanho ou cor em até 30 dias corridos depois de receber o pedido. A peça precisa estar sem uso, sem lavagem e com a etiqueta. A loja paga o reenvio da primeira troca; a postagem da peça de volta até nós fica por conta de quem compra, ou é gratuita entregando no curral.',
        en: 'You can exchange size or color within 30 calendar days of receiving the order. The item must be unworn, unwashed and with its tag. The store pays to ship the first exchange back to you; sending the item to us is on the buyer, or free if you drop it off at the curral.',
        es: 'Puedes cambiar talla o color en hasta 30 días corridos después de recibir el pedido. La prenda debe estar sin uso, sin lavar y con la etiqueta. La tienda paga el reenvío del primer cambio; el envío de la prenda de vuelta hasta nosotros corre por cuenta de quien compra, o es gratis entregándola en el corral.',
      },
      {
        'pt-BR':
          'Toda compra pela internet tem direito de arrependimento em até 7 dias corridos do recebimento, pelo artigo 49 do Código de Defesa do Consumidor. Nesse caso devolvemos o valor integral, frete incluído, pela mesma forma de pagamento, em até 10 dias úteis depois de recebermos a peça.',
        en: 'Every online purchase has a cooling-off period of 7 calendar days from delivery, under article 49 of the Brazilian Consumer Protection Code. In that case we refund the full amount, shipping included, through the same payment method, within 10 business days after we receive the item.',
        es: 'Toda compra por internet tiene derecho de arrepentimiento en hasta 7 días corridos desde la recepción, según el artículo 49 del Código de Defensa del Consumidor de Brasil. En ese caso devolvemos el monto total, envío incluido, por la misma forma de pago, en hasta 10 días hábiles después de recibir la prenda.',
      },
      {
        'pt-BR':
          'Peça com defeito de fabricação pode ser trocada em até 90 dias, e nesse caso todo o frete é por conta da loja. Para qualquer troca ou devolução, mande pelo WhatsApp o código do pedido, o motivo e uma foto da peça; respondemos em até um dia útil com as instruções de envio.',
        en: 'Items with a manufacturing defect can be exchanged within 90 days, and in that case the store covers all shipping. For any exchange or return, send us on WhatsApp the order code, the reason and a photo of the item; we reply within one business day with shipping instructions.',
        es: 'Las prendas con defecto de fabricación se pueden cambiar en hasta 90 días, y en ese caso todo el envío corre por cuenta de la tienda. Para cualquier cambio o devolución, envía por WhatsApp el código del pedido, el motivo y una foto de la prenda; respondemos en hasta un día hábil con las instrucciones de envío.',
      },
    ],
  },
  {
    slug: 'guia-de-tamanhos',
    title: {
      'pt-BR': 'Guia de tamanhos',
      en: 'Size guide',
      es: 'Guía de tallas',
    },
    summary: {
      'pt-BR': 'As medidas das camisas adultas e infantis, em centímetros.',
      en: 'Adult and kids shirt measurements, in centimeters.',
      es: 'Las medidas de las camisetas de adulto e infantiles, en centímetros.',
    },
    body: [
      {
        'pt-BR':
          'As camisas e regatas adultas têm modelagem unissex. Para escolher, pegue uma camisa que veste bem, estique sobre a mesa e meça de uma axila à outra (multiplique por dois para ter o tórax) e do ombro até a barra (o comprimento). Compare com a tabela.',
        en: 'Adult shirts and tank tops have a unisex fit. To choose, take a shirt that fits you well, lay it flat on a table and measure from armpit to armpit (double it for the chest) and from shoulder to hem (the length). Compare with the chart.',
        es: 'Las camisetas y musculosas de adulto tienen corte unisex. Para elegir, toma una camiseta que te quede bien, extiéndela sobre la mesa y mide de axila a axila (multiplica por dos para el pecho) y del hombro al dobladillo (el largo). Compara con la tabla.',
      },
      {
        'pt-BR':
          'Se ficar entre dois tamanhos, escolha o maior: a malha dry encolhe um pouco na primeira lavagem. Nas infantis, o número do tamanho corresponde à idade aproximada da criança, e vale olhar a altura também.',
        en: 'If you fall between two sizes, choose the larger one: the dry-fit knit shrinks a little after the first wash. For kids, the size number matches the approximate age of the child, but check the height too.',
        es: 'Si quedas entre dos tallas, elige la mayor: el tejido dry encoge un poco en el primer lavado. En las infantiles, el número de la talla corresponde a la edad aproximada del niño, y vale mirar la altura también.',
      },
    ],
    sizeChart: true,
  },
  {
    slug: 'perguntas-frequentes',
    title: {
      'pt-BR': 'Perguntas frequentes',
      en: 'Frequently asked questions',
      es: 'Preguntas frecuentes',
    },
    summary: {
      'pt-BR': 'O que a galera mais pergunta antes e depois de comprar.',
      en: 'What the crowd asks most before and after buying.',
      es: 'Lo que la hinchada más pregunta antes y después de comprar.',
    },
    body: [
      {
        'pt-BR':
          'Não achou a resposta aqui? Fale com a loja pelo WhatsApp ou pelo e-mail loja@manganga.com.br, de segunda a sexta, das 8h às 18h (horário do Amazonas).',
        en: 'Could not find your answer here? Talk to the store on WhatsApp or at loja@manganga.com.br, Monday to Friday, 8 am to 6 pm (Amazonas time).',
        es: '¿No encontraste la respuesta aquí? Habla con la tienda por WhatsApp o por el correo loja@manganga.com.br, de lunes a viernes, de 8 h a 18 h (hora de Amazonas).',
      },
    ],
    faq: [
      {
        question: {
          'pt-BR': 'Preciso criar uma conta para comprar?',
          en: 'Do I need an account to buy?',
          es: '¿Necesito una cuenta para comprar?',
        },
        answer: {
          'pt-BR':
            'Não. O carrinho e os pedidos ficam guardados no seu navegador, e o código do pedido é tudo de que você precisa para falar com a loja.',
          en: 'No. The cart and your orders are saved in your browser, and the order code is all you need to talk to the store.',
          es: 'No. El carrito y los pedidos quedan guardados en tu navegador, y el código del pedido es todo lo que necesitas para hablar con la tienda.',
        },
      },
      {
        question: {
          'pt-BR': 'Posso mudar o pedido depois de fechar?',
          en: 'Can I change my order after placing it?',
          es: '¿Puedo cambiar el pedido después de cerrarlo?',
        },
        answer: {
          'pt-BR':
            'Pode, enquanto o pagamento não foi confirmado. Mande o código do pedido pelo WhatsApp dizendo o que quer trocar, incluir ou tirar.',
          en: 'Yes, as long as payment has not been confirmed. Send the order code on WhatsApp saying what you want to change, add or remove.',
          es: 'Sí, mientras el pago no esté confirmado. Envía el código del pedido por WhatsApp diciendo qué quieres cambiar, agregar o quitar.',
        },
      },
      {
        question: {
          'pt-BR': 'Os produtos são oficiais?',
          en: 'Are the products official?',
          es: '¿Los productos son oficiales?',
        },
        answer: {
          'pt-BR':
            'Sim. Esta é a loja oficial da Associação Folclórica Boi Bumbá Mangangá, e o que ela arrecada ajuda a pôr o boi na arena: fantasias, alegorias e a Marujada de Guerra.',
          en: 'Yes. This is the official store of the Boi Bumbá Mangangá Folk Association, and what it raises helps put the boi in the arena: costumes, floats and the Marujada de Guerra.',
          es: 'Sí. Esta es la tienda oficial de la Asociación Folclórica Boi Bumbá Mangangá, y lo que recauda ayuda a llevar el boi a la arena: disfraces, alegorías y la Marujada de Guerra.',
        },
      },
      {
        question: {
          'pt-BR': 'Tem loja física?',
          en: 'Is there a physical store?',
          es: '¿Hay tienda física?',
        },
        answer: {
          'pt-BR':
            'O curral, em Benjamin Constant, funciona como ponto de retirada. Durante o festival há também a barraca oficial no bumbódromo, com as peças da temporada.',
          en: 'The curral in Benjamin Constant works as a pickup point. During the festival there is also the official stand at the bumbódromo, with the season items.',
          es: 'El corral, en Benjamin Constant, funciona como punto de retiro. Durante el festival también está el puesto oficial en el bumbódromo, con las prendas de la temporada.',
        },
      },
      {
        question: {
          'pt-BR': 'Meu cupom não funcionou. E agora?',
          en: 'My coupon did not work. What now?',
          es: 'Mi cupón no funcionó. ¿Y ahora?',
        },
        answer: {
          'pt-BR':
            'Confira se o código está escrito igual ao divulgado. Vale um cupom por pedido, e o desconto é sobre os produtos, nunca sobre o frete. Se ainda assim não entrar, fale com a gente antes de fechar o pedido.',
          en: 'Check that the code is spelled exactly as published. One coupon per order, and the discount applies to products, never to shipping. If it still does not work, talk to us before placing the order.',
          es: 'Revisa que el código esté escrito igual al publicado. Vale un cupón por pedido, y el descuento es sobre los productos, nunca sobre el envío. Si aun así no funciona, háblanos antes de cerrar el pedido.',
        },
      },
    ],
  },
]

/** O tópico pelo endereço, ou `undefined` quando o endereço não existe. */
export function findHelpTopic(slug: string): HelpTopic | undefined {
  return HELP_TOPICS.find((topic) => topic.slug === slug)
}

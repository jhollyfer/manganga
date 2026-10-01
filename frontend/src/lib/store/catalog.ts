import type { LocalizedText } from '#/lib/i18n'

import type { Cents } from './money'

/**
 * O catálogo da loja oficial.
 *
 * **Conteúdo estático, por decisão.** A loja nasce só no frontend, como o
 * site: produto, estoque e preço moram aqui até a API ganhar o domínio. As
 * telas leem só as funções deste arquivo (`findProduct`, `productsIn`,
 * `searchProducts`), então a troca por `queryOptions` muda o corpo delas e não
 * as telas.
 *
 * Preço e estoque são de exemplo: a vitrine precisava de dado com a forma
 * real para ser desenhada, e quem cuida da loja revisa os números antes de
 * abrir as vendas.
 */

/** As vitrines da loja, na ordem do menu. */
export const CATEGORY_SLUGS = [
  'camisas',
  'bones',
  'copos-e-garrafas',
  'acessorios',
  'casa',
  'infantil',
] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

export type Category = {
  slug: CategorySlug
  name: LocalizedText
  description: LocalizedText
}

export const CATEGORIES: ReadonlyArray<Category> = [
  {
    slug: 'camisas',
    name: { 'pt-BR': 'Camisas', en: 'Shirts', es: 'Camisetas' },
    description: {
      'pt-BR': 'A camisa oficial da temporada e as linhas de torcedor.',
      en: 'The official season shirt and the supporter lines.',
      es: 'La camiseta oficial de la temporada y las líneas de hinchada.',
    },
  },
  {
    slug: 'bones',
    name: { 'pt-BR': 'Bonés', en: 'Caps', es: 'Gorras' },
    description: {
      'pt-BR': 'Bonés bordados e viseiras para o sol do Javari.',
      en: 'Embroidered caps and visors for the Javari sun.',
      es: 'Gorras bordadas y viseras para el sol del Yavarí.',
    },
  },
  {
    slug: 'copos-e-garrafas',
    name: {
      'pt-BR': 'Copos e garrafas',
      en: 'Cups and bottles',
      es: 'Vasos y botellas',
    },
    description: {
      'pt-BR': 'Térmicos para atravessar as três noites de festival.',
      en: 'Insulated drinkware for three festival nights.',
      es: 'Térmicos para atravesar las tres noches de festival.',
    },
  },
  {
    slug: 'acessorios',
    name: { 'pt-BR': 'Acessórios', en: 'Accessories', es: 'Accesorios' },
    description: {
      'pt-BR': 'Chaveiros, bolsas, lenços e o que mais couber no bolso.',
      en: 'Keychains, bags, scarves and whatever fits in a pocket.',
      es: 'Llaveros, bolsos, pañuelos y lo que quepa en el bolsillo.',
    },
  },
  {
    slug: 'casa',
    name: { 'pt-BR': 'Casa', en: 'Home', es: 'Hogar' },
    description: {
      'pt-BR': 'Almofadas, bandeiras e ímãs para levar o curral para casa.',
      en: 'Pillows, flags and magnets to bring the curral home.',
      es: 'Cojines, banderas e imanes para llevar el corral a casa.',
    },
  },
  {
    slug: 'infantil',
    name: { 'pt-BR': 'Infantil', en: 'Kids', es: 'Infantil' },
    description: {
      'pt-BR': 'Para a galera que ainda vai brincar de boi.',
      en: 'For the crowd that will one day dance the boi.',
      es: 'Para la hinchada que algún día bailará el boi.',
    },
  },
]

/**
 * A ilustração do produto.
 *
 * A loja não tem fotos ainda, e um quadrado cinza com "sem imagem" vende pior
 * que um desenho honesto da peça. `ProductArt` desenha o contorno de cada tipo
 * em SVG, nas cores do produto, e a foto entra no lugar dele quando existir.
 */
export const ART_KINDS = [
  'shirt',
  'tank',
  'cap',
  'cup',
  'bottle',
  'mug',
  'keychain',
  'bag',
  'pillow',
  'flag',
  'magnet',
  'plush',
  'scarf',
] as const

export type ArtKind = (typeof ART_KINDS)[number]

export type ProductColor = {
  id: string
  name: LocalizedText
  hex: string
}

export const BADGES = ['new', 'bestseller', 'season'] as const

export type Badge = (typeof BADGES)[number]

export type Product = {
  slug: string
  name: LocalizedText
  summary: LocalizedText
  description: LocalizedText
  category: CategorySlug
  price: Cents
  /** O preço cheio de antes da promoção. Ausente quando não há promoção. */
  compareAt?: Cents
  art: ArtKind
  /** As cores à venda. A primeira é a que a vitrine desenha. */
  colors: ReadonlyArray<ProductColor>
  /** Os tamanhos à venda, na ordem da grade. Vazio para peça de tamanho único. */
  sizes: ReadonlyArray<string>
  stock: number
  badges: ReadonlyArray<Badge>
  /** A ordem de "mais vendidos": menor é mais vendido. */
  rank: number
  /** Data de entrada na loja, `YYYY-MM-DD`, para a ordem de "novidades". */
  addedAt: string
}

const ADULT_SIZES = ['P', 'M', 'G', 'GG', 'XG'] as const
const KIDS_SIZES = ['2', '4', '6', '8', '10', '12'] as const

const WHITE: ProductColor = {
  id: 'branco',
  name: { 'pt-BR': 'Branco', en: 'White', es: 'Blanco' },
  hex: '#f7f6f0',
}
const FOREST: ProductColor = {
  id: 'verde-mata',
  name: { 'pt-BR': 'Verde-mata', en: 'Forest green', es: 'Verde selva' },
  hex: '#0d6b3a',
}
const LEAF: ProductColor = {
  id: 'verde-folha',
  name: { 'pt-BR': 'Verde-folha', en: 'Leaf green', es: 'Verde hoja' },
  hex: '#2fbf6b',
}
const BLACK: ProductColor = {
  id: 'preto',
  name: { 'pt-BR': 'Preto', en: 'Black', es: 'Negro' },
  hex: '#14171a',
}
const URUCUM: ProductColor = {
  id: 'urucum',
  name: { 'pt-BR': 'Urucum', en: 'Annatto red', es: 'Achiote' },
  hex: '#e4572e',
}
const GOLD: ProductColor = {
  id: 'ouro',
  name: { 'pt-BR': 'Ouro', en: 'Gold', es: 'Oro' },
  hex: '#f2b632',
}
const STEEL: ProductColor = {
  id: 'inox',
  name: { 'pt-BR': 'Inox', en: 'Steel', es: 'Acero' },
  hex: '#b9c2c4',
}

export const PRODUCTS: ReadonlyArray<Product> = [
  {
    slug: 'camisa-oficial-2026',
    name: {
      'pt-BR': 'Camisa oficial 2026',
      en: 'Official 2026 shirt',
      es: 'Camiseta oficial 2026',
    },
    summary: {
      'pt-BR': 'A camisa da temporada, com a estrela do Besouro no peito.',
      en: 'The season shirt, with the Besouro star on the chest.',
      es: 'La camiseta de la temporada, con la estrella del Besouro en el pecho.',
    },
    description: {
      'pt-BR':
        'Malha dry de toque macio, estampa frontal com a estrela verde do Boi Besouro e o nome da temporada nas costas. Modelagem unissex, costura reforçada nos ombros para aguentar a arquibancada.',
      en: 'Soft dry-fit knit, front print with the green star of Boi Besouro and the season name on the back. Unisex fit, reinforced shoulder seams to survive the bleachers.',
      es: 'Tejido dry de tacto suave, estampado frontal con la estrella verde del Boi Besouro y el nombre de la temporada en la espalda. Corte unisex, costuras reforzadas en los hombros para aguantar la tribuna.',
    },
    category: 'camisas',
    price: 8990,
    art: 'shirt',
    colors: [WHITE, FOREST],
    sizes: ADULT_SIZES,
    stock: 120,
    badges: ['season', 'bestseller'],
    rank: 1,
    addedAt: '2026-05-10',
  },
  {
    slug: 'camisa-torcedor-estrela',
    name: {
      'pt-BR': 'Camisa torcedor Estrela',
      en: 'Star supporter shirt',
      es: 'Camiseta hincha Estrella',
    },
    summary: {
      'pt-BR': 'Algodão penteado, estrela grande e a galera verde no peito.',
      en: 'Combed cotton, a big star and the green crowd on the chest.',
      es: 'Algodón peinado, estrella grande y la hinchada verde en el pecho.',
    },
    description: {
      'pt-BR':
        'Camisa de algodão penteado fio 30, estampa em silk com a estrela do Mangangá. Pensada para o dia a dia de quem leva o boi no peito o ano inteiro, e não só em julho.',
      en: 'Combed cotton shirt, silk-screened Mangangá star. Made for everyday wear by those who carry the boi all year long, not only in July.',
      es: 'Camiseta de algodón peinado, estampado serigráfico con la estrella del Mangangá. Pensada para el día a día de quien lleva el boi todo el año, y no solo en julio.',
    },
    category: 'camisas',
    price: 6990,
    compareAt: 7990,
    art: 'shirt',
    colors: [FOREST, BLACK, WHITE],
    sizes: ADULT_SIZES,
    stock: 80,
    badges: ['bestseller'],
    rank: 2,
    addedAt: '2026-02-01',
  },
  {
    slug: 'camisa-marujada-de-guerra',
    name: {
      'pt-BR': 'Camisa Marujada de Guerra',
      en: 'Marujada de Guerra shirt',
      es: 'Camiseta Marujada de Guerra',
    },
    summary: {
      'pt-BR': 'Para quem segura o ritmo do boi na batucada.',
      en: 'For those who hold the boi rhythm in the drum line.',
      es: 'Para quienes sostienen el ritmo del boi en la batucada.',
    },
    description: {
      'pt-BR':
        'Homenagem à Marujada de Guerra, a batucada que dá o compasso do Mangangá na arena. Estampa de tambores nas costas, gola careca e malha leve para o calor do bumbódromo.',
      en: 'A tribute to Marujada de Guerra, the drum line that sets the Mangangá beat in the arena. Drum print on the back, crew neck, light knit for the heat of the bumbódromo.',
      es: 'Homenaje a la Marujada de Guerra, la batucada que marca el compás del Mangangá en la arena. Estampado de tambores en la espalda, cuello redondo y tejido liviano para el calor del bumbódromo.',
    },
    category: 'camisas',
    price: 7490,
    art: 'shirt',
    colors: [BLACK, URUCUM],
    sizes: ADULT_SIZES,
    stock: 45,
    badges: ['new'],
    rank: 6,
    addedAt: '2026-08-20',
  },
  {
    slug: 'regata-galera-verde',
    name: {
      'pt-BR': 'Regata Galera Verde',
      en: 'Galera Verde tank top',
      es: 'Musculosa Galera Verde',
    },
    summary: {
      'pt-BR': 'Leve, cavada e pronta para pular na arquibancada.',
      en: 'Light, open-sided and ready to jump in the stands.',
      es: 'Liviana, escotada y lista para saltar en la tribuna.',
    },
    description: {
      'pt-BR':
        'Regata em malha fria com recorte cavado e estampa da Galera Verde. A peça mais pedida para as noites de ensaio no curral.',
      en: 'Cool-knit tank top with open sides and the Galera Verde print. The most requested piece for rehearsal nights at the curral.',
      es: 'Musculosa de tejido fresco con sisa amplia y estampado de la Galera Verde. La prenda más pedida para las noches de ensayo en el corral.',
    },
    category: 'camisas',
    price: 5990,
    art: 'tank',
    colors: [LEAF, WHITE],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 60,
    badges: [],
    rank: 8,
    addedAt: '2026-03-15',
  },
  {
    slug: 'bone-estrela-bordada',
    name: {
      'pt-BR': 'Boné estrela bordada',
      en: 'Embroidered star cap',
      es: 'Gorra estrella bordada',
    },
    summary: {
      'pt-BR': 'Aba curva, bordado 3D e ajuste em metal.',
      en: 'Curved brim, 3D embroidery and metal strap.',
      es: 'Visera curva, bordado 3D y ajuste metálico.',
    },
    description: {
      'pt-BR':
        'Boné de seis gomos com a estrela do Besouro bordada em relevo. Aba curva, fecho em metal e forro interno com o nome do boi.',
      en: 'Six-panel cap with the Besouro star in raised embroidery. Curved brim, metal clasp and inner lining with the boi name.',
      es: 'Gorra de seis paneles con la estrella del Besouro bordada en relieve. Visera curva, cierre metálico y forro interno con el nombre del boi.',
    },
    category: 'bones',
    price: 5990,
    art: 'cap',
    colors: [FOREST, WHITE, BLACK],
    sizes: [],
    stock: 70,
    badges: ['bestseller'],
    rank: 3,
    addedAt: '2026-01-20',
  },
  {
    slug: 'viseira-sol-do-javari',
    name: {
      'pt-BR': 'Viseira Sol do Javari',
      en: 'Javari Sun visor',
      es: 'Visera Sol del Yavarí',
    },
    summary: {
      'pt-BR': 'Proteção para a fila do bumbódromo na tarde de festival.',
      en: 'Shade for the bumbódromo line on festival afternoons.',
      es: 'Protección para la fila del bumbódromo en la tarde de festival.',
    },
    description: {
      'pt-BR':
        'Viseira em tecido respirável com faixa interna absorvente e regulagem em velcro. Leve o suficiente para ir na bolsa.',
      en: 'Breathable visor with an absorbent inner band and velcro adjustment. Light enough to go in any bag.',
      es: 'Visera de tela transpirable con banda interna absorbente y ajuste de velcro. Liviana para llevar en el bolso.',
    },
    category: 'bones',
    price: 3990,
    compareAt: 4990,
    art: 'cap',
    colors: [LEAF, URUCUM],
    sizes: [],
    stock: 35,
    badges: [],
    rank: 14,
    addedAt: '2025-11-02',
  },
  {
    slug: 'copo-termico-450',
    name: {
      'pt-BR': 'Copo térmico 450 ml',
      en: '450 ml insulated tumbler',
      es: 'Vaso térmico 450 ml',
    },
    summary: {
      'pt-BR': 'Parede dupla, tampa com trava e a estrela gravada.',
      en: 'Double wall, locking lid and an engraved star.',
      es: 'Doble pared, tapa con traba y la estrella grabada.',
    },
    description: {
      'pt-BR':
        'Copo em aço inox com parede dupla a vácuo: a bebida gelada atravessa a apresentação inteira. Tampa com trava deslizante e a estrela gravada a laser.',
      en: 'Vacuum double-wall stainless steel tumbler: your drink stays cold through the whole show. Sliding lock lid and a laser-engraved star.',
      es: 'Vaso de acero inoxidable con doble pared al vacío: la bebida fría dura toda la presentación. Tapa con traba deslizante y la estrella grabada con láser.',
    },
    category: 'copos-e-garrafas',
    price: 6990,
    art: 'cup',
    colors: [FOREST, BLACK, WHITE],
    sizes: [],
    stock: 90,
    badges: ['bestseller'],
    rank: 4,
    addedAt: '2026-04-01',
  },
  {
    slug: 'garrafa-inox-750',
    name: {
      'pt-BR': 'Garrafa inox 750 ml',
      en: '750 ml steel bottle',
      es: 'Botella inox 750 ml',
    },
    summary: {
      'pt-BR': 'Doze horas de água gelada, do ensaio à volta para casa.',
      en: 'Twelve hours of cold water, from rehearsal to the ride home.',
      es: 'Doce horas de agua fría, del ensayo a la vuelta a casa.',
    },
    description: {
      'pt-BR':
        'Garrafa térmica em inox com alça e tampa rosqueável. Mantém a água gelada por até doze horas e cabe no porta-copo da canoa.',
      en: 'Stainless insulated bottle with handle and screw cap. Keeps water cold for up to twelve hours and fits the canoe cup holder.',
      es: 'Botella térmica de acero con asa y tapa a rosca. Mantiene el agua fría hasta doce horas y cabe en el portavasos de la canoa.',
    },
    category: 'copos-e-garrafas',
    price: 8990,
    art: 'bottle',
    colors: [STEEL, FOREST],
    sizes: [],
    stock: 40,
    badges: ['new'],
    rank: 9,
    addedAt: '2026-07-01',
  },
  {
    slug: 'caneca-curral',
    name: {
      'pt-BR': 'Caneca Curral',
      en: 'Curral mug',
      es: 'Taza Corral',
    },
    summary: {
      'pt-BR': 'Cerâmica de 325 ml para o café antes do ensaio.',
      en: '325 ml ceramic mug for coffee before rehearsal.',
      es: 'Cerámica de 325 ml para el café antes del ensayo.',
    },
    description: {
      'pt-BR':
        'Caneca de cerâmica esmaltada com o desenho do boi branco e a estrela verde. Pode ir ao micro-ondas e à lava-louças.',
      en: 'Glazed ceramic mug with the white boi drawing and the green star. Microwave and dishwasher safe.',
      es: 'Taza de cerámica esmaltada con el dibujo del boi blanco y la estrella verde. Apta para microondas y lavavajillas.',
    },
    category: 'copos-e-garrafas',
    price: 4490,
    art: 'mug',
    colors: [WHITE],
    sizes: [],
    stock: 50,
    badges: [],
    rank: 11,
    addedAt: '2025-12-10',
  },
  {
    slug: 'chaveiro-estrela',
    name: {
      'pt-BR': 'Chaveiro estrela',
      en: 'Star keychain',
      es: 'Llavero estrella',
    },
    summary: {
      'pt-BR': 'Metal esmaltado com fita de nylon verde.',
      en: 'Enamelled metal with a green nylon strap.',
      es: 'Metal esmaltado con cinta de nailon verde.',
    },
    description: {
      'pt-BR':
        'Chaveiro em metal esmaltado no formato da estrela do Besouro, com fita de nylon trançada. O presente que cabe em qualquer mala de volta.',
      en: 'Enamelled metal keychain shaped like the Besouro star, with a braided nylon strap. The souvenir that fits any suitcase home.',
      es: 'Llavero de metal esmaltado con la forma de la estrella del Besouro y cinta de nailon trenzada. El recuerdo que cabe en cualquier maleta.',
    },
    category: 'acessorios',
    price: 1990,
    art: 'keychain',
    colors: [LEAF],
    sizes: [],
    stock: 200,
    badges: ['bestseller'],
    rank: 5,
    addedAt: '2025-10-05',
  },
  {
    slug: 'ecobag-manganga',
    name: {
      'pt-BR': 'Ecobag Mangangá',
      en: 'Mangangá tote bag',
      es: 'Bolsa ecológica Mangangá',
    },
    summary: {
      'pt-BR': 'Lona crua, alça longa e o boi estampado.',
      en: 'Raw canvas, long handles and the boi printed.',
      es: 'Lona cruda, asa larga y el boi estampado.',
    },
    description: {
      'pt-BR':
        'Sacola em lona de algodão cru, alça longa para levar no ombro e bolso interno. Aguenta a feira de sábado e a volta do festival.',
      en: 'Raw cotton canvas bag with long shoulder handles and an inner pocket. Handles the Saturday market and the way back from the festival.',
      es: 'Bolsa de lona de algodón crudo, asa larga para el hombro y bolsillo interno. Aguanta la feria del sábado y la vuelta del festival.',
    },
    category: 'acessorios',
    price: 3990,
    art: 'bag',
    colors: [WHITE, FOREST],
    sizes: [],
    stock: 75,
    badges: [],
    rank: 10,
    addedAt: '2026-03-01',
  },
  {
    slug: 'lenco-de-cetim',
    name: {
      'pt-BR': 'Lenço de cetim',
      en: 'Satin scarf',
      es: 'Pañuelo de satén',
    },
    summary: {
      'pt-BR': 'Para agitar na arquibancada quando o boi entra.',
      en: 'To wave in the stands when the boi comes in.',
      es: 'Para agitar en la tribuna cuando entra el boi.',
    },
    description: {
      'pt-BR':
        'Lenço quadrado em cetim com estampa de bandeirinhas e a estrela no centro. Vira faixa de cabelo, amarração de bolsa ou bandeira de torcida.',
      en: 'Square satin scarf with a festoon print and the star in the middle. Works as a headband, bag tie or crowd flag.',
      es: 'Pañuelo cuadrado de satén con estampado de banderines y la estrella en el centro. Sirve de vincha, adorno de bolso o bandera de hinchada.',
    },
    category: 'acessorios',
    price: 2990,
    compareAt: 3490,
    art: 'scarf',
    colors: [LEAF, GOLD],
    sizes: [],
    stock: 55,
    badges: [],
    rank: 13,
    addedAt: '2025-09-12',
  },
  {
    slug: 'almofada-boi-besouro',
    name: {
      'pt-BR': 'Almofada Boi Besouro',
      en: 'Boi Besouro pillow',
      es: 'Cojín Boi Besouro',
    },
    summary: {
      'pt-BR': 'Capa de 40 x 40 cm com enchimento.',
      en: '40 x 40 cm cover with filling.',
      es: 'Funda de 40 x 40 cm con relleno.',
    },
    description: {
      'pt-BR':
        'Almofada com capa em tecido de algodão, zíper invisível e enchimento de fibra siliconada. Estampa do boi branco com a estrela verde.',
      en: 'Cotton cover pillow with hidden zipper and siliconized fiber filling. White boi print with the green star.',
      es: 'Cojín con funda de algodón, cierre invisible y relleno de fibra siliconada. Estampado del boi blanco con la estrella verde.',
    },
    category: 'casa',
    price: 5990,
    art: 'pillow',
    colors: [FOREST],
    sizes: [],
    stock: 25,
    badges: [],
    rank: 12,
    addedAt: '2026-02-18',
  },
  {
    slug: 'bandeira-oficial',
    name: {
      'pt-BR': 'Bandeira oficial',
      en: 'Official flag',
      es: 'Bandera oficial',
    },
    summary: {
      'pt-BR': '1,40 x 0,90 m, para a janela de casa e para a arena.',
      en: '1.40 x 0.90 m, for your window and for the arena.',
      es: '1,40 x 0,90 m, para la ventana de casa y para la arena.',
    },
    description: {
      'pt-BR':
        'Bandeira em tecido oxford com bainha reforçada e ilhoses. Verde, branca e com a estrela do Besouro no centro.',
      en: 'Oxford fabric flag with reinforced hem and grommets. Green, white and with the Besouro star in the center.',
      es: 'Bandera de tela oxford con dobladillo reforzado y ojales. Verde, blanca y con la estrella del Besouro en el centro.',
    },
    category: 'casa',
    price: 4990,
    art: 'flag',
    colors: [FOREST],
    sizes: [],
    stock: 60,
    badges: ['season'],
    rank: 7,
    addedAt: '2026-06-01',
  },
  {
    slug: 'ima-de-geladeira',
    name: {
      'pt-BR': 'Ímã de geladeira',
      en: 'Fridge magnet',
      es: 'Imán de heladera',
    },
    summary: {
      'pt-BR': 'Resina com o boi e a data do festival.',
      en: 'Resin magnet with the boi and the festival date.',
      es: 'Resina con el boi y la fecha del festival.',
    },
    description: {
      'pt-BR':
        'Ímã em resina com acabamento brilhante, o boi branco e o ano da temporada. Lembrança pequena de uma festa grande.',
      en: 'Glossy resin magnet with the white boi and the season year. A small souvenir of a big party.',
      es: 'Imán de resina con acabado brillante, el boi blanco y el año de la temporada. Un recuerdo pequeño de una fiesta grande.',
    },
    category: 'casa',
    price: 1290,
    art: 'magnet',
    colors: [WHITE],
    sizes: [],
    stock: 300,
    badges: [],
    rank: 15,
    addedAt: '2025-08-30',
  },
  {
    slug: 'camisa-infantil-boizinho',
    name: {
      'pt-BR': 'Camisa infantil Boizinho',
      en: 'Kids Boizinho shirt',
      es: 'Camiseta infantil Boizinho',
    },
    summary: {
      'pt-BR': 'O primeiro uniforme de quem nasce na galera verde.',
      en: 'The first jersey for those born in the green crowd.',
      es: 'El primer uniforme de quien nace en la hinchada verde.',
    },
    description: {
      'pt-BR':
        'Camisa infantil em algodão macio com o boizinho desenhado à mão e a estrela verde. Tinta à base de água, sem cheiro e sem toque.',
      en: 'Soft cotton kids shirt with a hand-drawn little boi and the green star. Water-based ink, odorless and smooth.',
      es: 'Camiseta infantil de algodón suave con el boicito dibujado a mano y la estrella verde. Tinta al agua, sin olor y sin relieve.',
    },
    category: 'infantil',
    price: 4990,
    art: 'shirt',
    colors: [WHITE, LEAF],
    sizes: KIDS_SIZES,
    stock: 40,
    badges: ['new'],
    rank: 16,
    addedAt: '2026-08-01',
  },
  {
    slug: 'boizinho-de-pelucia',
    name: {
      'pt-BR': 'Boizinho de pelúcia',
      en: 'Plush little boi',
      es: 'Boicito de peluche',
    },
    summary: {
      'pt-BR': 'O Besouro em miniatura, com a estrela bordada.',
      en: 'The Besouro in miniature, with an embroidered star.',
      es: 'El Besouro en miniatura, con la estrella bordada.',
    },
    description: {
      'pt-BR':
        'Pelúcia antialérgica de 25 cm, com olhos bordados (sem peças soltas) e a estrela verde na testa. Feita para abraçar.',
      en: '25 cm hypoallergenic plush, embroidered eyes (no loose parts) and the green star on the forehead. Made to be hugged.',
      es: 'Peluche hipoalergénico de 25 cm, ojos bordados (sin piezas sueltas) y la estrella verde en la frente. Hecho para abrazar.',
    },
    category: 'infantil',
    price: 7990,
    art: 'plush',
    colors: [WHITE],
    sizes: [],
    stock: 30,
    badges: ['season'],
    rank: 17,
    addedAt: '2026-06-15',
  },
]

/** A categoria pelo endereço, ou `undefined` quando o endereço não existe. */
export function findCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug)
}

/** O produto pelo endereço, ou `undefined` quando o endereço não existe. */
export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function productsIn(category: CategorySlug): Array<Product> {
  return PRODUCTS.filter((product) => product.category === category)
}

export function hasBadge(product: Product, badge: Badge): boolean {
  return product.badges.includes(badge)
}

/** Os produtos em promoção: os que têm preço cheio acima do atual. */
export function onSale(): Array<Product> {
  return PRODUCTS.filter(
    (product) =>
      product.compareAt !== undefined && product.compareAt > product.price,
  )
}

/**
 * Outros produtos para mostrar sob um produto: primeiro da mesma categoria,
 * depois os mais vendidos, nunca ele mesmo.
 */
export function relatedTo(product: Product, limit = 4): Array<Product> {
  const others = PRODUCTS.filter((each) => each.slug !== product.slug)
  const same = others.filter((each) => each.category === product.category)
  const rest = others
    .filter((each) => each.category !== product.category)
    .sort((a, b) => a.rank - b.rank)

  return [...same, ...rest].slice(0, limit)
}

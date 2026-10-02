/**
 * A geometria das cenas do Alto Solimões: mata, rio, palafitas, canoa, arena,
 * fogueira e a estrela do Besouro, como caminhos SVG calculados.
 *
 * Porte do `sky.tsx` do maiyu (`rng`, `canopyPath`, `samaumaPath`, `palm`),
 * com duas diferenças deliberadas: a geometria mora aqui, sem React e sem
 * import `#/`, para o `scripts/generate-og.mjs` desenhar a mesma cena do
 * site; e o quadro é parametrizado (`W` x `H`) porque a cena serve de hero, de
 * capa de cartão e de imagem social, e não só de faixa no pé da página.
 *
 * As cenas prontas (`SCENE_SPECS` e `SCENES`) também moram aqui, pelo
 * mesmo motivo: o script do OG desenha a cena do hero sem React.
 *
 * Tudo sai de sorteio com semente fixa: servidor e navegador desenham o mesmo
 * caminho, e a hidratação não reclama.
 */

import type { ArtworkKey } from './media'

export const W = 1440
export const H = 900

/** Gerador pseudoaleatório com semente (Park–Miller). */
export function rng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function f(n: number): string {
  return n.toFixed(1)
}

/** A linha do dossel: copas largas feitas de lóbulos sobrepostos, como a mata se lê de longe. */
export function canopyPath(seed: number, base: number, lobe: number): string {
  const r = rng(seed)
  let d = `M0 ${base}`
  let x = 0
  while (x < W) {
    const w = lobe * (2 + r() * 2.4)
    const h = lobe * (0.45 + r() * 0.55)
    const lobes = 3 + Math.floor(r() * 3)
    const lw = w / lobes
    for (let j = 0; j < lobes; j++) {
      const t = (j + 1) / lobes
      // O último lóbulo fecha na linha de base, que é onde a copa seguinte começa.
      let ny = base
      if (j < lobes - 1)
        ny =
          base - h * Math.pow(Math.sin(Math.PI * t), 0.55) - r() * lobe * 0.12
      d += ` A ${f(lw * 0.56)} ${f(lw * 0.5)} 0 0 1 ${f(x + lw * (j + 1))} ${f(ny)}`
    }
    x += w
  }
  return `${d} L ${f(x)} ${H} L 0 ${H} Z`
}

/** A copa em guarda-chuva: uma fileira de lóbulos sobre uma base levemente curva. */
function crown(cx: number, top: number, h: number, w: number): string {
  const lobes = 6
  const y0 = top + h * 0.28
  function at(t: number): number {
    return y0 - h * 0.26 * Math.pow(Math.sin(Math.PI * t), 0.7)
  }
  let d = `M ${f(cx - w / 2)} ${f(y0)}`
  for (let j = 1; j <= lobes; j++) {
    const lw = w / lobes
    let y = at(j / lobes)
    if (j === lobes) y = y0
    d += ` A ${f(lw * 0.62)} ${f(lw * 0.55)} 0 0 1 ${f(cx - w / 2 + lw * j)} ${f(y)}`
  }
  return `${d} Q ${f(cx)} ${f(y0 + h * 0.1)}, ${f(cx - w / 2)} ${f(y0)} Z`
}

/** A samaúma: a gigante emergente, tronco alto com sapopemas e copa achatada. */
export function samaumaPath(
  cx: number,
  base: number,
  h: number,
  w: number,
): string {
  const top = base - h
  const tw = w * 0.05
  return [
    `M ${f(cx - tw * 3)} ${base} C ${f(cx - tw * 1.2)} ${f(base - h * 0.08)}, ${f(cx - tw)} ${f(base - h * 0.2)}, ${f(cx - tw)} ${f(top + h * 0.2)}`,
    `L ${f(cx + tw)} ${f(top + h * 0.2)}`,
    `C ${f(cx + tw)} ${f(base - h * 0.2)}, ${f(cx + tw * 1.2)} ${f(base - h * 0.08)}, ${f(cx + tw * 3)} ${base} Z`,
    crown(cx, top, h, w),
  ].join(' ')
}

export type Palm = { stem: string; fronds: Array<string> }

/** O açaizeiro: estipe fino e curvo, com as folhas caídas. */
export function palm(cx: number, base: number, h: number, lean: number): Palm {
  const tx = cx + lean
  const ty = base - h
  const stem = `M ${f(cx)} ${base} Q ${f(cx + lean * 0.2)} ${f(base - h * 0.55)}, ${f(tx)} ${f(ty)}`
  const fronds = [-160, -128, -96, -64, -32, 0, 25].map((deg) => {
    const a = (deg * Math.PI) / 180
    const len = h * 0.36
    const ex = tx + Math.cos(a) * len
    const ey = ty + Math.sin(a) * len * 0.5 + len * 0.5
    // A folha: vai pela borda de cima e volta pela de baixo.
    const n = 10
    const ux = tx + Math.cos(a) * len * 0.5 - Math.sin(a) * n
    const uy = ty + Math.sin(a) * len * 0.55 - n
    const lx = tx + Math.cos(a) * len * 0.5 + Math.sin(a) * n
    const ly = ty + Math.sin(a) * len * 0.55 + n
    return `M ${f(tx)} ${f(ty)} Q ${f(ux)} ${f(uy)}, ${f(ex)} ${f(ey)} Q ${f(lx)} ${f(ly)}, ${f(tx)} ${f(ty)} Z`
  })
  return { stem, fronds }
}

/** Os pontos da estrela de cinco pontas, centrada em `(cx, cy)` com raio externo `r`. */
export function starPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 10 }, (_, index) => {
    let radius = r * 0.42
    if (index % 2 === 0) radius = r
    const angle = -Math.PI / 2 + (index * Math.PI) / 5
    return `${f(cx + radius * Math.cos(angle))},${f(cy + radius * Math.sin(angle))}`
  }).join(' ')
}

export type House = {
  /** Corpo, telhado e esteios num caminho só. */
  body: string
  /** As janelas acesas. */
  windows: Array<{ x: number; y: number; w: number; h: number }>
}

/**
 * Uma palafita: a casa de madeira levantada sobre esteios, como as do Coaban,
 * que a cheia do Javarizinho visita todo ano.
 */
export function stiltHouse(x: number, water: number, w: number): House {
  const lift = w * 0.42
  const hh = w * 0.62
  const floor = water - lift
  const top = floor - hh
  const roof = top - w * 0.36
  const legs = [0.08, 0.36, 0.64, 0.92]
    .map((t) => {
      const lx = x + w * t
      return `M ${f(lx - 3)} ${f(floor)} L ${f(lx + 3)} ${f(floor)} L ${f(lx + 3)} ${f(water + 18)} L ${f(lx - 3)} ${f(water + 18)} Z`
    })
    .join(' ')
  const body = [
    `M ${f(x)} ${f(floor)} L ${f(x)} ${f(top)} L ${f(x + w)} ${f(top)} L ${f(x + w)} ${f(floor)} Z`,
    `M ${f(x - w * 0.1)} ${f(top + 2)} L ${f(x + w / 2)} ${f(roof)} L ${f(x + w * 1.1)} ${f(top + 2)} Z`,
    legs,
  ].join(' ')
  const ww = w * 0.16
  const windows = [0.22, 0.62].map((t) => ({
    x: x + w * t,
    y: top + hh * 0.3,
    w: ww,
    h: ww * 1.1,
  }))
  return { body, windows }
}

/** A canoa com o remador: o casco em meia-lua e o remo inclinado. */
export function canoePath(cx: number, y: number, len: number): string {
  const half = len / 2
  const hull = `M ${f(cx - half)} ${f(y)} Q ${f(cx)} ${f(y + len * 0.16)}, ${f(cx + half)} ${f(y)} L ${f(cx + half * 0.8)} ${f(y + len * 0.03)} Q ${f(cx)} ${f(y + len * 0.11)}, ${f(cx - half * 0.8)} ${f(y + len * 0.03)} Z`
  const head = len * 0.045
  const body = `M ${f(cx - head)} ${f(y + 2)} L ${f(cx - head * 0.9)} ${f(y - len * 0.13)} L ${f(cx + head * 0.9)} ${f(y - len * 0.13)} L ${f(cx + head)} ${f(y + 2)} Z`
  const skull = `M ${f(cx - head)} ${f(y - len * 0.16)} a ${f(head)} ${f(head)} 0 1 0 ${f(head * 2)} 0 a ${f(head)} ${f(head)} 0 1 0 ${f(-head * 2)} 0 Z`
  const paddle = `M ${f(cx + head)} ${f(y - len * 0.12)} L ${f(cx + half * 0.55)} ${f(y + len * 0.12)} L ${f(cx + half * 0.55 + 6)} ${f(y + len * 0.11)} L ${f(cx + head + 5)} ${f(y - len * 0.13)} Z`
  return [hull, body, skull, paddle].join(' ')
}

/**
 * O arco da arena do festival e o cordão de luzes que pende dele. Devolve o
 * traço do arco e os pontos das lâmpadas, para a lâmpada ter cor própria.
 */
export function arena(
  cx: number,
  base: number,
  w: number,
): { arch: string; bulbs: Array<{ x: number; y: number }> } {
  const h = w * 0.42
  const arch = `M ${f(cx - w / 2)} ${f(base)} C ${f(cx - w / 2)} ${f(base - h * 1.3)}, ${f(cx + w / 2)} ${f(base - h * 1.3)}, ${f(cx + w / 2)} ${f(base)}`
  const bulbs: Array<{ x: number; y: number }> = []
  const strings = 3
  for (let s = 0; s < strings; s++) {
    const sag = base - h * (0.75 - s * 0.2)
    for (let i = 0; i <= 18; i++) {
      const t = i / 18
      const x = cx - w * 0.42 + w * 0.84 * t
      bulbs.push({ x, y: sag + Math.sin(Math.PI * t) * h * 0.18 })
    }
  }
  return { arch, bulbs }
}

/** A chama da fogueira: três línguas de fogo sobre a lenha cruzada. */
export function fire(cx: number, base: number, size: number): string {
  const flame = (dx: number, hgt: number, wid: number): string =>
    `M ${f(cx + dx - wid)} ${f(base)} Q ${f(cx + dx - wid * 0.9)} ${f(base - hgt * 0.55)}, ${f(cx + dx)} ${f(base - hgt)} Q ${f(cx + dx + wid * 0.9)} ${f(base - hgt * 0.55)}, ${f(cx + dx + wid)} ${f(base)} Z`
  return [
    flame(0, size, size * 0.32),
    flame(-size * 0.28, size * 0.62, size * 0.22),
    flame(size * 0.28, size * 0.7, size * 0.22),
  ].join(' ')
}

/** A lenha cruzada embaixo da chama. */
export function logs(cx: number, base: number, size: number): string {
  const l = size * 0.7
  const t = size * 0.07
  return [
    `M ${f(cx - l)} ${f(base + t * 2)} L ${f(cx + l)} ${f(base - t)} L ${f(cx + l)} ${f(base + t)} L ${f(cx - l)} ${f(base + t * 4)} Z`,
    `M ${f(cx - l)} ${f(base - t)} L ${f(cx + l)} ${f(base + t * 2)} L ${f(cx + l)} ${f(base + t * 4)} L ${f(cx - l)} ${f(base + t)} Z`,
  ].join(' ')
}

/** Os reflexos do rio: traços curtos na faixa de água. */
export function ripples(
  seed: number,
  top: number,
  count: number,
): Array<string> {
  const r = rng(seed)
  return Array.from(
    { length: count },
    () =>
      `M ${f(r() * W)} ${f(top + 14 + r() * (H - top - 30))} h ${f(30 + r() * 110)}`,
  )
}

export type Star = { x: number; y: number; r: number; delay: string }

/** O céu estrelado da noite de festival. */
export function stars(seed: number, count: number, floor: number): Array<Star> {
  const r = rng(seed)
  return Array.from({ length: count }, () => {
    const x = r() * W
    const y = r() * floor
    let size = 0.9 + r() * 1.2
    if (r() < 0.1) size = 2.6
    return { x, y, r: size, delay: (r() * 6).toFixed(2) }
  })
}

export type SceneSpec = {
  seed: number
  /** A linha d'água. A mata da frente fecha logo acima dela. */
  water: number
  giants: ReadonlyArray<readonly [cx: number, h: number, w: number]>
  palms: ReadonlyArray<readonly [cx: number, h: number, lean: number]>
  houses?: ReadonlyArray<readonly [x: number, w: number]>
  canoe?: readonly [cx: number, len: number]
  arena?: readonly [cx: number, w: number]
  fire?: readonly [cx: number, size: number]
  sun: readonly [cx: number, cy: number, r: number]
  besouro: readonly [cx: number, cy: number, r: number]
  /**
   * A estrela aparece também de dia, no lugar do sol: a cena que é o próprio
   * tema, e duas luzes no mesmo céu disputariam o olho.
   */
  besouroByDay?: boolean
}

/**
 * Cada chave é um lugar do boi. Os nomes vêm da versão ilustrada antiga e
 * ficaram para não mexer nos registros de conteúdo.
 */
export const SCENE_SPECS: Record<ArtworkKey, SceneSpec> = {
  /*
   * A cena do hero e da prévia social: o texto mora à esquerda, no céu, então
   * a estrela, as samaúmas e os açaís ficam todos à direita, e a mata da
   * esquerda fica baixa, abaixo da última linha do texto.
   */
  estrela: {
    seed: 3,
    water: 820,
    giants: [[1180, 300, 420]],
    palms: [
      [1010, 270, -10],
      [1340, 300, -14],
    ],
    sun: [1130, 230, 70],
    besouro: [1120, 230, 92],
    besouroByDay: true,
  },
  rio: {
    seed: 11,
    water: 700,
    giants: [[1250, 300, 440]],
    palms: [
      [130, 300, 16],
      [960, 280, -10],
    ],
    houses: [
      [300, 150],
      [500, 120],
      [690, 160],
    ],
    canoe: [1020, 200],
    sun: [1180, 180, 60],
    besouro: [260, 190, 70],
  },
  mata: {
    seed: 23,
    water: 820,
    giants: [
      [180, 420, 560],
      [760, 460, 640],
      [1300, 380, 520],
    ],
    palms: [
      [460, 360, 14],
      [520, 320, -10],
      [1060, 340, 12],
    ],
    sun: [480, 170, 64],
    besouro: [1080, 180, 80],
  },
  bandeirinhas: {
    seed: 37,
    water: 800,
    giants: [
      [140, 330, 440],
      [1320, 350, 480],
    ],
    palms: [[1080, 310, -14]],
    arena: [720, 760],
    sun: [1150, 170, 60],
    besouro: [720, 210, 90],
  },
  tambor: {
    seed: 41,
    water: 760,
    giants: [[1180, 340, 480]],
    palms: [
      [80, 300, 14],
      [1400, 280, -12],
    ],
    houses: [
      [180, 170],
      [420, 140],
      [640, 180],
      [880, 150],
    ],
    sun: [1240, 200, 58],
    besouro: [980, 200, 80],
  },
  fogueira: {
    seed: 53,
    water: 790,
    giants: [
      [300, 380, 520],
      [1240, 340, 460],
    ],
    palms: [
      [620, 320, 12],
      [900, 300, -14],
    ],
    fire: [760, 120],
    canoe: [380, 180],
    sun: [1060, 260, 66],
    besouro: [430, 200, 76],
  },
}

export type SceneGeometry = {
  back: string
  mid: string
  front: string
  giants: Array<string>
  palms: Array<Palm>
  houses: Array<House>
  canoe: string | undefined
  arena: ReturnType<typeof arena> | undefined
  fire:
    | { flame: string; logs: string; cx: number; base: number; size: number }
    | undefined
  ripples: Array<string>
  stars: Array<Star>
}

export function buildScene(spec: SceneSpec): SceneGeometry {
  const { seed, water } = spec
  let canoe: string | undefined
  if (spec.canoe) canoe = canoePath(spec.canoe[0], water + 50, spec.canoe[1])
  let stage: ReturnType<typeof arena> | undefined
  if (spec.arena) stage = arena(spec.arena[0], water - 40, spec.arena[1])
  let flame: SceneGeometry['fire']
  if (spec.fire) {
    const [cx, size] = spec.fire
    const base = water - 16
    flame = {
      flame: fire(cx, base, size),
      logs: logs(cx, base, size),
      cx,
      base,
      size,
    }
  }

  return {
    back: canopyPath(seed, water - 150, 90),
    mid: canopyPath(seed + 7, water - 80, 100),
    front: canopyPath(seed + 13, water - 8, 60),
    giants: spec.giants.map(([cx, h, w]) => samaumaPath(cx, water - 60, h, w)),
    palms: spec.palms.map(([cx, h, lean]) => palm(cx, water - 6, h, lean)),
    houses: (spec.houses ?? []).map(([x, w]) => stiltHouse(x, water, w)),
    canoe,
    arena: stage,
    fire: flame,
    ripples: ripples(seed + 1, water, 26),
    stars: stars(seed + 2, 150, water - 220),
  }
}

export const SCENES: Record<ArtworkKey, SceneGeometry> = {
  estrela: buildScene(SCENE_SPECS.estrela),
  rio: buildScene(SCENE_SPECS.rio),
  mata: buildScene(SCENE_SPECS.mata),
  bandeirinhas: buildScene(SCENE_SPECS.bandeirinhas),
  tambor: buildScene(SCENE_SPECS.tambor),
  fogueira: buildScene(SCENE_SPECS.fogueira),
}

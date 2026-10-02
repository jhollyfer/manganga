/**
 * Gera `public/og-image.png`, a prévia do site nas redes sociais, a partir da
 * mesma cena do hero (`estrela`, em `src/lib/scenery.ts`).
 *
 * A prévia era a foto do boi gerada por IA. Agora é a paisagem desenhada, com
 * as cores do tema claro escritas aqui: rede social não lê variável CSS. Sem
 * texto por cima: o sharp rasteriza com as fontes do sistema, e o título da
 * página já vem escrito ao lado da imagem em toda prévia.
 *
 *   node scripts/generate-og.mjs
 *
 * O Node tira os tipos do `.ts` sozinho (a partir do 22.18), então a cena vem
 * do mesmo arquivo que o site usa, e as duas nunca divergem.
 */

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

import { H, SCENES, SCENE_SPECS, W, starPoints } from '../src/lib/scenery.ts'

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'og-image.png',
)

/** As cores do tema claro, as mesmas de `:root` em `styles.css`. */
const C = {
  skyTop: '#d9e6df',
  skyLow: '#eff1ec',
  back: '#b7cfbf',
  mid: '#84ad93',
  front: '#3d7652',
  river: '#bcd6cf',
  riverDeep: '#e4ece7',
  glint: 'rgba(255,255,255,0.85)',
  lights: '#e2b043',
  star: '#1f9d55',
}

const spec = SCENE_SPECS.estrela
const g = SCENES.estrela
const [bx, by, br] = spec.besouro

const palms = g.palms
  .map(
    (p) =>
      `<path d="${p.stem}" stroke="${C.front}" stroke-width="7" stroke-linecap="round" fill="none"/>` +
      p.fronds.map((d) => `<path d="${d}" fill="${C.front}"/>`).join(''),
  )
  .join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.skyTop}"/><stop offset="1" stop-color="${C.skyLow}"/></linearGradient>
    <linearGradient id="river" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.river}"/><stop offset="1" stop-color="${C.riverDeep}"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <polygon points="${starPoints(bx, by, br)}" fill="${C.star}" stroke="${C.lights}" stroke-width="${br * 0.05}" stroke-linejoin="round"/>
  <path d="${g.back}" fill="${C.back}"/>
  ${g.giants.map((d) => `<path d="${d}" fill="${C.back}"/>`).join('')}
  <path d="${g.mid}" fill="${C.mid}"/>
  ${palms}
  <path d="${g.front}" fill="${C.front}"/>
  <rect x="0" y="${spec.water}" width="${W}" height="${H - spec.water}" fill="url(#river)"/>
  <g stroke="${C.glint}" stroke-width="3" stroke-linecap="round">${g.ripples.map((d) => `<path d="${d}"/>`).join('')}</g>
</svg>`

await sharp(Buffer.from(svg), { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log('og-image.png gerado')

# Mangangá

Site oficial do Boi Bumbá Mangangá, o Boi Besouro de Benjamin Constant, no
Alto Solimões: a vitrine institucional (história, tema, itens, toadas, agenda,
notícias, sócio), a loja oficial e o painel da diretoria. Três idiomas
(português, inglês e espanhol), porque a galera vem também do Peru e da
Colômbia.

Um projeto só, `frontend/`, no mesmo padrão do `frontend/` do `maiyu.com.br`:
o próprio `package.json`, lockfile e Dockerfile. **Não há workspace na raiz**,
e é de propósito.

| Diretório       | O que é                                                    |
| --------------- | ---------------------------------------------------------- |
| `frontend/`     | TanStack Start (React 19) sobre Vite e Nitro               |
| `frontend-old/` | o site anterior (Vite SPA + TanStack Router), referência   |

`frontend-old/` sai do repositório depois da auditoria visual da migração. Até
lá ele é a referência do painel de membros e dos contratos com a API, e não
recebe mudança.

## A regra zero

**A referência é a régua, e o código dela vence a documentação sobre ela.**
Antes de escrever um arquivo, abra o equivalente em `../maiyu.com.br/frontend`
e leia inteiro. Divergência deliberada vai para o JSDoc do arquivo, não só para
o commit. As que existem hoje:

- **há API**: `integrations/tanstack-query/http.ts` fala com a API AdonisJS do
  Mangangá (`VITE_API_URL`, cookie `httpOnly`, cabeçalho `X-Timezone`). O
  cadastro de sócio (`POST /members`), a entrada no painel e os membros usam a
  API de verdade;
- **o conteúdo institucional e a loja moram em `lib/`** (`news.ts`,
  `events.ts`, `items.ts`, `toadas.ts`, `store/catalog.ts`), porque a API ainda
  não tem esses domínios. As telas leem só as funções desses arquivos, e trocar
  a fonte por `queryOptions` muda o corpo delas, não as telas;
- **a loja é estática por decisão**: catálogo, frete e cupom são tabelas de
  exemplo, o carrinho mora no `localStorage` e o checkout termina numa
  confirmação sem pagamento. Os números são de exemplo e a diretoria revisa
  antes de abrir as vendas;
- **há área autenticada**: `_authentication/` (a entrada) e `_private/` (o
  painel), com guarda em `beforeLoad`.

## Comandos

```bash
# raiz
pnpm dev:frontend     pnpm test:frontend     pnpm check:frontend  # lint + typecheck

# frontend
pnpm dev              # porta 3000
pnpm build            # regenera routeTree.gen.ts (commitado) e src/paraglide (não)
pnpm lint             pnpm typecheck         pnpm test
pnpm check            # prettier --check
pnpm check-cycles     # lê .output/, então roda depois do build
node scripts/generate-icons.mjs  # favicon.ico, apple-touch e ícones do manifesto
```

## Frontend

- **Rotas em par**: `rota.tsx` com `head`, `loader` e `validateSearch`;
  `rota.lazy.tsx` com a tela. `$.tsx` fica sem `.lazy`.
- **`getRouteApi('/rota')` no escopo do módulo**, nunca importar o `Route` de
  volta do arquivo de rota: o ciclo de chunk devolve `undefined` no primeiro SSR,
  e `check-chunk-cycles.mjs` reprova.
- **Estado de listagem na URL**: filtros de notícia, agenda e vitrine são
  `validateSearch`, validados à mão (`lib/news-search.ts`,
  `lib/store/listing.ts`), porque o `validateSearch` é síncrono e o VineJS não.
- **404 de negócio é `notFound()` no loader**, e a rota de detalhe declara o
  `notFoundComponent` próprio.
- **Formulários**: react-hook-form + VineJS, `mode: 'onTouched'`, `Controller`
  e nunca `register`. Todo campo usa `{...invalidProps(fieldState.invalid, name)}`
  e `<FieldError id={errorId(name)}>`.
- **Idioma**: mensagem de interface em `messages/{locale}.json`, lida como
  `m.chave()` no render. Conteúdo de registro mora no próprio registro como
  `LocalizedText`. Rótulo de valor fechado é função em `lib/labels.ts`.
- **Animação é CSS**: `REVEAL` e `STAGGER` de `_public/-components/reveal.ts`,
  com `motion-reduce:` em tudo.
- **`components/common/` mede o ancestral comum dos consumidores**, não o nível
  hierárquico. O critério está em `src/components/common/CLAUDE.md`.
- **`components/ui/` é território do shadcn**: nunca editar à mão.

## Design

Cartaz de arraial impresso em serigrafia, refeito com a skill
`frontend-design` para sair do desenho genérico. A régua de estrutura continua
o site do Boi Caprichoso (`boicaprichoso.com`); a pele é do Mangangá.

- **Papel e tinta**: fundo cor de osso com grão fixo por cima, tintas chapadas
  (verde-mata, urucum, ouro, a estrela verde do Boi Besouro). Sem vidro, sem
  brilho, sem gradiente, sem preto ou branco puros.
- **Letra**: títulos em Big Shoulders Display, caixa alta e condensada; a
  palavra que canta vai em `<em>`, que vira Instrument Serif itálico na tinta
  de destaque (`--primary-glow`: urucum no papel, ouro na folha verde). Corpo
  em Hanken Grotesk. Título não termina em ponto.
- **Peças**: `sticker` (borda de tinta e sombra deslocada sem desfoque),
  `zigzag-top`, `zigzag-bottom` e `zigzag-y` (o picotado entre faixas),
  `stage` (a folha verde que alterna com o papel), `eyebrow` sem o fio
  decorativo. Botão é retângulo que afunda no clique (`PillButton`).
- **O que não volta**: cabeçalho de vidro, grade de cartões iguais com ícone em
  quadradinho, bloco "número grande e rótulo pequeno", cantos muito
  arredondados, palco quase preto com acento neon. Lista numerada, coluna de
  jornal e colagem levemente torta no lugar deles.

Os tokens estão em `src/styles.css`.

## Estilo de código

Quatro regras cobradas pelo ESLint: `no-ternary`, `no-explicit-any`,
`consistent-type-assertions: never` (nada de `as`),
`consistent-type-definitions: type` (nunca `interface`). Combine tipos com
`Merge`, não com `&`. Prefira lookup object a cadeia de `if`. O resto está na
skill `code-pattern`.

Comentário explica **por quê**, não o quê, e de preferência com o defeito que
ele evita.

## Redes que cobram o que ninguém lembra

| Teste | O que reprova |
| --- | --- |
| `lib/messages.test.ts` | chave faltando num idioma, mensagem vazia, chave que nada usa |
| `lib/validator-messages.test.ts` | campo sem rótulo em algum idioma, regra sem mensagem, texto sem teto |
| `lib/content.test.ts` | registro de conteúdo sem algum idioma, slug repetido |
| `lib/store/*.test.ts` | a conta do carrinho, do frete e das parcelas |
| `routes/_public/composition.test.ts` | a home fora da ordem que ela defende |
| `routes/_public/vitrine-contract.test.ts` | `motion-reduce` apagado, `motion` de volta, painel do celular mudo |
| `check-chunk-cycles.mjs` | ciclo de chunk que quebra o SSR |

## Produção

O que a plataforma faz e o repositório não:

- **A aplicação no Coolify é a imagem Nitro na porta 3000**, e não mais o SPA
  estático da Vercel do site anterior.
- **O healthcheck no painel precisa apontar para `/health`.**
- **Secrets do repositório**: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` e
  `COOLIFY_TOKEN`. O `UUID_APP` de `main-deploy-coolify.yml` precisa ser
  preenchido com o uuid da aplicação antes do primeiro deploy.
- **`VITE_API_URL`** entra no build: é o endereço da API AdonisJS.

O deploy sai por `POST` no Coolify com `curl -fsS`, e o smoke test espera
`https://manganga.maiyu.com.br/revision.txt` responder o sha do commit.

## Autoria e escrita

Regras que valem para todo commit, PR, documento e comentário de código deste
repositório.

**Autoria é sempre do dono do repositório**: `jhollyfer <jhollyfer.fr@gmail.com>`.
Nunca criar commit autorado por assistente, nunca acrescentar `Co-Authored-By`
de assistente, nunca assinar PR ou documento com rodapé de ferramenta.

Commits em Conventional Commits, **em português**, com escopo de domínio:
`feat(vitrine):`, `feat(loja):`, `fix(painel):`, `ci(frontend):`. O assunto diz
o efeito, não o arquivo. Sempre `git commit -- <pathspec>` explícito.

**Sem emoji** e **sem travessão** em texto versionado. Trocar travessão por
hífen não resolve: reescreva com vírgula, dois-pontos, ponto ou parênteses.

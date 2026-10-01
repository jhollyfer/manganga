import * as React from 'react'

/**
 * O agora, atualizado a cada minuto, e `null` no servidor e na hidratação.
 *
 * A contagem regressiva depende do relógio de quem lê. Renderizar a conta no
 * servidor faria o HTML chegar com um número e a hidratação trocar por outro,
 * que é o aviso de "hydration mismatch" e um salto na tela. Com o snapshot do
 * servidor em `null`, a contagem aparece só depois da hidratação, e o resto da
 * página não espera por ela.
 */
let current = 0

function subscribe(listener: () => void): () => void {
  current = Date.now()
  const id = window.setInterval(() => {
    current = Date.now()
    listener()
  }, 60_000)

  return () => window.clearInterval(id)
}

function getSnapshot(): number {
  if (current === 0) current = Date.now()

  return current
}

function getServerSnapshot(): null {
  return null
}

export function useNow(): number | null {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

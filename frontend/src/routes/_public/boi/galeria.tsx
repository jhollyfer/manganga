import { createFileRoute } from '@tanstack/react-router'

import { GALLERY_TAGS } from '#/lib/gallery'
import type { GalleryTag } from '#/lib/gallery'
import { pageHead } from '#/lib/head'
import { m } from '#/paraglide/messages'

type GallerySearch = { tag?: GalleryTag }

function isTag(value: unknown): value is GalleryTag {
  return GALLERY_TAGS.some((tag) => tag === value)
}

export const Route = createFileRoute('/_public/boi/galeria')({
  validateSearch: (search: Record<string, unknown>): GallerySearch => {
    if (isTag(search.tag)) return { tag: search.tag }

    return {}
  },
  head: () =>
    pageHead({
      path: '/boi/galeria',
      title: m.gallery_pageTitle(),
      description: m.gallery_pageLead(),
    }),
})

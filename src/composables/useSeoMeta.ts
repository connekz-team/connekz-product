import { useSeoMeta as unheadUseSeoMeta, useHead } from '@unhead/vue'

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://localhost:3000'
const siteName = import.meta.env.VITE_SITE_NAME || 'Vue App'
const siteDescription = import.meta.env.VITE_SITE_DESCRIPTION || 'Discover the future of innovation.'
const defaultOgImage = `${siteUrl}/og-default.png`
const twitterHandle = import.meta.env.VITE_TWITTER_HANDLE || '@yourdomain'

export interface SeoMetaOptions {
  title: string
  description?: string
  ogImage?: string
  path?: string
}

export function useSeoMeta(options: SeoMetaOptions) {
  const {
    title,
    description = siteDescription,
    ogImage = defaultOgImage,
    path = '/',
  } = options

  const fullTitle = `${title} | ${siteName}`
  const pageUrl = `${siteUrl}${path}`

  useHead({
    title: fullTitle,
  })

  unheadUseSeoMeta({
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogImage,
    ogUrl: pageUrl,
    ogSiteName: siteName,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
    twitterSite: twitterHandle,
  })
}

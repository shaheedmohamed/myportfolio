import { Helmet } from 'react-helmet-async'

const SITE = {
  name: 'Shaheed Mohamed',
  title: 'Shaheed Mohamed — Creative Full-Stack Developer',
  description:
    'Portfolio of Shaheed Mohamed — Full-Stack Developer crafting next-level digital experiences with React, Node.js, Three.js and modern web technologies.',
  url: 'https://shaheedmohamed.vercel.app',
  image: '/og-image.jpg',
  twitter: '@shaheedmohamed',
  locale: 'en_US',
  keywords: [
    'Shaheed Mohamed',
    'Full-Stack Developer',
    'React Developer',
    'Frontend Engineer',
    'Three.js',
    'Web Developer Portfolio',
    'Egypt Developer',
    'Freelance Developer',
  ].join(', '),
}

/**
 * Reusable SEO head component.
 * Pass overrides for per-page meta (e.g., 404, future blog posts).
 */
export default function SEO({
  title,
  description = SITE.description,
  url = SITE.url,
  image = SITE.image,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title
  const absoluteImage = image.startsWith('http') ? image : `${SITE.url}${image}`

  return (
    <Helmet>
      {/* Primary */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={SITE.keywords} />
      <meta name="author" content={SITE.name} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:creator" content={SITE.twitter} />

      {/* Theme */}
      <meta name="theme-color" content="#06060b" />
      <meta name="color-scheme" content="dark" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE.name} />

      {/* Structured data — Person schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: SITE.name,
          url: SITE.url,
          image: absoluteImage,
          jobTitle: 'Full-Stack Developer',
          description: SITE.description,
          sameAs: [
            'https://github.com/shaheedmohamed',
            'https://www.linkedin.com/in/shaheedmohamed',
            'https://mostaql.com/u/shahid-1',
          ],
          knowsAbout: ['React', 'Node.js', 'TypeScript', 'Three.js', 'Web Development', 'UI/UX'],
        })}
      </script>
    </Helmet>
  )
}

export { SITE }

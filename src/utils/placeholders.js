const DEFAULT_WIDTH = 400
const DEFAULT_HEIGHT = 300
const BACKGROUND_GRADIENT = 'linear-gradient(135deg, #0a0e27 0%, #16213e 100%)'

const sanitizeLabel = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim()

const toDataUrl = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const getInitials = (value = 'Portfolio') =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || 'P'

export const createImagePlaceholder = ({
  title = 'Portfolio',
  subtitle = '',
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
}) => {
  const safeTitle = sanitizeLabel(title)
  const safeSubtitle = sanitizeLabel(subtitle)
  const titleFontSize = Math.max(Math.round(width * 0.12), 24)
  const subtitleFontSize = Math.max(Math.round(width * 0.045), 14)

  return toDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0e27" />
          <stop offset="100%" stop-color="#16213e" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="28" fill="url(#bg)" />
      <circle cx="${width * 0.25}" cy="${height * 0.2}" r="${width * 0.18}" fill="rgba(0, 212, 255, 0.12)" />
      <circle cx="${width * 0.82}" cy="${height * 0.75}" r="${width * 0.22}" fill="rgba(131, 56, 236, 0.18)" />
      <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${titleFontSize}" font-weight="700" fill="#ffffff">
        ${safeTitle}
      </text>
      ${
        safeSubtitle
          ? `<text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${subtitleFontSize}" fill="#a0a0a0">${safeSubtitle}</text>`
          : ''
      }
    </svg>
  `)
}

export const createAvatarPlaceholder = (name = 'Portfolio Member') =>
  createImagePlaceholder({
    title: getInitials(name),
    subtitle: name,
    width: 480,
    height: 640,
  })

export const createSectionPlaceholder = (title = 'Preview') =>
  createImagePlaceholder({
    title,
    subtitle: 'Coming soon',
    width: 640,
    height: 480,
  })

export const withFallbackImage = (source, fallback) => source || fallback

export const applyImageFallback = (event, fallbackSrc) => {
  const image = event.currentTarget

  if (!image || image.dataset.fallbackApplied === 'true') {
    return
  }

  image.dataset.fallbackApplied = 'true'
  image.src = fallbackSrc
}

export const pageBackground = BACKGROUND_GRADIENT

/**
 * SEO metadata for every public, indexable route. Shared by the useSEO hook
 * (client navigation) and scripts/prerender-routes.mjs (static HTML, sitemap,
 * serve.json), so keep it plain JS with no JSX or browser-only imports.
 * Signed-in app pages (/dashboard, /products, ...) are deliberately absent.
 */

import { ARTICLES } from './data/blogArticles.js'

export const SITE = {
  name: 'DoAide Inventory',
  baseUrl: 'https://inventory.doaide.com',
  ogImage: 'https://inventory.doaide.com/og-inventory.png',
}

const tool = (path, h1, title, description) => ({ path, h1, title, description, kind: 'tool' })

export const routes = [
  {
    path: '/',
    kind: 'home',
    h1: 'Inventory Management, Made Simple',
    title: 'DoAide Inventory — Free Inventory Management Software for India',
    description:
      'Track stock in real time with barcode scanning, purchase and sales orders, and low-stock alerts. Free for up to 50 products, built for Indian SMBs.',
  },
  {
    path: '/pricing',
    kind: 'page',
    h1: 'Simple, Transparent Pricing',
    title: 'Pricing — Free, Starter ₹999 & Pro ₹2,499 Plans | DoAide Inventory',
    description:
      'Start free with 50 products and 1 warehouse. Upgrade to Starter (₹999/mo) or Pro (₹2,499/mo) for more products, warehouses, users and API access.',
  },
  {
    path: '/tools',
    kind: 'page',
    h1: 'Free Inventory Tools',
    title: 'Free Inventory Calculators & Tools — No Sign-up | DoAide Inventory',
    description:
      'Free inventory calculators: reorder point, safety stock, EOQ, ABC analysis, stock levels and inventory turnover. No sign-up, runs in your browser.',
  },
  tool(
    '/calculator',
    'Reorder Point Calculator',
    'Reorder Point Calculator — Simple ROP Tool | DoAide Inventory',
    'Find when to reorder stock from daily usage, supplier lead time and safety days. Free reorder point calculator for shops and warehouses.'
  ),
  tool(
    '/scanner',
    'Barcode & QR Code Generator',
    'Free Barcode & QR Code Generator for Products | DoAide Inventory',
    'Generate scannable barcodes and QR codes from a SKU or product name and download them as SVG for labels. Free, no sign-up.'
  ),
  {
    path: '/templates',
    kind: 'page',
    h1: 'Inventory Templates',
    title: 'Free Inventory Spreadsheet Templates by Industry | DoAide Inventory',
    description:
      'Free inventory spreadsheet templates for retail, restaurants, pharmacy, manufacturing and more. Copy the columns into Excel or Google Sheets.',
  },
  {
    path: '/embed',
    kind: 'page',
    h1: 'Embed Inventory Tools on Your Website',
    title: 'Embed a Free Reorder Calculator on Your Website | DoAide Inventory',
    description:
      'Add a free reorder point calculator or barcode generator widget to your website with one line of embed code. No account needed.',
  },
  tool(
    '/tools/safety-stock',
    'Safety Stock Calculator',
    'Safety Stock Calculator — Demand & Lead Time Variability',
    'Calculate optimal safety stock from demand and lead-time variability at your target service level. Free safety stock formula calculator.'
  ),
  tool(
    '/tools/eoq',
    'EOQ Calculator',
    'EOQ Calculator — Economic Order Quantity | DoAide Inventory',
    'Find the economic order quantity that minimises total ordering and holding costs. Free EOQ formula calculator with cost breakdown.'
  ),
  tool(
    '/tools/stock-level',
    'Stock Level Calculator',
    'Stock Level Calculator — Min, Max & Reorder Levels',
    'Work out minimum, maximum and reorder stock levels from usage and lead times to avoid both stockouts and overstock. Free, no sign-up.'
  ),
  tool(
    '/tools/reorder-point',
    'Reorder Point Calculator',
    'Advanced Reorder Point Calculator — Demand Variability',
    'Calculate precise reorder points using demand variability, lead-time analysis and service level targets. Free advanced ROP calculator.'
  ),
  tool(
    '/tools/abc-analysis',
    'ABC Analysis Tool',
    'ABC Analysis Tool — Pareto Inventory Classification',
    'Paste your items to classify inventory into A, B and C categories by annual value using Pareto analysis. Free online ABC analysis tool.'
  ),
  tool(
    '/tools/inventory-turnover',
    'Inventory Turnover Calculator',
    'Inventory Turnover Calculator — Ratio, Days & GMROI',
    'Calculate inventory turnover ratio, days inventory outstanding and GMROI to measure how efficiently stock sells. Free calculator.'
  ),
  {
    path: '/blog',
    kind: 'blog',
    h1: 'DoAide Inventory Blog',
    title: 'Inventory Management Blog — Guides for Small Businesses',
    description:
      'Practical guides on reorder points, barcodes, FIFO vs LIFO, ABC analysis, GST stock records and godown management for Indian small businesses.',
  },
  ...ARTICLES.map((a) => ({
    path: `/blog/${a.slug}`,
    kind: 'post',
    h1: a.title,
    title: a.title,
    description: a.description,
    published: a.published,
  })),
]

export const canonicalFor = (path) => `${SITE.baseUrl}${path}`

export const metaForPath = (path) => routes.find((r) => r.path === path)

const ORG = { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' }

export function jsonLdFor(route) {
  const url = canonicalFor(route.path)
  switch (route.kind) {
    case 'home':
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            name: SITE.name,
            url,
            description: route.description,
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'Inventory Management',
            operatingSystem: 'Web',
            offers: [
              { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'INR' },
              { '@type': 'Offer', name: 'Starter', price: '999', priceCurrency: 'INR' },
              { '@type': 'Offer', name: 'Pro', price: '2499', priceCurrency: 'INR' },
            ],
            author: ORG,
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              ['Can I track inventory across multiple warehouses?', 'Yes. Paid plans support multiple warehouses with real-time stock sync across all locations.'],
              ['Does it support barcode scanning?', 'Yes. Generate and print barcode labels for products, then scan them to look up or update stock levels instantly.'],
              ['Is there a free plan?', 'Yes. The Free plan supports up to 50 products in 1 warehouse with basic reports. No credit card required.'],
            ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
          },
        ],
      }
    case 'tool':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: route.h1,
        url,
        description: route.description,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        author: ORG,
      }
    case 'post':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: route.title,
        description: route.description,
        url,
        mainEntityOfPage: url,
        datePublished: route.published,
        author: ORG,
        publisher: ORG,
      }
    default:
      return {
        '@context': 'https://schema.org',
        '@type': route.kind === 'blog' ? 'Blog' : 'WebPage',
        name: route.h1,
        url,
        description: route.description,
        isPartOf: { '@type': 'WebSite', name: SITE.name, url: canonicalFor('/') },
      }
  }
}

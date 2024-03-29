import { withContentlayer } from 'next-contentlayer'

/** @type{import('next').NextConfig */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
    ]
  },
}

const ContentSecurityPolicy = `
  default-src 'self';
  script-src https://unpkg.com/@graphql-yoga/ 'self' 'unsafe-eval' 'unsafe-inline';
  child-src 'self';
  style-src https://unpkg.com/@graphql-yoga/ 'self' 'unsafe-inline';
  font-src 'self' data:;
  connect-src *;
  img-src https://raw.githubusercontent.com/dotansimha/graphql-yoga/ 'self' data:;
`

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]

export default withContentlayer(config)

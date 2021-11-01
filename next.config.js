/** @type{import('next').NextConfig */
module.exports = {
  swcMinify: true,
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

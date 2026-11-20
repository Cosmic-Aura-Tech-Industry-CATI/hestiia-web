import type { NextConfig } from 'next'

const backendOrigin = process.env.BACKEND_URL || 'http://localhost:5000'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/experience',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/party',
        destination: '/contact?type=party',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    if (process.env.BACKEND_URL || process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: `${backendOrigin}/api/:path*`,
        },
        {
          source: '/uploads/:path*',
          destination: `${backendOrigin}/uploads/:path*`,
        },
      ]
    }
    return []
  },
}

export default nextConfig

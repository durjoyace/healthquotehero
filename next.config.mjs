/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slashes to match WordPress URLs
  trailingSlash: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.healthquotehero.com",
      },
    ],
  },

  // Redirects for URL compatibility
  async redirects() {
    return [
      // WordPress admin redirects (catch old admin URLs)
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/wp-login.php",
        destination: "/",
        permanent: false,
      },
      // WordPress content redirects
      {
        source: "/wp-content/uploads/:path*",
        destination: "/uploads/:path*",
        permanent: true,
      },
      // Old healthquotehero slug to home
      {
        source: "/healthquotehero/",
        destination: "/",
        permanent: true,
      },
      // Feed redirects
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      // XML sitemap redirect (we'll generate our own)
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/page-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

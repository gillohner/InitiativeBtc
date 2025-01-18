/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL || 'http',
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL).hostname,
        port: process.env.NEXT_PUBLIC_API_PORT || '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx'],
  async redirects() {
    let redirections = [];
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redirections`);
      const result = await res.json();
      const redirectItems = result.data.map(({ source, destination }) => ({
        source: `/:locale${source}`,
        destination: `/:locale${destination}`,
        permanent: false,
      }));

      redirections = redirections.concat(redirectItems);
      return redirections;
    } catch (error) {
      console.error('Error fetching redirections:', error);
      return [];
    }
  },
};

export default nextConfig;

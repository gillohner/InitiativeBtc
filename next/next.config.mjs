/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: ['http', 'https'], // or 'https' if applicable
        hostname: ['localhost', 'strapi.bitcoin-ja.ch'],
        port: '1337', // specify the port if it's not the default
        pathname: '/uploads/**', // specify the path pattern for images
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
      return [];
    }
  },
};

export default nextConfig;

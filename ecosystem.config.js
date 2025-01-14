// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'strapi',
        cwd: '/var/www/initiativebtc/strapi',
        script: 'yarn',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'nextjs',
        cwd: '/var/www/initiativebtc/next',
        script: 'yarn',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  
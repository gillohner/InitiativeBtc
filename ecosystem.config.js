module.exports = {
    apps: [
      {
        name: 'strapi',
        cwd: '/var/www/InitiativeBtc/strapi',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
      },
      {
        name: 'next',
        cwd: '/var/www/InitiativeBtc/next',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  
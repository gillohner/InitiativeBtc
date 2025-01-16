const cryptoModule = require('crypto');

module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || cryptoModule.randomBytes(16).toString('base64'),
    },
  },
});

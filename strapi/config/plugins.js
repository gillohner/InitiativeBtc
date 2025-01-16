import * as cryptoModule from 'crypto';

export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || cryptoModule.randomBytes(16).toString('base64'),
    },
  },
});

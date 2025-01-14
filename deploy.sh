#!/bin/bash
# deploy.sh

cd /var/www/initiativebtc

# Update Strapi
cd strapi
git pull
yarn install
yarn build
pm2 reload strapi

# Update Next.js
cd ../next
git pull
yarn install
yarn build
pm2 reload nextjs

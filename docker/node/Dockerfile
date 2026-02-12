FROM node:20

WORKDIR /var/www

COPY package*.json ./
RUN npm ci

CMD ["npm", "run", "dev", "--", "--host"]

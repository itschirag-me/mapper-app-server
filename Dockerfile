FROM node:16

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY .env ./

RUN npm install
# RUN npm install --frozen-lockfile
# RUN npm install -g typescript

COPY . .

# RUN tsc --allowJs

# RUN rm -rf ./src

# RUN npm prune --production

EXPOSE 8000

CMD ["node", "build/server.js"]
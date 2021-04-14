FROM node:12.18.2

WORKDIR /server

ENV PORT 80

COPY package.json /server/package.json

RUN npm install

COPY . /server

CMD ["node", "server/index.js"]


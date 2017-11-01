FROM node:slim

WORKDIR /app/lumonere

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ENTRYPOINT ["node", "index.js"]

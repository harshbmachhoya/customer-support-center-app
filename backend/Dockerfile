FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN npm i

EXPOSE 3001

CMD ["yarn", "run", "start"]
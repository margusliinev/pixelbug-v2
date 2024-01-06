FROM node:20-alpine AS backend

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

RUN npm install --production

COPY . .

RUN npm run build

FROM node:20-alpine AS frontend

WORKDIR /app/client

COPY client/package*.json ./
COPY client/tsconfig.json ./
COPY client/tsconfig.node.json ./
COPY client/components.json ./
COPY client/vite.config.ts ./
COPY client/postcss.config.js ./
COPY client/tailwind.config.js ./

RUN npm install --production

COPY client .

RUN npm run build

FROM node:20-alpine

RUN addgroup app && adduser -S -G app -h /app user

WORKDIR /app

COPY --from=backend /app/dist ./dist

COPY --from=frontend /app/client/dist ./client/dist

EXPOSE 5000

USER user

CMD ["npm", "run", "start"]

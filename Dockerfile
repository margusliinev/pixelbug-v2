FROM node:20-alpine AS backend

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY prisma ./prisma/

RUN npm install

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

RUN npm install

COPY client .

RUN npm run build

FROM node:20-alpine

RUN addgroup app && adduser -S -G app -h /app user

WORKDIR /app

COPY --from=backend /app/node_modules ./node_modules
COPY --from=backend /app/package*.json ./
COPY --from=backend /app/dist ./dist

COPY --from=frontend /app/client/node_modules ./client/node_modules
COPY --from=frontend /app/client/package*.json ./client
COPY --from=frontend /app/client/dist ./client/dist

ENV NODE_ENV production

EXPOSE 5000

USER user

CMD ["npm", "run", "start"]

FROM node:18 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig*.json ./
COPY postcss.config.cjs ./
COPY tailwind.config.js ./
COPY index.html ./
COPY public ./public
COPY src ./src
COPY vite.config.ts ./  

ENV NODE_ENV=development
RUN npm install
RUN npm list vite
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]



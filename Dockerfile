FROM node:18 AS builder

WORKDIR /app

# Copia los archivos de dependencias y configuración
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig*.json ./
COPY postcss.config.cjs ./
COPY tailwind.config.js ./
COPY index.html ./
COPY public ./public
COPY src ./src
COPY vite.config.ts ./

# Fuerza la instalación de devDependencies
ENV NODE_ENV=development
RUN npm install

# (Paso de depuración) Muestra la versión de vite instalada
RUN npm list vite

# Compila el frontend
RUN npm run build

# Etapa de producción: Nginx sirve los archivos estáticos
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
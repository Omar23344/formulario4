FROM node:18

WORKDIR /app
COPY public ./public
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
COPY index.html ./
COPY src ./src


RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]



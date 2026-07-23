FROM node:22-alpine
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install

# 1. Сначала копируем весь исходный код проекта
COPY ./backend .

# 2. И только теперь генерируем типы Prisma (они перезапишут кастомную папку)
RUN npx prisma generate

# 3. Собираем проект
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

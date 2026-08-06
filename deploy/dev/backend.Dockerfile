FROM node:22-alpine
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install

COPY ./backend .

RUN ./node_modules/.bin/prisma generate

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

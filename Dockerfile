FROM node

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build
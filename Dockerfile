FROM node:latest

WORKDIR /app

COPY . /app

CMD ["node", "modul/test/testcontroller.js"]
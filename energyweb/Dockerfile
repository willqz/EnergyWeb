FROM node:alpine

WORKDIR /usr/src/app

ENV API_URL=http://localhost:8080/api/

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
FROM node:carbon
LABEL project="mico"
LABEL maintainer="mightymico email:abhishekmaharjan1993@gmail.com"

ENV NODE_ENV=production PORT=8080
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2 -g
RUN npm install --only=production
RUN npm install --only=development

COPY . .

RUN ["npm", "run", "build"]

EXPOSE 8080

CMD ["pm2-docker", "./server.js"]

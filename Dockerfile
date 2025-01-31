FROM node:20
WORKDIR /usr/src/clean-architecture-api
COPY ./package.json .
RUN npm install --omit=dev

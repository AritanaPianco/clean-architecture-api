FROM node:20
WORKDIR /usr/src/clean-architecture-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start

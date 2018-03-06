FROM node:8.9-alpine
ENV NODE_ENV production
ENV EXPRESS_HOST localhost
ENV EXPRESS_PORT 80
ENV MONGO_HOST localhost
ENV MONGO_PORT 27017
ENV MONGO_DBNAME trivia

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 80
CMD npm start
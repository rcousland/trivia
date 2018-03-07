FROM node:8.9-alpine
ENV NODE_ENV production
ENV EXPRESS_HOST 127.0.0.1
ENV EXPRESS_PORT 80
ENV MONGO_HOST 127.0.0.1
ENV MONGO_PORT 27017
ENV MONGO_DBNAME trivia
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY . .
RUN npm install --production --silent && mv node_modules ../
RUN npm run setup --production --silent
EXPOSE 80
CMD npm start
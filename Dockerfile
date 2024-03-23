FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
COPY . /app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
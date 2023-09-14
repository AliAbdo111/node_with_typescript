FROM node:18
WORKDIR  /App
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
EXPOSE 4000

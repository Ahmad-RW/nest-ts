
#-- Multi Stage building
#-- Build and install deps stage
FROM node:14

ENV NODE_ENV development 

USER node
WORKDIR /home/node

COPY package*.json ./ 
RUN npm i
COPY . .
RUN npm run build

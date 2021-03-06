FROM node:alpine
WORKDIR '/app'
COPY server/package.json .
RUN npm install
COPY server/ .
RUN npm run build
EXPOSE 3001
CMD node dist/main

FROM node:latest
LABEL author="Andrew"

ENV NODE_ENV=production
ENV PORT=3001

COPY /server /var/www
WORKDIR /var/www
VOLUME [ "/var/www" ]
RUN npm install
EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
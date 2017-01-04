FROM node:alpine

# create directory

RUN mkdir -p /srv/node
WORKDIR /srv/node

# copy config

COPY config config

# install dependencies

COPY package.json /srv/node
RUN npm install

# build source

COPY source source
RUN npm run build

# install production dependencies

RUN rm -r source/ node_modules/
RUN npm install --only=production

# expose ports

EXPOSE 8080

# run

CMD ["npm", "run", "start"]

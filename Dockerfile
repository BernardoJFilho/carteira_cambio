FROM node:16.19-alpine

WORKDIR /carteira

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "run", "start" ]

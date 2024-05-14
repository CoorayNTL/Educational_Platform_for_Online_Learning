FROM node

WORKDIR /app/payment

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8010

CMD ["npm", "start"]
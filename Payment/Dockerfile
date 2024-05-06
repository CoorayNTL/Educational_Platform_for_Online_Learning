FROM node

WORKDIR /app/payment

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "start"]
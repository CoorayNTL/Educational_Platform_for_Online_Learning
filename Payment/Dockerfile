FROM node

WORKDIR /app/payement

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "start"]
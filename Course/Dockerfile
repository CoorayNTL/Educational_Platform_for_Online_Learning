FROM node

WORKDIR /app/courses

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]
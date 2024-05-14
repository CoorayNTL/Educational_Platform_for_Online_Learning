FROM node

WORKDIR /app/courseenrollment
COPY package.json .

RUN npm install

COPY . .

EXPOSE 8007

CMD ["npm", "start"] 
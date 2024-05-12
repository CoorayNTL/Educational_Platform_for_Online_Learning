FROM node

WORKDIR /app/course-enrollment

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]
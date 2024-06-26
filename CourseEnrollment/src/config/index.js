const dotEnv = require("dotenv");
const { COURSE_SERVICE } = require("../../../course/src/config");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.PROD_COURSE_ENROLLMENT_DB_URL,
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  USER_SERVICE: "user_service",
  COURSE_SERVICE:"course_service",
  SHOPPING_SERVICE: "shopping_service",
  ENROLL_COURSE_SERVICE: "enroll_course_service",
};

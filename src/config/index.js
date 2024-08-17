const dotEnv = require("dotenv");
const { log } = require("winston");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
//   console.log(configFile)
  log(configFile)
} else {
  dotEnv.config();
//   console.log(dotEnv.config())
  log(dotEnv.config())
}

module.exports = {
  PORT: process.env.PORT,
  DB_BASE_URL: process.env.MONGODB_URI,
  DB_URL: process.env.MONGODB_URI + process.env.DB_COLLECTION_NAME,
  DB_ERROR_URL: process.env.MONGODB_URI + process.env.DB_ERROR_COLLECTION_NAME,
  APP_SECRET: process.env.APP_SECRET,
};

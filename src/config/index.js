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
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
};

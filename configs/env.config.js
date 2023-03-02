import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve("env", ".env") });

const env = {
  DEALERCODE: process.env.DEALERCODE,
  USERNAME: process.env.FLWUSERNAME,
  PASSWORD: process.env.PASSWORD,
  CHECKKEY: process.env.CHECKKEY,
  PORT: process.env.PORT,
  DBHOST: process.env.DBHOST,
  DBUSER: process.env.DBUSER,
  DBPASS: process.env.DBPASS,
  DBSSLMODE: process.env.DBSSLMODE,
  DBNAME: process.env.DBNAME,
};

export default env;

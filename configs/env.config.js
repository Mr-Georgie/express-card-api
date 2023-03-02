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
  DBNAME2: process.env.DBNAME2,
  DBHOST2: process.env.DBHOST2,
  DBUSER2: process.env.DBUSER2,
  DBPASS2: process.env.DBPASS2,
};

export default env;

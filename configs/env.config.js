import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve("env", ".env") });

const env = {
  DEALERCODE: process.env.DEALERCODE,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  CHECKKEY: process.env.CHECKKEY,
  PORT: process.env.PORT,
};

export default env;

import bodyParser from "body-parser";
import express from "express";
import env from "./configs/env.config.js";
import db from "./models/index.js";
import routes from "./routes/index.js";

const api = express();

const PORT = env.PORT || 3001;

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.use("/api", routes);

api.get("/", (req, res) => {
  res.send(
    "Hi there! To use this service, please send a post request to with a payment object as body to one of the following:" +
      "\n /auth" +
      "\n /capture" +
      "\n /refund" +
      "\n /void"
  );
});

db.sequelize
  .sync()
  .then(() => {
    console.log("Database sync was successful");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

api.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

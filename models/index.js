import { Sequelize } from "sequelize";
import dbConfig from "../configs/db.config.js";
import CardParamModel from "./CardParam.js";
import TransactionModel from "./Transaction.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.transactions = TransactionModel(sequelize, Sequelize);
db.cardParams = CardParamModel(sequelize, Sequelize);

export default db;

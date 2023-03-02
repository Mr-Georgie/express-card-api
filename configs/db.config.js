const dbConfig = {
  HOST: "mokadb.czh6ps9bsrnb.us-east-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "amasaabubakar",
  DB: "georgie",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default dbConfig;

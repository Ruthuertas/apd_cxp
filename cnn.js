const pgPromise = require("pg-promise");

const config = {
  host: "localhost",
  port: "5432",
  database: "bd_cxp",
  user: "postgres",
  password: "israel",
};

const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;

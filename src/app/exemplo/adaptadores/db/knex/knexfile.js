const dotenv = require("dotenv");
dotenv.config({
  path: "../../../../../../.env"
});

module.exports = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    tableName: "knex_migrations"
  }
  // pool: {
  //   min: 2,
  //   max: 10
  // }
};

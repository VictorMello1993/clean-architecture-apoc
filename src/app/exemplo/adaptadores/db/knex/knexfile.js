const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

module.exports = {
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME
  },
  migrations: {
    tableName: "knex_migrations"
  },
  pool: {
    min: 2,
    max: 10
  }
};

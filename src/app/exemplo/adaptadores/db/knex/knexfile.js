const dotenv = require("dotenv");
dotenv.config({ path: "../../../../../../.env" });

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
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

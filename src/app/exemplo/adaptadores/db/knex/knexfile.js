const dotenv = require("dotenv");
const config = dotenv.config({
  path: "../../../../../../.env"
});

module.exports = {
  client: "pg",
  // connection: process.env.PG_CONNECTION_STRING,
  connection: {
    connectionString: config.DATABASE_URL,
    host: String(config.DB_HOST),
    port: Number(config.DB_PORT),
    user: String(config.DB_USER),
    database: String(config.DB_NAME),
    password: String(config.DB_PASSWORD)
  },
  migrations: {
    tableName: "knex_migrations"
  },
  pool: {
    min: 2,
    max: 10
  }
};

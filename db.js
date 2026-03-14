const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sijala_cms",
  password: "P@ssw0rd",
  port: 5432
});

module.exports = pool;
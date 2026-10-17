const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 11868,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeout: 20000
});

db.connect((err) => {
  if (err) {
    console.log("Mysql connection failed");
    console.log(err);
    return;
  }
  console.log("Mysql connection established successfully");
});

module.exports = db;
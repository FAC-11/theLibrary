const fs = require('fs');
const dbConnection = require('./db_connection_test');
const sql = fs.readFileSync(`${__dirname}/db_build_test.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log("test_theLibrary tables created with result: ", res);
});

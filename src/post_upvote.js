const dbConnection = require('../database/db_connection');

const postUpvote = (id, cb) => {
  const postUpvoteSqlQuery = `UPDATE resources SET upvotes = upvotes + 1 WHERE id = ${id};`;
  dbConnection.query(postUpvoteSqlQuery, (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

module.exports = postUpvote;

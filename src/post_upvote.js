const dbConnection = require('../database/db_connection');

const postUpvote = (title, cb) => {
  const postUpvoteSqlQuery = `UPDATE resources SET upvotes = upvotes + 1 WHERE title = ${title};`;
  dbConnection.query(postUpvoteSqlQuery, (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

module.exports = postUpvote;

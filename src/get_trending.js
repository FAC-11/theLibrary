const dbConnection = require('../database/db_connection');

const getTrending = (cb) => {
  const sqlTrendingQuery = 'SELECT id AS resource_id, title, link, publish_month,publish_year, upvotes FROM resources ORDER BY upvotes DESC LIMIT 3;';
  dbConnection.query(sqlTrendingQuery, (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

module.exports = getTrending;

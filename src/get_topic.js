const dbConnection = require('../database/db_connection');

const getTopic = (queryString, cb) => {
  const sqlQuery = `SELECT * FROM resources INNER JOIN resources_topics ON resources_topics.resource_id = resources.id INNER JOIN topics ON topics.id = resources_topics.topic_id WHERE resources_topics.topic_id = (SELECT id FROM topics WHERE LOWER(topic) = LOWER('${queryString}'));`;
  dbConnection.query(sqlQuery, (err, res) => {
    if (err) return cb(err);
    if (!res.rows[0]) {
      const anonymous = {
        topic: queryString,
        notValid: true
      };
      cb(null, [anonymous]);
    }
    else {
    cb(null, res.rows);
  };
  });
};

module.exports = getTopic;

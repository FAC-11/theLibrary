const dbConnection = require('../database/db_connection');

const postNewLink = (input, cb) => {
  const postNewLinkQuery = `INSERT INTO resources(title, link, publish_month, publish_year) VALUES ('${input.title}', '${input.link}', ${input.publish_month}, ${input.publish_year});
                            INSERT INTO resources_topics(resource_id, topic_id) VALUES((SELECT id FROM resources WHERE link='${input.link}'), ${input.topic_id});`;
  dbConnection.query(postNewLinkQuery, (err, res) => {
    if (err) return cb(err);
    return cb(null, res.rows);
  });
};

module.exports = postNewLink;

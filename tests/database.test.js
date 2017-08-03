const tape = require('tape');
const fs = require('fs');
const dbConnection = require('./test_database/db_connection_test');
const getTopic = require('../src/get_topic');

const sql = fs.readFileSync(`${__dirname}/test_database/db_build_test.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) return console.log(err);
});

tape('Initialising tape in database.test.js', (t) => {
  t.equals(1, 1, '1 should equal 1')
  t.end();
});

tape('SQL query case check', (t) => {
  getTopic('css', (err, res) => {
    const actual = res[0].topic;
    const expected = 'CSS';
    t.equals(actual, expected, 'getTopic object output topic should be "CSS" as the SQL query string is case insensitive');
    t.end();
  });
});

const topicArray = ['Javascript', 'CSS', 'Node', 'Databases', 'Accessibility', 'Git', 'TDD', 'HTTP', 'APIs', 'Callbacks', 'Software Architecture', 'Servers', 'Development Methodologies', 'HTML', 'UX'];
topicArray.forEach((topic) => {
  tape(`getTopic ${topic} query`, (t) => {
    getTopic(topic, (err, res) => {
      const actual = res[0].topic;
      const expected = topic;
      t.equals(actual, expected, `getTopic object output topic should be ${topic}`);
      t.end();
    });
  });
});

BEGIN;

DROP TABLE IF EXISTS resources, topics, resources_topics CASCADE;

CREATE TABLE resources (
  id            SERIAL         PRIMARY KEY,
  title         VARCHAR(300)   NOT NULL,
  link          VARCHAR(300)   NOT NULL,
  publish_month INTEGER,
  publish_year  INTEGER,
  upvotes       INTEGER        DEFAULT 0
);

CREATE TABLE topics (
  id       SERIAL        PRIMARY KEY,
  topic    VARCHAR(200)  NOT NULL,
  week     INTEGER
);

CREATE TABLE resources_topics (
  resource_id    INTEGER REFERENCES resources(id) ON UPDATE CASCADE,
  topic_id       INTEGER REFERENCES topics(id) ON UPDATE CASCADE
);

INSERT INTO resources(title, link, publish_month, publish_year, upvotes) VALUES
  ('How it feels to learn Javascript in 2016', 'https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f', '10', '2016', '1'),
  ('Accessibility according to actual people with disabilities', 'https://axesslab.com/accessibility-according-to-pwd/', '06', '2017', '7'),
  ('Pro Git', 'https://git-scm.com/book/en/v2', null, '2014', '0'),
  ('HTTP Chapter', 'http://eloquentjavascript.net/17_http.html', '12', '2014', '5'),
  ('7 Rules for Creating Gorgeous UI (Part 1)', 'https://medium.com/@erikdkennedy/7-rules-for-creating-gorgeous-ui-part-1-559d4e805cda', '11', '2014', '1'),
  ('7 Rules for Creating Gorgeous UI (Part 2)', 'https://medium.com/@erikdkennedy/7-rules-for-creating-gorgeous-ui-part-2-430de537ba96', '11', '2014', '1'),
  ('The Art of Node', 'https://github.com/maxogden/art-of-Node', '09', '2016', '3'),
  ('How to set up a Node.js app on Heroku in 6 steps', 'https://drublic.de/blog/how-to-set-up-herokuapp/', '01', '2017', '6'),
  ('The Node.js Way - Understanding Error-First Callbacks', 'http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/', '03', '2014', '4'),
  ('Learnyounode', 'https://github.com/workshopper/learnyounode', null, null, '9')

RETURNING id;

INSERT INTO topics(topic, week) VALUES
  ('Javascript', '0'),
  ('CSS', '1'),
  ('Node', '4'),
  ('Databases', '6'),
  ('Accessibility', '1'),
  ('Git', '1'),
  ('TDD', '2'),
  ('HTTP', '3'),
  ('APIs', '3'),
  ('Callbacks', '3'),
  ('Software Architecture', '3'),
  ('Servers', '4'),
  ('Development Methodologies', '7'),
  ('HTML', '1'),
  ('UX', null)

RETURNING id;

INSERT INTO resources_topics(resource_id, topic_id) VALUES
  (1, 1),
  (2, 5),
  (3, 6),
  (4, 1),
  (4, 8),
  (5, 15),
  (6, 15),
  (5, 2),
  (6, 2),
  (7, 3),
  (8, 3),
  (9, 3),
  (9, 10),
  (10, 3);

COMMIT;

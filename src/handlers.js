const fs = require('fs');
const path = require('path');
const getTopic = require('./get_topic');
const getTrending = require('./get_trending');
const postUpvote = require('./post_upvote');

const handleHomeRoute = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end('<h1>Sorry, this shit is ass</h1>');
    } else {
      res.writeHead(200, 'Content-Type:text/html');
      res.end(file);
    }
  });
};

const handlePublic = (req, res, url) => {
  const extension = url.split('.')[1];
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      res.writeHead(500, 'Content-Type:text/html');
      res.end('<h1>Soz, no can do</h1>');
    } else {
      res.writeHead(200, `Content-Type: ${extensionType[extension]}`);
      res.end(file);
    }
  });
};

const handleTopic = (req, res, url) => {
  const topicQuery = url.split('?topic=')[1];
  getTopic(topicQuery, (err, file) => {
    if (err) return err;
    const topicResponse = JSON.stringify(file);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(topicResponse);
  })
};

const handleTrending = (req, res) => {
  getTrending((err, file) => {
    if (err) return err;
    const trendingResponse = JSON.stringify(file);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(trendingResponse);
  });
};

const handlePostUpvote = (req, res) => {
  const titleName = url.split('?upvote=')[1];
  postUpvote(titleName, (err, file) => {
    if (err) return err;
    //gets current status of database
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end();
  });
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTopic,
  handleTrending,
  handlePostUpvote,
};

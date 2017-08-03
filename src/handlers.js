const fs = require('fs');
const path = require('path');
const getTopic = require('./get_topic');

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
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(topicResponse);
  })
};

const handleTrending = (req, res) => {
//getTopic function will be called here, and send the res.writeHead/ res.end in the anon callback
};

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleTopic,
  handleTrending,
};

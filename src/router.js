const handlers = require('./handlers');

const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handlers.handleHomeRoute(req, res);
  } else if (url.includes('public')) {
    handlers.handlePublic(req, res, url);
  } else if (url.includes('?topic')) {
    handlers.handleTopic(req, res, url);
  } else if (url.includes('?trending')) {
    handlers.handleTrending(req, res, url);
  } else if (url.includes('?upvote')) {
    handlers.handlePostUpvote(req, res, url);
  } else {
    res.writeHead(404, 'Content-Type: text/html');
    res.end('<h1>404 not found</h1>');
  }
};

module.exports = router;

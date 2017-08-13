const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const getTopic = require('./get_topic');
const getTrending = require('./get_trending');
const postUpvote = require('./post_upvote');
const { oAuthGet, oAuthPost } = require('./login');

const handlers = {
  handleHomeRoute: (req, res) => {
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
  },
  handlePublic: (req, res, url) => {
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
  },
  handleTopic: (req, res, url) => {
    const topicQuery = url.split('?topic=')[1];
    getTopic(topicQuery, (err, file) => {
      if (err) return err;
      const topicResponse = JSON.stringify(file);
      res.writeHead(200, {
        'content-type': 'application/json',
      });
      return res.end(topicResponse);
    });
  },
  handleTrending: (req, res) => {
    getTrending((err, file) => {
      if (err) return err;
      const trendingResponse = JSON.stringify(file);
      res.writeHead(200, {
        'content-type': 'application/json',
      });
      return res.end(trendingResponse);
    });
  },
  handlePostUpVote: (req, res, url) => {
    const titleName = url.split('?upvote=')[1].split('+current=')[0];
    const currentPage = url.split('+current=')[1].replace(/%20/gi, ' ');
    postUpVote(titleName, (error) => {
      if (error) return error;
      if (currentPage === 'Trending') {
        getTrending((trendingErr, response) => {
          if (trendingErr) return trendingErr;
          const trendingResponse = JSON.stringify(response);
          res.writeHead(200, {
            'content-type': 'application/json',
          });
          return res.end(trendingResponse);
        });
      } else {
        getTopic(currentPage, (err, response) => {
          if (err) return err;
          const topicResponse = JSON.stringify(response);
          res.writeHead(200, {
            'content-type': 'application/json',
          });
          return res.end(topicResponse);
        });
      }
    });
  },
  handleLoginGet: (req, res) => {
    oAuthGet((err, html) => {
      if (err) {
        res.writeHead(500, 'Content-Type:text/html');
        res.end('<h1>Sorry</h1><h2>Guess there\'s a problem on GitHub\'s end.');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(html.body);
        // console.log(res);
        console.log('REQ: ', req);
        console.log('RES: ', res);
      }
    });
  },
  handleLoginPost: (req, res) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      data = querystring.parse(data);
      // console.log('REQ: ', req);
      oAuthPost(data, (err, res) => {
        if (err) {
          // console.log(err);
        } else {
          // console.log(res);
        }
      });
    });
    // oAuth((err, html) => {
    //   if (err) {
    //     res.writeHead(500, 'Content-Type:text/html');
    //     res.end('<h1>Sorry</h1><h2>Guess there\'s a problem on GitHub\'s end.');
    //   } else {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.end(html.body);
    //   }
    // });
  },
};


module.exports = handlers;

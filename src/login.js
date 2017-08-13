const request = require('request');
const env = require('env2')('./config.env');

const oAuthGet = (cb) => {
  request(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`,
    (err, response) => {
      if (err) {
        cb(err);
      } else {
        cb(null, response);
        // console.log(response);
        // console.log('Typeof: ', typeof response);
      }
    });
};

const oAuthPost = (data, cb) => {
  request.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${data.code}`,
    (err, response) => {
      if (err) {
        // cb(err);
        // console.log('ERROR HERE!!! : ', err);
      } else {
        // cb(null, response);
        // console.log('RESPONSE HERE!!! : ', response);
      }
    });
};

module.exports = {
  oAuthGet,
  oAuthPost,
};

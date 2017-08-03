function serverRequest(url, cb) {
  var xhr = new XMLHTTPRequest();
  xhr.onreadystatechange = function () {
    var serverResponse = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, serverResponse);
    } else {
      cb(xhr.status, serverResponse);
    }
  };
}

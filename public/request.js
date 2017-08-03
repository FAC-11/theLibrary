function serverRequest(topic, cb) {
  var xhr = new XMLHTTPRequest();
  xhr.onreadystatechange = function () {
    var serverResponse = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, serverResponse);
    } else {
      cb(xhr.status, serverResponse);
    }
  };
  xhr.open('GET', '/?topic=' + topic, true);
  xhr.send();
}

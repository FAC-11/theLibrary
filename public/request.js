function serverRequest(topic, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, JSON.parse(xhr.responseText));
    } else {
      cb(xhr.status, JSON.parse(xhr.responseText));
    }
  };
  xhr.open('GET', '/?topic=' + topic, true);
  xhr.send();
}

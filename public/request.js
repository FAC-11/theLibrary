function serverRequest(id, topic, cb) {
  var xhr = new XMLHttpRequest();
  var endpoint = '';

  if (id === 'topic') {
    endpoint = '/?topic=' + topic;
  } else {
    endpoint = '/?trending';
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, JSON.parse(xhr.responseText));
    } else {
      cb(xhr.status, JSON.parse(xhr.responseText));
    }
  };
  xhr.open('GET', endpoint, true);
  xhr.send();
}

function serverRequest(id, topic, cb) {
  var xhr = new XMLHttpRequest();
  var endpoint = '';

  if (id === 'Topic') {
    endpoint = '/?topic=' + topic;
  } else {
    endpoint = '/?trending';
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(id, null, JSON.parse(xhr.responseText));
    }
    if (xhr.status === 404) {
      cb(id, xhr.status, JSON.parse(xhr.responseText));
    }
  };
  xhr.open('GET', endpoint, true);
  xhr.send();
}

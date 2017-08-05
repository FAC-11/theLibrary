function serverRequest(id, topic, requestType, cb) {
  console.log(id + topic);
  var xhr = new XMLHttpRequest();
  var endpoint = '';

  if (id === 'Topic') {
    endpoint = '/?topic=' + topic;
  } else if (id === 'Trending'){
    endpoint = '/?trending';
  } else {
    endpoint = id;
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(id, null, JSON.parse(xhr.responseText));
    }
    if (xhr.status === 404) {
      cb(id, xhr.status, JSON.parse(xhr.responseText));
    }
  };
  xhr.open(requestType, endpoint, true);
  xhr.send();
}

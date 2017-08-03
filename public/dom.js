/* eslint-disable */

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var dropDown = document.getElementById('drop-down-btn');
var dropDownList = document.getElementById('dropdown-list');
var main = document.getElementById('main-content');
dropDown.addEventListener("click", function() {
  dropDownList.classList.toggle("show");
});

var convertTopicName = function(){};

// Render the DOM - our callback from request.js
var DOMRender = function(sectionId, err, res) {
  var oldResultsTable = document.getElementById('results-table');
  var newResultsTable = document.createElement('section');
  var resultsHeading = document.createElement('h2');
  newResultsTable.className = "results-table";
  newResultsTable.setAttribute('id', "results-table");
  resultsHeading.className = "results";

  if (err) {
    console.log(err);
  } else if (res[0].notValid) {
    var notValidContent = document.createElement('p');
    notValidContent.className = "error-message";
    resultsHeading.textContent = "¯\\_(ツ)_/¯";
    notValidContent.textContent = "We don't have any good articles on this topic right now. If you know of any, drop @ameliejyc, @astroash, or @maxgerber a line on Gitter";
    newResultsTable.appendChild(resultsHeading);
    newResultsTable.appendChild(notValidContent);
    dropDown.textContent = res[0].topic;
  } else {
    resultsHeading.textContent = sectionId;
    newResultsTable.appendChild(resultsHeading);
    res.forEach(function(entry) {
      // 1: define Elements
      var resultDiv = document.createElement('div');
      var entryLink = document.createElement('a');
      var upVoteLink = document.createElement('a');
      var resultsEntry = document.createElement('button');
      var resultsUpVote = document.createElement('button');
      var titleText = document.createElement('span');
      var dateText = document.createElement('span');
      var upVoteText = document.createElement('span');
      var upVoteImg = document.createElement('object');
      // 2: add CSS classes and IDs
      resultDiv.className = "results";
      entryLink.className = "results__entry-link";
      upVoteLink.className = "results__upvote-link";
      resultsEntry.className = "results__entry";
      resultsUpVote.className = "results__upvote-btn";
      titleText.className = "entry__text--title";
      dateText.className = "entry__text--date";
      upVoteText.className = "upvote-btn__text";
      upVoteImg.className = "upvote-btn__svg";
      // 3: add data from database response
      entryLink.setAttribute('href', entry.link);
      entryLink.setAttribute('target', "_blank");
      upVoteImg.setAttribute('data', 'public/arrows.svg');
      upVoteImg.setAttribute('type', 'image/svg+xml');
      titleText.textContent = entry.title;
      dateText.textContent = entry.publish_year || '~';
      upVoteText.textContent = entry.upvotes;
      // 4: nest Elements within eachother
      resultsEntry.appendChild(titleText);
      resultsEntry.appendChild(dateText);
      resultsUpVote.appendChild(upVoteText);
      resultsUpVote.appendChild(upVoteImg);
      entryLink.appendChild(resultsEntry);
      upVoteLink.appendChild(resultsUpVote);
      resultDiv.appendChild(entryLink);
      resultDiv.appendChild(upVoteLink);
      newResultsTable.appendChild(resultDiv);
      dropDown.textContent = entry.topic;
    });
  };
  main.replaceChild(newResultsTable, oldResultsTable);
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdowns__btn')) {
    var dropdowns = document.getElementsByClassName("dropdown__content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Event Listener : Topic
dropDownList.addEventListener('click', function(event) {
  serverRequest('Topic', event.target.value, DOMRender);
});

// Event Listener : Trending
document.addEventListener('DOMContentLoaded', function(event) {
  serverRequest('Trending', null, DOMRender);
})

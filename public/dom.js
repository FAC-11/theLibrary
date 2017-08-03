/* eslint-disable */

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var dropDown = document.getElementById('drop-down-btn');
var dropDownList = document.getElementById('dropdown-list');
var main = document.getElementById('main-content');
dropDown.addEventListener("click", function() {
  dropDownList.classList.toggle("show");
});

// Render the DOM - our callback from request.js
var DOMRender = function(sectionId, err, res) {
  var oldResultsTable = document.getElementById('results-table');
  var newResultsTable = document.createElement('section');
  var resultsHeading = document.createElement('h2');
  newResultsTable.className = "results";
  newResultsTable.setAttribute('id', "results-table");
  resultsHeading.className = "results";

  if (err) {
    console.log(err);
  } else if (res[0].notValid) {
    var notValidContent = document.createElement('p');
    notValidContent.className = "error-message";
    resultsHeading.textContent = "Sorry!"
    notValidContent.textContent = "We don't have any good articles on this topic right now. If you know of any, drop @ameliejyc, @astroash, or @maxgerber a line on Gitter";
    newResultsTable.appendChild(resultsHeading);
    newResultsTable.appendChild(notValidContent);
  } else {
    resultsHeading.textContent = sectionId;
    newResultsTable.appendChild(resultsHeading);
    res.forEach(function(entry) {
      // 1: define Elements
      var resultsEntry = document.createElement('button');
      var titleDiv = document.createElement('div');
      var titleHeading = document.createElement('h3');
      var titleText = document.createElement('span');
      var dateDiv = document.createElement('div');
      var dateHeading = document.createElement('h3');
      var dateText = document.createElement('span');
      var upVotes = document.createElement('span');
      // 2: add CSS classes and IDs
      resultsEntry.className = "results__entry";
      titleDiv.className = "entry__title";
      titleHeading.className = "entry__heading";
      titleText.className = "entry__text";
      dateDiv.className = "entry__title";
      dateHeading.className = "entry__heading";
      dateText.className = "entry__text";
      upVotes.className = "entry__upvotes";
      // 3: add data from database response
      titleHeading.textContent = 'Title: ';
      titleText.textContent = entry.title;
      dateHeading.textContent = 'Date: ';
      dateText.textContent = entry.publish_year;
      upVotes.textContent = entry.upvotes + " people recommend this";
      // 4: nest Elements within eachother
      titleDiv.appendChild(titleHeading);
      titleDiv.appendChild(titleText);
      dateDiv.appendChild(dateHeading);
      dateDiv.appendChild(dateText);
      resultsEntry.appendChild(titleDiv);
      resultsEntry.appendChild(dateDiv);
      resultsEntry.appendChild(upVotes);
      newResultsTable.appendChild(resultsEntry);
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
  serverRequest('Topic', event.target.value, 'GET', DOMRender);
});

// Event Listener : Trending
document.addEventListener('DOMContentLoaded', function(event) {
  serverRequest('Trending', null,'GET', DOMRender);
})

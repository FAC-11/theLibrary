/* eslint-disable */

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var dropDown = document.getElementById('drop-down-btn');
var resultsTable = document.getElementById('results-table');
var resultsHeading = document.getElementById('results-heading');
dropDown.addEventListener("click", function() {
  document.getElementById("myDropdown").classList.toggle("show");
});

// Render the DOM - our callback from request.js
var DOMRender = function(err, res) {
  if (err) {
    console.log(err);
  } else {
    var resultsHeadingText = document.createTextNode('Topics');
    resultsHeading.textContent = resultsHeadingText;

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
      // 2: add CSS classes
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
      upVotes.textContent = entry.upvotes + "people recommend this";
      // 4: nest Elements within eachother
      titleDiv.appendChild(titleHeading);
      titleDiv.appendChild(titleText);
      dateDiv.appendChild(dateHeading);
      dateDiv.appendChild(dateText);
      resultsEntry.appendChild(titleDiv);
      resultsEntry.appendChild(dateDiv);
      // 5: Insert Elements to the DOM
      resultsTable.appendChild(titleDiv);
      resultsTable.appendChild(dateDiv);
      resultsTable.appendChild(upVotes);
    });
  };
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

/* eslint-disable */

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var dropDown = document.getElementById('drop-down-btn');
var resultsTable = document.getElementById('results-table');
dropDown.addEventListener("click", function(){
    document.getElementById("myDropdown").classList.toggle("show");
});

// Render the DOM - our callback from request.js
var DOMRender = function(err, res) {
  if (err) {
    console.log(err);
    // output something funky on error
  } else {
    resultsTable.innerHTML = '';
    var stuff = '';
  }
}

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

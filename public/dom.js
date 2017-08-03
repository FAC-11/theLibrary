/* eslint-disable */

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var dropDown = document.getElementById('drop-down-btn');
var dropDownList = document.getElementById('dropdown-list');
dropDown.addEventListener("click", function(){
    dropDownList.classList.toggle("show");
});

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
  request(event.target.value, DOMRender);
});

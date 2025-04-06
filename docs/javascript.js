function openTab(event, tabName) {

  // Get all elements with class="tabcontent" and hide them
  const tabcontents = [...document.getElementsByClassName("tabcontent")];
  tabcontents.forEach(tabcontent => tabcontent.style.display = "none");

  // Get all elements with class="tablinks" and remove the class "active"
  const tablinks = [...document.getElementsByClassName("tablinks")];
  tablinks.forEach(tablink => tablink.classList.remove("active"));

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}

// Fire a click event on the first tablink when the HTML is loaded
document.addEventListener('DOMContentLoaded', function () {
  const clickEvent = new Event("click");
  const tablinks = [...document.getElementsByClassName("tablinks")];
  tablinks[0].dispatchEvent(clickEvent);
});

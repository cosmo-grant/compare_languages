document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = [...document.getElementById("tab-buttons").children];
  const snippets = [...document.getElementById("snippet-container").children];

  hljs.highlightAll();

  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabButtons[i].classList.add("active");
      snippets.forEach((snippet) => (snippet.hidden = true));
      snippets[i].hidden = false;
    });
  }

  tabButtons[0].dispatchEvent(new Event("click"));
});

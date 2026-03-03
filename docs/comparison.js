document.addEventListener("DOMContentLoaded", function () {
  // get tab components
  const tabButtons = [...document.getElementById("tab-buttons").children];
  const snippets = [...document.getElementById("snippet-container").children];
  const outputContainer = document.getElementById("output-container");
  const outputs = [...outputContainer.children];

  // manage output visibility
  const toggleOutputButton = document.getElementById("toggle-output-button");
  toggleOutputButton.addEventListener("click", () =>
    outputContainer.toggleAttribute("hidden"),
  );

  // hide all snippets and outputs
  for (let i = 0; i < tabButtons.length; i++) {
    snippets.hidden = true;
    outputs.hidden = true;
  }

  // switch between tabs by clicking
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", () => {
      snippets.forEach((snippet) => (snippet.hidden = true));
      snippets[i].hidden = false;
      outputs.forEach((output) => (output.hidden = true));
      outputs[i].hidden = false; // the output _container_ visibility is controlled separately
    });
  }

  // default to displaying first tab
  tabButtons[0].dispatchEvent(new Event("click"));
});

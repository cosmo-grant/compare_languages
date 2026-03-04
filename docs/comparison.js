function measureMaxCodeHeight(snippets) {
  snippets.forEach((s) => (s.hidden = false));

  let maxCode = 0;
  for (const snippet of snippets) {
    const codePre = snippet.querySelector(":scope > pre");
    maxCode = Math.max(maxCode, codePre.scrollHeight);
  }

  snippets.forEach((s) => (s.hidden = true));

  return maxCode;
}

function setupOutputToggles(snippets) {
  for (const snippet of snippets) {
    const btn = snippet.querySelector(".output-toggle");
    const pre = snippet.querySelector(".output-section pre");
    btn.addEventListener("click", () => {
      pre.classList.toggle("output-hidden");
      btn.classList.toggle("open");
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = [...document.getElementById("tab-buttons").children];
  const snippets = [...document.getElementById("snippet-container").children];

  hljs.highlightAll();

  // Set uniform code-box height across all tabs.
  const maxCodeHeight = measureMaxCodeHeight(snippets);
  const BUFFER = 2;
  for (const snippet of snippets) {
    snippet.querySelector(":scope > pre").style.height =
      maxCodeHeight + BUFFER + "px";
  }

  // Hide outputs initially.
  for (const snippet of snippets) {
    snippet.querySelector(".output-section pre").classList.add("output-hidden");
  }

  setupOutputToggles(snippets);

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

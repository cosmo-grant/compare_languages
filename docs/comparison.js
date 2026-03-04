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

function applyHeights(snippets, maxCodeHeight) {
  const BUFFER = 2;

  // Show all snippets so we can measure total heights.
  snippets.forEach((s) => (s.hidden = false));

  // Set uniform code-box height; let output boxes size naturally.
  for (const snippet of snippets) {
    const codePre = snippet.querySelector(":scope > pre");
    codePre.style.height = maxCodeHeight + BUFFER + "px";
  }

  // Pin the container to the tallest snippet so discussion doesn't jump.
  const container = document.getElementById("snippet-container");
  let maxHeight = 0;
  for (const snippet of snippets) {
    maxHeight = Math.max(maxHeight, snippet.scrollHeight);
  }
  container.style.minHeight = maxHeight + "px";

  // Hide all snippets again and mark outputs as hidden.
  for (const snippet of snippets) {
    snippet.hidden = true;
    const outputPre = snippet.querySelector(".output-section pre");
    outputPre.classList.add("output-hidden");
  }
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

  const maxCodeHeight = measureMaxCodeHeight(snippets);
  applyHeights(snippets, maxCodeHeight);
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

function measureMaxHeights(snippets) {
  snippets.forEach((s) => (s.hidden = false));

  let code = 0;
  let output = 0;

  for (const snippet of snippets) {
    const codePre = snippet.querySelector(":scope > pre");
    code = Math.max(code, codePre.scrollHeight);

    const outputPre = snippet.querySelector(".output-section pre");
    output = Math.max(output, outputPre.scrollHeight);
  }

  snippets.forEach((s) => (s.hidden = true));

  return { code, output };
}

function applyHeights(snippets, heights) {
  const BUFFER = 2;
  for (const snippet of snippets) {
    const codePre = snippet.querySelector(":scope > pre");
    codePre.style.height = heights.code + BUFFER + "px";

    const outputPre = snippet.querySelector(".output-section pre");
    outputPre.style.height = heights.output + BUFFER + "px";
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

  const heights = measureMaxHeights(snippets);
  applyHeights(snippets, heights);
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

function measureMaxHeights(snippets) {
  snippets.forEach((s) => (s.hidden = false));

  let code = 0;
  let output = 0;

  for (const snippet of snippets) {
    const codePre = snippet.querySelector(":scope > pre");
    if (codePre) {
      code = Math.max(code, codePre.scrollHeight);
    }

    const details = snippet.querySelector("details");
    const outputPre = snippet.querySelector("details pre");
    if (details && outputPre) {
      details.open = true;
      output = Math.max(output, outputPre.scrollHeight);
      details.open = false;
    }
  }

  snippets.forEach((s) => (s.hidden = true));

  return { code, output };
}

function applyHeights(snippets, heights) {
  const BUFFER = 2;
  for (const snippet of snippets) {
    const codePre = snippet.querySelector(":scope > pre");
    if (codePre) codePre.style.height = heights.code + BUFFER + "px";

    const outputPre = snippet.querySelector("details pre");
    if (outputPre) outputPre.style.height = heights.output + BUFFER + "px";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = [...document.getElementById("tab-buttons").children];
  const snippets = [...document.getElementById("snippet-container").children];

  hljs.highlightAll();

  const heights = measureMaxHeights(snippets);
  applyHeights(snippets, heights);

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

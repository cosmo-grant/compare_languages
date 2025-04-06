const HIDE_OUTPUT_SYMBOL = "∧";
const SHOW_OUTPUT_SYMBOL = "∨";


document.addEventListener("DOMContentLoaded", function () {
  const toggles = [...document.getElementsByClassName("toggle-output")];
  const outputs = [...document.getElementsByClassName("output")];
  toggles.forEach(toggle => toggle.addEventListener("click", function () {
    outputs.forEach(output => output.hidden = !output.hidden);
    toggles.forEach(
      toggle => toggle.innerHTML = (toggle.innerHTML != SHOW_OUTPUT_SYMBOL ? SHOW_OUTPUT_SYMBOL : HIDE_OUTPUT_SYMBOL)
    );
  }))
  const clickEvent = new Event("click");
  toggles[0].dispatchEvent(clickEvent);
});



document.addEventListener("DOMContentLoaded", function () {
  const toggles = [...document.getElementsByClassName("toggle-output")];
  const outputs = [...document.getElementsByClassName("output")];
  toggles.forEach(toggle => toggle.addEventListener("click", function () {
    outputs.forEach(output => output.hidden = !output.hidden);
  }))
});

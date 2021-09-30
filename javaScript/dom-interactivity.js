//DOM selection
const backButton = document.querySelector(".calculator__button--back");
const svg = document.querySelector(".svg");

//button pressed behaviour
const active = () => {
  svg.style.fill = "#FFF"
}
const notActive = () => {
  svg.style.fill = "#b0b2b4"
}

//

//event listeners
backButton.addEventListener("mousedown", active);
backButton.addEventListener("mouseup", notActive);

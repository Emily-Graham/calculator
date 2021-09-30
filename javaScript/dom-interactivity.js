//DOM selection
const backButton = document.querySelector(".calculator__button--back");
const svg = document.querySelector(".svg");

//hover styling for back button
// const hoverOn = () => {
//   svg.style.fill = "#707070"
// }
// const hoverOff = () => {
//   svg.style.fill = "#b0b2b4"
// }
const active = () => {
  svg.style.fill = "#FFF"
}
const notActive = () => {
  svg.style.fill = "#b0b2b4"
}








//event listeners
backButton.addEventListener("mousedown", active);
backButton.addEventListener("mouseup", notActive);

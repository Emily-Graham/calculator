const backButton = document.querySelector(".calculator__button--back");
const svg = document.querySelector(".svg");

const hoverOn = () => {
  svg.style.fill = "grey"
  return;
}
const hoverOff = () => {
  svg.style.fill = "#c7c8ca"
  return;
}

backButton.addEventListener("mouseover", hoverOn);
backButton.addEventListener("mouseout", hoverOff);

import * as cal from "./calculations.js"; 

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

//each button needs to have an equvilant value
//when numeral buttons pressed, value is appended to currentCalculation
  //if currentCalculation value is 0, replace with new value
  //for every numeral exceeding a group of 3, add a ',' to displayed text

//when operator buttons are pressed 
  //any currentCalculation value is sent to previousCalculation
    //if there is a previous value and an operator, it is calculated
      //resulting value sent to currentCalculation
  //operator appends to previousCalculation, with space between
    //if there is no previous value, operator is appended to the default 0
    //if an operation is currently at end of previousCalculation, replace it with new operator
    
//Clear clears all stored data
  //currentCalculation equates to 0

//Back removes the last numeral/operator in previousCal
  //if an operator, also remove space in display text
  //if there is only one numeral in currentCalculation, replace with default zero

//equals resolves equation and displays result in currentCalculation
  //if previousCalculation does not end in an operator, accumalate last operator with each additional click
  //if previousCalculation ends in an decimal point, delete decimal

//decimal adds a decimal point
  //if last value is a decimal, do not add
  //if last value is an operator, first add 0

  //0 button pressed
    //if there is only one value, do not add if also 0





//event listeners
backButton.addEventListener("mousedown", active);
backButton.addEventListener("mouseup", notActive);

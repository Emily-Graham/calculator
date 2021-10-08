import {add, subtract, multiply, divide} from "./calculations.js";

//GLOBAL VARIABLES
const time = document.querySelector(".screen__time");
const deleteButton = document.querySelector(".calculator__button--delete");
const svg = document.querySelector(".svg");
const cssEquals = document.querySelector(".screen__equals");
const displayElement = document.querySelector(".screen__currentCalculation");
const displayElement2 = document.querySelector(".screen__previousCalculation");

//DETERMING TEXT currentCalculation FONT SIZE
const textSize = () => {
  
  if (displayElement.innerHTML.length <= 7) {
    displayElement.style.fontSize = "3.5rem";
    cssEquals.style.fontSize = "3.5rem";
  } else if (displayElement.innerHTML.length > 7 && displayElement.innerHTML.length <= 9) {
    displayElement.style.fontSize = "3rem";
    cssEquals.style.fontSize = "3rem";
  } else if (displayElement.innerHTML.length <= 11) {
    displayElement.style.fontSize = "2rem";
    cssEquals.style.fontSize = "2rem";
  } else if (displayElement.innerHTML.length <= 18) {
    displayElement.style.fontSize = "1.5rem";
    cssEquals.style.fontSize = "1.5rem";
  } else if (displayElement.innerHTML.length <= 26) {
    displayElement.style.fontSize = "1rem";
    cssEquals.style.fontSize = "1rem";
  }
}
 
//CLEAR PRESSED
const clear = () => {

  displayElement.innerHTML = "0";
  displayElement2.innerHTML = ""; 
  cssEquals.classList.remove("screen__equals--visible");
}

//BACKWARDS PRESSED
const deleteBackwards = () => {

  //if already at 0
  if (displayElement.innerHTML === "0") {
    return;
  //if deleting final numeral
  } else if (displayElement.innerHTML.length === 1){
    displayElement.innerHTML = "0"; 
  } else {
    displayElement.innerHTML = displayElement.innerHTML.slice(0, -1);
  }
}

//DELETE currentCalculation decimal point if valueless
const removeValuelessDecimal = () => {
  
  //if last character is a decimal
  if (!displayElement.innerHTML.includes(".")) {
    return;
  } else if (displayElement.innerHTML[displayElement.innerHTML.length-1] === "."){
    displayElement.innerHTML = displayElement.innerHTML.slice(0, -1);
  //if there in no following numeral other than 0
  } else if (/\.0+$/.test(displayElement.innerHTML)) {
    displayElement.innerHTML = displayElement.innerHTML.replace(/\.0+$/, "")
  //if valueless zeros, delete
  } else if (displayElement.innerHTML.match(/0+$/)) {
    displayElement.innerHTML = displayElement.innerHTML.replace(/0+$/, "");
  }
}

//OPERATOR PRESSED
const appendOperator = (value) => {
  
  let stringValue = "";

  if (displayElement.innerHTML === "cannot divide by zero") {
    clear();
  }

  //convert operator to string equivalent 
  switch (value){
    case "-":
    case "+": 
      stringValue = value; 
      break;
    case "/": 
      stringValue = "÷";
      break;
    default:
      stringValue = "×";
  }

  //remove equals sign
  cssEquals.classList.remove("screen__equals--visible");

  //if previousCalculation is empty
  if (displayElement2.innerHTML === "") {
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if an operator is last character of previousCalculation, resolve and add operator
  } else if (displayElement2.innerHTML[displayElement2.innerHTML.length-1].match(/\+|\-|\÷|\×/)) {
    resolveExpression(value);
    if (displayElement.innerHTML === "cannot divide by zero") {
      displayElement2.innerHTML = ``;
      return;
    }
    displayElement2.innerHTML = displayElement.innerHTML + ` ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousCalculation is a number only
  } else if (displayElement2.innerHTML.match(/\+|\-|\÷|\×/)) {
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousCalculation contains operator not as last character
  } else {
    resolveExpression(value);
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  }
}

//DECIMAL PRESSED
const appendDecimal = () => {

  //previous character is decimal, max characters, already a decimal, don't add
  if (displayElement.innerHTML[displayElement.innerHTML.length-1] === "."
    || displayElement.innerHTML.length === 7
    || displayElement.innerHTML.match(/\./)) {
    return;
  //append decimal
  } else {
    displayElement.innerHTML += ".";
  }
}
  
//NUMERICAL BUTTON PRESSED
const appendNumeral = (value) => {

  // check if equals has been pressed beforehand
  if (/screen__equals--visible/.test(cssEquals.classList)) {
    clear();
  }

  //check if max characters
  if (displayElement.innerHTML.length === 7) {
    return;
  // don't add 0 to 0
  } else if (displayElement.innerHTML.length === 1 
            && displayElement.innerHTML === "0" 
            && value === "0") {
    return;
  //replace if only 0
  } else if (displayElement.innerHTML.length === 1 
            && displayElement.innerHTML === "0") {
    displayElement.innerHTML = value;
  //append new number
  } else {
    displayElement.innerHTML += value;
  }
}

//EQUALS PRESSED
const resolveExpression = (activationSource) => {

  //convert string into mathematical segments
  let a = parseFloat(displayElement2.innerHTML.slice(0, displayElement2.innerHTML.indexOf(" ")));
  let b = parseFloat(displayElement.innerHTML);
  let operator = displayElement2.innerHTML.slice(displayElement2.innerHTML.indexOf(" ")+1, displayElement2.innerHTML.indexOf(" ")+2);

  //if there is no operator in previousCalculation
  if (!/\+|\-|\÷|\×/.test(displayElement2.innerHTML)) {
    displayElement2.innerHTML = `${displayElement.innerHTML}`;
  }

  // if there is a resolved answer and previousCalculation contains an operation, return
  if (/screen__equals--visible/.test(cssEquals.classList) && /\+|\-|\÷|\×/.test(displayElement2.innerHTML)) {
    return;
  }

  //if activated by button
  if (activationSource === "button") {
    cssEquals.classList.add("screen__equals--visible");
  }

  //if there is no equation to solve, append currentCalculation to previousCalculation
  if (!displayElement2.innerHTML) {
    displayElement2.innerHTML = `${displayElement.innerHTML}`;
  }

  //send arguments to corrosponding function, display result in currentCalcuation
  switch (operator) {
    case "+":
      displayElement.innerHTML = `${add(a, b).toPrecision(12)}`;
      displayElement2.innerHTML += ` ${b}`;
      break;
    case "-":
      displayElement.innerHTML = `${subtract(a, b).toPrecision(12)}`;
      displayElement2.innerHTML += ` ${b}`;
      break;
    case "÷":
      if (b === 0) { 
        displayElement2.innerHTML += " 0";
        displayElement.innerHTML = `cannot divide by zero`;
      } else {
        displayElement.innerHTML = `${divide(a, b).toPrecision(12)}`;
        displayElement2.innerHTML += ` ${b}`; 
      }
      break;
    case "×":
      displayElement.innerHTML = `${multiply(a, b).toPrecision(12)}`;
      displayElement2.innerHTML += ` ${b}`;
      break;
  }
  removeValuelessDecimal();
}

//BUTTON PRESSED
const buttonPressed = (input) => {
  if (displayElement.innerHTML === "cannot divide by zero") {
    clear()
  }

  switch (input) {
    case "/": 
    case "*":
    case "-": 
    case "+":
      removeValuelessDecimal();
      appendOperator(input);
      break;
    case "C":
      clear(); 
      break;
    case "D":
      deleteBackwards(); 
      break;
    case ".":
      appendDecimal();
      break;
    case "=":
      removeValuelessDecimal();
      resolveExpression("button");
      break;
    default:
      appendNumeral(input); 
      break;
  }
  textSize();
}

//BUTTON EVENT LISTENERS
document.querySelectorAll(".calculator__button").forEach((button) => button.addEventListener("click", (event) => {(event.target === svg || event.target.id === "svg") ?
  buttonPressed("D") : buttonPressed(event.target.id)}));
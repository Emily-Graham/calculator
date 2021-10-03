//GLOBAL VARIABLES
const deleteButton = document.querySelector(".calculator__button--delete");
const svg = document.querySelector(".svg");
const cssEquals = document.querySelector(".screen__equals");

//CSS BUTTON PRESSED BEHAVIOUR
const active = () => {
  svg.style.fill = "#FFF"
}
const notActive = () => {
  svg.style.fill = "#b0b2b4"
}



//CLEAR PRESSED
const clear = () => {
  console.log("Clear has been clicked!"); //delete later
  const displayElement = document.querySelector(".screen__currentCalculation");
  const displayElement2 = document.querySelector(".screen__previousCalculation");
  displayElement.innerHTML = "0";
  displayElement2.innerHTML = ""; 
  cssEquals.classList.remove("screen__equals--visible");
}



//BACKWARDS PRESSED
const deleteBackwards = () => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;

  //if already at 0
  if (currentDisplay === "0") {
    console.log("cannot delete anything else"); //delete later
    return;
  //if deleting final numeral
  } else if (currentDisplay.length === 1){
    displayElement.innerHTML = "0"; 
    console.log(`deleted ${displayElement.innerHTML[displayElement.innerHTML.length-1]}`); //delete later
  } else {
    console.log(`deleting ${displayElement.innerHTML[displayElement.innerHTML.length-1]}`); //delete later
    displayElement.innerHTML = displayElement.innerHTML.slice(0, -1);
  }
}



//OPERATOR PRESSED
const appendOperator = (value) => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const displayElement2 = document.querySelector(".screen__previousCalculation");
  const previousDisplay = displayElement2.innerHTML;
  let stringValue = "";
  console.log(`previous string last char: ${previousDisplay[previousDisplay.length-1]}`);

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

  //if previousDisplay is empty
  if (previousDisplay === "") {
    console.log(`changed display, added ${value}`);
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if an operator is last character of previousDisplay, resolve with currentDisplay and add operator
  } else if (previousDisplay[previousDisplay.length-1] === ("+" || "÷" || "-" || "×")) {
    console.log(previousDisplay[previousDisplay.length-1]);
    console.log(`sending to resolveExpression`);//delete later
    resolveExpression(value);
    displayElement2.innerHTML = displayElement.innerHTML + ` ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousDisplay is a number only
  } else if (previousDisplay.match(/\+|\-|\÷|\×/)) {
    console.log(`appended ${value}`);//delete later
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousDisplay contains operator not as last character
  } else {
    console.log(`will resolve previousDisplay equation then add operator: ${stringValue}`); //delete later 
    resolveExpression(value);
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  }
}



//DECIMAL PRESSED
const appendDecimal = () => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;

  //previous character is decimal, don't add
  if (currentDisplay[currentDisplay.length-1] === ".") {
    console.log("decimal already exists"); //delete later
    return;
    //don't add past 7 characters
  } else if (currentDisplay.length === 7) {
    console.log("max character reached"); //delete later
    return;
    //append decimal
  } else {
    displayElement.innerHTML += ".";
    console.log(`appended .`); //delete later
  }
}
  




//NUMERICAL BUTTON PRESSED
const appendNumeral = (value) => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;

  //check if max characters
  if (currentDisplay.length === 7) {
    console.log("no number added"); //delete later
    return;
    //don't add 0 to 0
  } else if (currentDisplay.length === 1 
            && currentDisplay === "0" 
            && value === "0") {
    console.log("Already 0"); //delete later
    //replace if only 0
  } else if (currentDisplay.length === 1 
            && currentDisplay === "0") {
    console.log(`0 => ${value}`); //delete later
    displayElement.innerHTML = value;
    //append new number
  } else {
    displayElement.innerHTML += value;
    console.log(`appended ${value}`); //delete later
  }
  //resizing text display based on number length - NOT CURRENTLY IMPLEMENTED
}



//EQUALS PRESSED
const resolveExpression = (activationSource) => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const displayElement2 = document.querySelector(".screen__previousCalculation");
  const currentDisplay = displayElement.innerHTML;
  const previousDisplay = displayElement2.innerHTML;
  //convert string into mathematical segments
  let a = parseFloat(previousDisplay.slice(0, previousDisplay.indexOf(" ")));
  let b = parseFloat(currentDisplay);
  let operator = previousDisplay.slice(previousDisplay.indexOf(" ")+1, previousDisplay.indexOf(" ")+2);

  //delete currentDisplay decimal point if last character
  if (currentDisplay[currentDisplay.length-1] === "."){
    displayElement.innerHTML = currentDisplay.slice(0, -1);
  }
  //if there is no operator in previousDisplay
  if (!previousDisplay.includes("+") 
    && !previousDisplay.includes("-") 
    && !previousDisplay.includes("÷") 
    && !previousDisplay.includes("×")) {
    displayElement2.innerHTML = `${displayElement.innerHTML}`;
  }

  //additon 
  const add = (a, b) => {
    return a + b;
  }
  //subtraction
  const subtract = (a, b) => {
    return a - b;
  }
  //multiplication
  const multiply = (a, b) => {
    return a * b;
  }
  //divide
  const divide = (a, b) => {
    return a / b;
  }

  //if activated by button
  if (activationSource === "button") {
    //make = css visible
    cssEquals.classList.add("screen__equals--visible");
  }

  //if there is no equation to solve, append currentDisplay to previousDisplay
  if (!previousDisplay) {
    displayElement2.innerHTML = `${currentDisplay}`;
  }

  //send arguments to corrosponding function, currentDisplay result
  switch (operator) {
    case "+":
      displayElement.innerHTML = `${add(a, b)}`;
      displayElement2.innerHTML += ` ${b}`;
      break;
    case "-":
      displayElement.innerHTML = `${subtract(a, b)}`;
      displayElement2.innerHTML += ` ${b}`;
      break;
    case "÷":
      if (b === 0) { 
        displayElement.innerHTML = `illegal`;
      } else {
        displayElement.innerHTML = `${divide(a, b)}`;
        displayElement2.innerHTML += ` ${b}`; 
      }
        //fix 'illegal' to 'cannot divide by zero' statement once css text resizes
      break;
    case "×":
      displayElement.innerHTML = `${multiply(a, b)}`;
      displayElement2.innerHTML += ` ${b}`;
      break;
  }
}



//BUTTON PRESSED
//when numeral buttons pressed, value is appended to currentCalculation
const buttonPressed = (input) => {
  //call corrosponding function
  switch (input) {
    case "/": 
    case "*":
    case "-": 
    case "+":
      appendOperator(input);
      break;
    case "C":
      clear(); //done
      break;
    case "D":
      deleteBackwards(); //done
      break;
    case ".":
      appendDecimal();
      break;
    case "=":
      resolveExpression("button");
      break;
    default:
      appendNumeral(input); //done
      break;
  }
}
  //for every numeral exceeding a group of 3, add a ',' to displayed text
  //round anwers to an appropriate number of digits
  //if inputs have a decimal, then no following value other than 0, equate to 0 



//EVENT LISTENERS
  //css styling event listeners
deleteButton.addEventListener("mousedown", active);
deleteButton.addEventListener("mouseup", notActive);
  //calls buttonPressed function
document.querySelectorAll(".calculator__button").forEach((button) => button.addEventListener("click", (event) => 
{ if (event.target === svg || event.target.id === "svg") {
  buttonPressed("D")
} else {
  buttonPressed(event.target.id)}}));
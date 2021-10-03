//GLOBAL VARIABLES
const deleteButton = document.querySelector(".calculator__button--delete");
const svg = document.querySelector(".svg");
const cssEquals = document.querySelector(".screen__equals");

//CSS BUTTON PRESSED BEHAVIOUR
const active = () => {
  svg.style.fill = "#FFF";
}
const notActive = () => {
  svg.style.fill = "#b0b2b4";
}

//DETERMING TEXT CURRENTDISPLAY FONT SIZE
const textSize = () => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;

  if (currentDisplay.length <= 7) {
    return;
  } else if (currentDisplay.length > 7 && currentDisplay.length <= 9) {
    displayElement.style.fontSize = "3rem";
    cssEquals.style.fontSize = "3rem";
    console.log(`fontsize: 3rem`);
  } else if (currentDisplay.length <= 11) {
    displayElement.style.fontSize = "2rem";
    cssEquals.style.fontSize = "2rem";
    console.log(`fontsize: 2rem`);
  } else if (currentDisplay.length <= 18) {
    displayElement.style.fontSize = "1.5rem";
    cssEquals.style.fontSize = "1.5rem";
    console.log(`fontsize: 1.5rem`);
  } else if (currentDisplay.length <= 26) {
    displayElement.style.fontSize = "1rem";
    cssEquals.style.fontSize = "1rem";
    console.log(`fontsize: 1rem`);
  }
}
 
//CLEAR PRESSED
const clear = () => {
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
    return;
  //if deleting final numeral
  } else if (currentDisplay.length === 1){
    displayElement.innerHTML = "0"; 
  } else {
    displayElement.innerHTML = displayElement.innerHTML.slice(0, -1);
  }
}

//DELETE currentDisplay decimal point if valueless
const removeValuelessDecimal = () => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;
  
  //if last character is a decimal
  if (!currentDisplay.includes(".")) {
    return;
  } else if (currentDisplay[currentDisplay.length-1] === "."){
    displayElement.innerHTML = currentDisplay.slice(0, -1);
  //if there in no following numeral other than 0
  } else if (/\.0+$/.test(currentDisplay)) {
    console.log(`yes, there is only a decimal and zeros`);
    displayElement.innerHTML = currentDisplay.replace(/\.0+$/, "")
  //if valueless zeros, delete
  } else if (currentDisplay.match(/0+$/)) {
    displayElement.innerHTML = currentDisplay.replace(/0+$/, "");
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
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if an operator is last character of previousDisplay, resolve with currentDisplay and add operator
  } else if (previousDisplay[previousDisplay.length-1].match(/\+|\-|\÷|\×/)) {
    resolveExpression(value);
    displayElement2.innerHTML = displayElement.innerHTML + ` ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousDisplay is a number only
  } else if (previousDisplay.match(/\+|\-|\÷|\×/)) {
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousDisplay contains operator not as last character
  } else {
    resolveExpression(value);
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  }
}

//DECIMAL PRESSED
const appendDecimal = () => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;

  //previous character is decimal, max characters, already a decimal, don't add
  if (currentDisplay[currentDisplay.length-1] === "."
    || currentDisplay.length === 7
    || currentDisplay.match(/\./)) {
    return;
  //append decimal
  } else {
    displayElement.innerHTML += ".";
  }
}
  
//NUMERICAL BUTTON PRESSED
const appendNumeral = (value) => {
  const displayElement = document.querySelector(".screen__currentCalculation");
  const currentDisplay = displayElement.innerHTML;

  //check if max characters
  if (currentDisplay.length === 7) {
    return;
  // don't add 0 to 0
  } else if (currentDisplay.length === 1 
            && currentDisplay === "0" 
            && value === "0") {
    return;
  //replace if only 0
  } else if (currentDisplay.length === 1 
            && currentDisplay === "0") {
    displayElement.innerHTML = value;
  //append new number
  } else {
    displayElement.innerHTML += value;
  }
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
const buttonPressed = (input) => {
  //call corrosponding function
  switch (input) {
    case "/": 
    case "*":
    case "-": 
    case "+":
      removeValuelessDecimal();
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
      removeValuelessDecimal();
      resolveExpression("button");
      break;
    default:
      appendNumeral(input); //done
      break;
  }
  textSize();
}
  //for every numeral exceeding a group of 3, add a ',' to displayed text
  //round anwers to an appropriate number of digits
  //answers can be a max of 26 characters

//EVENT LISTENERS
  //css styling event listeners
deleteButton.addEventListener("mousedown", active);
deleteButton.addEventListener("mouseup", notActive);
  //calls buttonPressed function
document.querySelectorAll(".calculator__button").forEach((button) => button.addEventListener("click", (event) => { if (event.target === svg || event.target.id === "svg") {
  buttonPressed("D")
} else {
  buttonPressed(event.target.id)
}}));
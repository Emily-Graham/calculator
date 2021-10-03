//GLOBAL VARIABLES
const deleteButton = document.querySelector(".calculator__button--delete");
const svg = document.querySelector(".svg");

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
  const cssEquals = document.querySelector(".screen__equals");
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
  console.log("Delete backwards has been clicked!"); //delete later
  console.log(displayElement.innerHTML.slice(0, -1));

  //if already at 0
  if (currentDisplay.length === 1 
    && currentDisplay === "0") {
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
  const currentDisplay = displayElement.innerHTML;
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

  //if previousDisplay is empty
  if (previousDisplay === "") {
    console.log(`changed display, added ${value}`);
    displayElement2.innerHTML = `${displayElement.innerHTML} ${stringValue}`;
    displayElement.innerHTML = "0";
  //if an operator is last character of previousDisplay, resolve with currentDisplay and add operator
  } else if (previousDisplay[previousDisplay.length-1] === ("+" || "÷" || "-" || "×")) {
    console.log(previousDisplay[previousDisplay.length-1]);
    console.log(`sending to resolveExpression`);
    resolveExpression(value);
    previousDisplay[previousDisplay.length] = ` ${stringValue}`;
  //if previousDisplay is a pure number
  } else if (typeof parseFloat(previousDisplay) === "number") {
    console.log(typeof parseFloat(previousDisplay));
    console.log(`appended ${value}`);
    displayElement2.innerHTML += ` ${stringValue}`;
    displayElement.innerHTML = "0";
  //if previousDisplay contains operator not as last character
  } else {
    console.log(`will resolve previousDisplay equation then add operator: ${stringValue}`); //delete later 
  }
}
  //any currentCalculation numeral is sent to previousCalculation
    //if last value is an operator, it is calculated
      //resulting value sent to currentCalculation
  //operator appends to previousCalculation, with space between
    //if there is no previous value, operator is appended to the default 0
    //if an operation is currently at end of previousCalculation, replace it with new operator
  //replace currentCalculation with 0, in case of appending decimals 



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
  let equation1 = parseFloat(currentDisplay);

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
  const cssEquals = document.querySelector(".screen__equals");
  const displayElement = document.querySelector(".screen__currentCalculation");
  const displayElement2 = document.querySelector(".screen__previousCalculation");
  const currentDisplay = displayElement.innerHTML;
  const previousDisplay = displayElement2.innerHTML;
  let a = undefined;
  let b = undefined;

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

    //resolve previousDisplay, operator, current display
    a = parseFloat(previousDisplay.slice(0, previousDisplay.indexOf(" ")));
    b = parseFloat(currentDisplay);
    operator = previousDisplay.slice(previousDisplay.indexOf(" ")+1, previousDisplay.indexOf(" ")+2);

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

  // if activated by operator
  } else {
    // make = css invisible
    cssEquals.classList.remove("screen__equals--visible");
    console.log(`will resolve because ${activationSource} was pressed`);
    //if previousDisplay===currentDisplay, add operator change currentDisplay to 0
    if(displayElement2.innerHTML === displayElement.innerHTML) {
      displayElement2.innerHTML += ` ${activationSource}`;
      displayElement.innerHTML = `0`;
    }
    //break string into numbers and operators, send as arguments into corrosponding calculation function
    //return value
    //display
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
  //if currentCalculation value is 0, replace with new value
  //for every numeral exceeding a group of 3, add a ',' to displayed text



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
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
  const displayElement = document.querySelector(".screen__currentCalculation");
  const displayElement2 = document.querySelector(".screen__previousCalculation");
  displayElement.innerHTML = "0";
  displayElement2.innerHTML = "";
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
const operator = (value) => {
  console.log(`I'm working because ${value} has been pressed!`);
}
  //any currentCalculation numeral is sent to previousCalculation
    //if there is a previous numeral and an operator, it is calculated
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
const resolveExpression = () => {
  console.log("I should resolve the expression thus far!");
}
//equals resolves equation and displays result in currentCalculation
  //if previousCalculation does not end in an operator, accumalate last operator with each additional click
  //if previousCalculation ends in an decimal point, delete decimal
  //if dividing by zero, message "cannot divide by zero"



//BUTTON PRESSED
//when numeral buttons pressed, value is appended to currentCalculation
const buttonPressed = (input) => {
  console.log(input);
  //call corrosponding function
  switch (input) {
    case "/": 
    case "*":
    case "-": 
    case "+":
      operator(input);
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
      resolveExpression();
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
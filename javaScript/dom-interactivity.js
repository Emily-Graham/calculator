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
  console.log("Clear has been clicked!");
}
  //currentCalculation equates to 0



//BACKWARDS PRESSED
const deleteBackwards = () => {
  console.log("Delete backwards whas been clicked!");
}
//Back removes the last numeral/operator in previousCal
  //if an operator, also remove space in display text
  //if there is only one numeral in currentCalculation, replace with default zero



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



//DECIMAL PRESSED
const appendDecimal = () => {
  console.log("A decimal should get added!");
}
  //if last value is a decimal, do not add
  //if last value is an operator, first add 0
  //if no previous value, first add 0
  //else, append decimal



//NUMERICAL BUTTON PRESSED
const appendNumeral = (value) => {
  const currentDisplay = document.querySelector(".screen__currentCalculation");
  let equation1 = null;
  console.log(`the number ${value} got pressed!`);


}
//0 button pressed
    //if there is only one value, do not add if also 0



//EQUALS PRESSED
const resolveExpression = () => {
  console.log("I should resolve the expression thus far!");
}
//equals resolves equation and displays result in currentCalculation
  //if previousCalculation does not end in an operator, accumalate last operator with each additional click
  //if previousCalculation ends in an decimal point, delete decimal



//BUTTON PRESSED
//when numeral buttons pressed, value is appended to currentCalculation
const buttonPressed = (input) => {
  //call corrosponding function
  switch (input) {
    case "/": 
    case "*":
    case "-": 
    case "+":
      operator(input);
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
      resolveExpression();
      break;
    default:
      appendNumeral(input);
      break;
  }
}
  //if currentCalculation value is 0, replace with new value
  //for every numeral exceeding a group of 3, add a ',' to displayed text



//EVENT LISTENERS
deleteButton.addEventListener("mousedown", active);
deleteButton.addEventListener("mouseup", notActive);
  //calls buttonPressed function
document.querySelectorAll(".calculator__button").forEach((button) => button.addEventListener("click", (event) => buttonPressed(event.target.id)));

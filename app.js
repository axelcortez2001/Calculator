let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let shouldResetDisplay = false;

const display = document.querySelector("#display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".decimal");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

digitButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", appendDecimal);

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) resetDisplay();
  display.textContent += number;
}

function resetDisplay() {
  display.textContent = "";
  shouldResetDisplay = false;
}

function clear() {
  display.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = "";
}

function deleteNumber() {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === "") display.textContent = "0";
}

function appendDecimal() {
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
}

function setOperator(operator) {
  if (currentOperator !== "") evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === "") return;
  secondOperand = display.textContent;
  display.textContent = operate(currentOperator, firstOperand, secondOperand);
  currentOperator = "";
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

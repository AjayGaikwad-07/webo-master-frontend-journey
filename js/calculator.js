const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  shouldResetDisplay: false
};

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) return;

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal();
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains('equal-sign')) {
    handleEquals();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand, shouldResetDisplay } = calculator;

  if (shouldResetDisplay) {
    calculator.displayValue = digit;
    calculator.shouldResetDisplay = false;
    return;
  }

  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}

function inputDecimal() {
  if (calculator.shouldResetDisplay) {
    calculator.displayValue = '0.';
    calculator.shouldResetDisplay = false;
    return;
  }

  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  calculator.shouldResetDisplay = true;
}

function handleEquals() {
  if (!calculator.waitingForSecondOperand && calculator.operator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);
    const result = calculate(firstOperand, inputValue, operator);
    
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
    calculator.waitingForSecondOperand = false;
    calculator.shouldResetDisplay = true;
  }
}

function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      if (secondOperand === 0) {
        alert("Division by zero is not allowed");
        return firstOperand;
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.shouldResetDisplay = false;
}
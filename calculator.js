
//object to keep track of arithmetic operations
const calculator = {
    //curent value on screen
    displayValue: '0',
    //string, that was added first or
    firstOperand: null,
    //right after operator key was pressed set to true 
    waitingForSecondOperand: false,
    operator: null,
};

//display digit on the screen
function inputDigit(digit) {
    //destructuring assignment
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
    //overwrite displayValue if 0 otherwise concat to previous displayValue
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);
}
//adding decimal point to displayValue if it not exist jet
function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    //converts displayValue string to a float-point number,otherwise returns NaN
    const inputValue = parseFloat(displayValue);
    //override the operator if needed
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    //if converting was successful and there is no firstOperand jet, sets float-point number as first operant
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue; }
        //when first operant is set and operator key is pressed
        else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    //stores operator value in object property
    calculator.operator = nextOperator;
    console.log(calculator);
}

//where the magic happens
function calculate(firstOperand, secondOperand, operator ) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    } 
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

//taking existing value from screen, overwriting displayValue
function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
}

updateDisplay();

//handle key presses; all elements with a class of .calculator-keys are now variable key
const keys = document.querySelector('.calculator-keys');
//listening for a click on keys
keys.addEventListener('click', (event) => {
    //access the clicked element
    const target = event.target;
    const { value } = target;
	if (!target.matches('button')) {
		return;
	}

	switch (value) {
		case '+':
		case '-':
		case '*':
		case '/':
		case '=':
			handleOperator(value);
			break;
		case '.':
			inputDecimal(value);
			break;
		case 'all-clear':
			resetCalculator();
			break;
            default:
                if (Number.isInteger(parseFloat(value))) {
                  inputDigit(value);
                }
            }
          
            updateDisplay();
          });
//Selected elements variables
const numbers = document.querySelectorAll('.num');
const resultDisplay = document.getElementById('result');
const operators = document.querySelectorAll('.op');
const clear = document.querySelector('.clear');
const clearAll = document.querySelector('.clear-all');
const equal = document.querySelector('.equal');

let operator ; //To store the selected operator and use it after setting the second operand;
let result = '';
let nextVal ='', prevVal =''; //Operands
let size = parseInt(getComputedStyle(resultDisplay).fontSize); //The initial font size of Display

//Display numbers and result
const displayResult = () => {
    resultDisplay.style.fontSize = size+'px';
    resultDisplay.innerHTML = result;

    //Change the display font size if it is overflown
    while (isOverflown(resultDisplay)) {
        newSize = parseInt(getComputedStyle(resultDisplay).fontSize);
        if (newSize <= 10) break;
        resultDisplay.style.fontSize = newSize-10+'px';
        if (newSize <= 30) resultDisplay.style.overflowWrap = 'break-word';
    }
}

//Check if the element is overflown
function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

//Add event to numbers
numbers.forEach( num => num.addEventListener('click', () => {
   result += num.innerHTML;
   displayResult();
}));

//Add event to operators
operators.forEach( op => op.addEventListener('click', () => {
    if (op.innerHTML === '×') {
        calculate();
        operator = '*'
    }
    if (op.innerHTML === '-') {
        calculate();
        operator = '-'
    }
    if (op.innerHTML === '+') {
        calculate();
        operator = '+'
    }
    if (op.innerHTML === '÷') {
        calculate();
        operator = '/' 
    }
    if (op.innerHTML === '%') {
        if(resultDisplay.innerHTML === '') return; //To prevent errors when there's no operand
        result = parseFloat(eval(resultDisplay.innerHTML / 100).toPrecision(12));
        displayResult();
        if (!nextVal) operator = '';
    }
 }));

 //Add event to equal sign
 equal.addEventListener('click', () => {
        if (!prevVal || !result || (!operator && result)) return; //To prevent errors when there's no operation yet
        nextVal = result;
        result = calculation();
        displayResult();
        operator = '';  
 });

 //Add event to clear-all button (reset everything)
 clearAll.addEventListener('click', () => {
     result = '';
     nextVal ='';
     prevVal ='';
     operator = '';
     displayResult();
 });

 //Add event to clear-from-last button (just clear the last digit)
clear.addEventListener('click', () => {
    let f= 0;
    if (result === '') f=1; //Don't want to change the result if it's empty!
    let resultStr = resultDisplay.innerHTML;
    result = resultStr.substring(0,resultStr.length-1);
    displayResult();
    if (f) result = ''; // It's not a good way though :)))
});

//Set prev and next values and call calculation
function calculate() {
    if (operator) {
        if (!result) return; //To prevent errors when there's no operand
        nextVal = result;
        result = calculation();
        prevVal = result;
    } else if(result){
        prevVal = result;
    }
    displayResult();
    result = ''; //To empty the display for new operand
};

//Do the calculatons 
function calculation() {
    return parseFloat(eval( prevVal +operator+ nextVal ).toPrecision(12));
};
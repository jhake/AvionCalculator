"use strict";

const display = document.querySelector('.calculator__display');
const keys = document.querySelector('.calculator__keys');
const clearKey = document.querySelector("[data-action|='clear']")

var currentOperation = undefined;
var currentOperands = [undefined, undefined];
var newOperand = true;

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;

        if (!action) {
            console.log('number key!');
            numberPressed(key.textContent);
        } else if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ) {
            operatorPressed(action);
        } else if (action === 'decimal') {
            decimalPressed();
        } else if (action === 'clear') {
            if(key.textContent === 'AC') {
                acPressed();
            } else {
                cePressed();
            }
        } else if (action === 'calculate') {
            equalPressed();
        }
    }
})

var numberPressed = function(number) {
    if(newOperand) {
        display.innerHTML = number;
        newOperand = false;
    } else {
        if(display.innerHTML === '0'){
            display.innerHTML = number;
        } else {
            display.innerHTML += number;
        }
    }
    clearKey.textContent = 'CE'
}

var decimalPressed = function() {
    if(newOperand) {
        display.innerHTML = "0.";
        newOperand = false;
    } else {
        if(!display.innerHTML.includes('.')){
            display.innerHTML += '.';
        }
    }
    clearKey.textContent = 'CE'
}

var operatorPressed = function(operation) {
    if(currentOperands[0] !== undefined && !newOperand) {
        currentOperands[1] = Number(display.innerHTML);
        switch(currentOperation) {
            case "add":
                currentOperands[0] += currentOperands[1];
                break
            case "subtract":
                currentOperands[0] -= currentOperands[1];
                break;
            case "multiply":
                currentOperands[0] *= currentOperands[1];
                break;
            case "divide":
                currentOperands[0] /= currentOperands[1];
                break;
        }
        display.innerHTML = currentOperands[0];
    } else {
        currentOperands[0] = Number(display.innerHTML);
    }
    
    newOperand = true;
    currentOperation = operation;
}

var equalPressed = function() {
    if(!newOperand) {
        currentOperands[1] = Number(display.innerHTML);
    }

    if(currentOperands[0] !== undefined) {
        if(currentOperands[1] === undefined) {
            currentOperands[1] = currentOperands[0];
        }

        switch(currentOperation) {
            case "add":
                currentOperands[0] += currentOperands[1];
                break
            case "subtract":
                currentOperands[0] -= currentOperands[1];
                break;
            case "multiply":
                currentOperands[0] *= currentOperands[1];
                break;
            case "divide":
                currentOperands[0] /= currentOperands[1];
                break;
        }

        display.innerHTML = currentOperands[0];
        newOperand = true;
    }
    clearKey.textContent = 'AC'
}

var acPressed = function() {
    display.innerHTML = "0";
    currentOperation = undefined;
    currentOperands = [undefined, undefined];
    newOperand = true;
}

var cePressed = function() {
    clearKey.textContent = 'AC'
    display.innerHTML = "0";
    newOperand = true;
}
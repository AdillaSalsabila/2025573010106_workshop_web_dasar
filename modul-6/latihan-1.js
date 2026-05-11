const display = document.getElementById('display');
const container = document.getElementById('btn-container');

let currentInput = '';
let previousInput = '';
let operator = null;

// Core Logic Functions
const updateDisplay = (val) => {
    display.value = val || '0';
};

const calculate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
};

const handleInput = (type, val) => {
    if (type === 'number') {
        if (val === '.' && currentInput.includes('.')) return;
        currentInput += val;
        updateDisplay(currentInput);
    } 
    
    else if (type === 'operator') {
        if (currentInput === '') return;
        operator = val;
        previousInput = currentInput;
        currentInput = '';
    } 
    
    else if (type === 'equal') {
        calculate();
    } 
    
    else if (type === 'clear') {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay('0');
    }
};

// Event Delegation (Requirement 5)
container.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;
    const { type, val } = e.target.dataset;
    handleInput(type, val);
});

// Keyboard Support (Requirement 4)
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key === '.') handleInput('number', e.key);
    if (['+', '-', '*', '/'].includes(e.key)) handleInput('operator', e.key);
    if (e.key === 'Enter') handleInput('equal');
    if (e.key === 'Escape') handleInput('clear');
});
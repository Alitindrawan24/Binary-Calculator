const res = document.form.textview.value;

function clc() {
    document.form.textview.value = "";
}

function insert(num) {
    document.form.textview.value += num;
}

function logicalAnd(num1, num2) {
    return num1 & num2;
}

function logicalOr(num1, num2) {
    return num1 | num2;
}

function logicalXor(num1, num2) {
    return num1 ^ num2;
}

function eql() {
    let result = document.form.textview.value;

    
    const numbers = result.split(/[-+*/&|^]/);

    if (numbers.length !== 2) {
        document.form.textview.value = "Error"; 
        return;
    }

    const num1 = parseInt(numbers[0], 2);
    const num2 = parseInt(numbers[1], 2);

    if (isNaN(num1) || isNaN(num2)) {
        document.form.textview.value = "Error"; 
        return;
    }

    const operator = result.match(/[&|^]/)[0]; 

    let resultValue;

    switch (operator) {
        case '&':
            resultValue = logicalAnd(num1, num2); 
            break;
        case '|':
            resultValue = logicalOr(num1, num2);
            break;
        case '^':
            resultValue = logicalXor(num1, num2); 
            break;
        default:
            resultValue = "Error please Enter correctly"; 
            break;
    }


    if (resultValue === 0) {
        document.form.textview.value = "0";
    } else {
        document.form.textview.value = decimalToBinary(resultValue);
    }
}

function decimalToBinary(num) {
    let binary = [];
    while (num > 0) {
        binary.push(num % 2);
        num = Math.floor(num / 2);
    }
    return binary.reverse().join('');
}

function binaryToDecimal(binary) {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        decimal += binary[i] * Math.pow(2, binary.length - i - 1);
    }
    return decimal;
}

// register a keystroke listener
document.addEventListener('keydown', event => {
    if (event.code === "Numpad0" || event.code === "Digit0") {
        insert(0);
    } else if (event.code === "Numpad1" || event.code === "Digit1") {
        insert(1);
    } else if (event.code == "NumpadAdd" || event.key == "+") {
        insert('+');
    } else if (event.code == "NumpadSubtract" || event.key == "-") {
        insert('-');
    } else if (event.code == "NumpadDivide" || event.key == "/") {
        insert('/');
    } else if (event.code == "NumpadMultiply" || event.key == "*") {
        insert('*');
    } else if (event.code == "KeyC" || event.key == "c" || event.code == "Backspace" || event.key == "Backspace") {
        clc();
    }
});

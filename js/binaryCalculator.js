const res = document.form.textview;

function clc() {
    res.value = "";
}

function insert(num) {
    res.value += num;
}

function eql() {
    let result = res.value;

    
    const parts = result.split(/([\+\-\*\/&|^])/).filter(part => part.trim() !== '');

    if (parts.length !== 3) {
        res.value = "Error"; 
        return;
    }

    const num1 = parseInt(parts[0], 2);
    const operator = parts[1];
    const num2 = parseInt(parts[2], 2);

    if (isNaN(num1) || isNaN(num2)) {
        res.value = "Error"; 
        return;
    }

    let resultValue;

    switch (operator) {
        case '+':
            resultValue = num1 + num2;
            break;
        case '-':
            resultValue = num1 - num2;
            break;
        case '*':
            resultValue = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                res.value = "Error"; 
                return;
            }
            resultValue = num1 / num2;
            break;
        case '&':
            resultValue = num1 & num2; 
            break;
        case '|':
            resultValue = num1 | num2; 
            break;
        case '^':
            resultValue = num1 ^ num2; 
            break;
        default:
            res.value = "Error"; 
            return;
    }

    res.value = decimalToBinary(resultValue);
}

function decimalToBinary(num) {
    let binary = [];
    while (num > 0) {
        binary.push(num % 2);
        num = Math.floor(num / 2);
    }
    return binary.reverse().join('');
}

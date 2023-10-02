const res = document.form.textview.value;

function clc() {
    document.form.textview.value = "";
}

function insert(num) {
    document.form.textview.value += num;
}

function eql() {
    let result = document.form.textview.value;

    operator = result.replace(/[0-9]/g, '');
    result = result.split(new RegExp(/[+\-*/]/));

    let num1 = result[0];
    let num2 = result[1];

    num1 = binaryToDecimal(num1);
    num2 = binaryToDecimal(num2);

    switch (operator) {
        case '+':
            value = num1 + num2;
            break;
        case '*':
            value = num1 * num2;
            break;
        case '/':
            value = num1 / num2;
            break;
        case '-':
            value = num1 - num2;
            break;
        default:
            value = ''
            break;
    }
    document.form.textview.value = decimalToBinary(value);
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
    } else if (event.code == "Enter" || event.key == "Enter") {
        eql();
    } else if (event.code == "KeyC" || event.key == "c" || event.code == "Backspace" || event.key == "Backspace") {
        clc();
    }
});

const toggleThemeButton = document.getElementById('toggle-theme-button');
const theme1Link = document.getElementById('theme1');
const theme2Link = document.getElementById('theme2');
let isTheme1Active = true;

toggleThemeButton.addEventListener('click', () => {
if (isTheme1Active) {
    theme1Link.disabled = true;
    theme2Link.disabled = false;
} else {
    theme1Link.disabled = false;
    theme2Link.disabled = true;
}
isTheme1Active = !isTheme1Active;
});
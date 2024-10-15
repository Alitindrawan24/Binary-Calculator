const res = document.form.textview;

let memory = 0; // Initialize memory to 0
let isMemorySet = false; // Flag to check if memory is set

function decimal(dot) {
    if (!res.value) {
        res.value = "0.";
    } else if (!res.value.includes(dot)) {
        res.value += ".";
    }
}

function backspace() {
    if (
        res.value === "Invalid Input" ||
        res.value === "Error" ||
        res.value === "Undefined"
    ) {
        res.value = "";
    } else {
        res.value = res.value.substring(0, res.value.length - 1);
    }
}

function clc() {
    res.value = "";
}

function insert(num) {
    if (
        res.value === "Invalid Input" ||
        res.value === "Error" ||
        res.value === "Undefined"
    ) {
        res.value = "";
    }
    res.value += num;
}

function eql() {
    let result = res.value;
    res.value = "";

    const parts = result
        .split(/([\+\-\*\/&|^><])/)
        .filter((part) => part.trim() !== "");

    if (parts.length !== 3) {
        res.value = "Invalid Input";
        return;
    }

    const num1 =
        parseInt(parts[0].replace(".", ""), 2) /
        Math.pow(2, (parts[0].split(".")[1] || "").length);
    //this ensures binary fractions are also acknowledged in num1
    const operator = parts[1];
    const num2 =
        parseInt(parts[2].replace(".", ""), 2) /
        Math.pow(2, (parts[2].split(".")[1] || "").length);
    //this ensures binary fractions are also acknowledged in num2

    if (isNaN(num1) || isNaN(num2)) {
        res.value = "Invalid Input";
        return;
    }

    let resultValue;

    switch (operator) {
        case "+":
            resultValue = num1 + num2;
            break;
        case "-":
            resultValue = num1 - num2;
            break;
        case "*":
            resultValue = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                res.value = "Undefined";
                return;
            }
            resultValue = num1 / num2;
            break;
        case ">":
            resultValue = num1 >> num2;
            break;
        case "<":
            resultValue = num1 << num2;
            break;
        default:
            res.value = "Error";
            return;
    }

    res.value = resultValue;

    if (resultValue < 0) {
        resultValue *= -1;
        res.value = "-" + decimalToBinary(resultValue);
    } else {
        res.value = decimalToBinary(resultValue);
    }
}

function decimalToBinary(num) {
    let binary = "";
    let Integral = parseInt(num, 10);
    let fractional = num - Integral;

    while (Integral > 0) {
        let rem = Integral % 2;
        binary += String.fromCharCode(rem + "0".charCodeAt());
        Integral = parseInt(Integral / 2, 10);
    }

    binary = reverse(binary);
    if (binary.length == 0) {
        binary += "0";
    }

    if (num % 1 !== 0) {
        binary += ".";

        let precision = 10; //set precision
        while (precision-- > 0) {
            fractional *= 2;
            let fract_bit = parseInt(fractional, 10);

            if (fract_bit == 1) {
                fractional -= fract_bit;
                binary += String.fromCharCode(1 + "0".charCodeAt());
            } else {
                binary += String.fromCharCode(0 + "0".charCodeAt());
            }
        }
    }

    return binary;
}

function reverse(input) {
    let temparray = input.split("");
    let left,
        right = 0;
    right = temparray.length - 1;

    for (left = 0; left < right; left++, right--) {
        // Swap values of left and right
        let temp = temparray[left];
        temparray[left] = temparray[right];
        temparray[right] = temp;
    }
    return temparray.join("");
}

function oneComplement() {
    const term = res.value;
    const onesComplement = term
        .split("")
        .map((bit) => (bit === "0" ? "1" : "0"))
        .join("");
    res.value = onesComplement;
}

function twoComplement() {
    const binary = res.value;
    const onesComplement = binary
        .split("")
        .map((bit) => (bit === "0" ? "1" : "0"))
        .join("");
    const decimalValue = parseInt(onesComplement, 2);
    const twosComplementDecimal = decimalValue + 1;
    const twosComplementBinary = twosComplementDecimal.toString(2);
    const paddedTwosComplement = twosComplementBinary.padStart(
        binary.length,
        "0"
    );
    res.value = paddedTwosComplement;
}

function binaryToDecimal(binary) {
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
        decimal += binary[i] * Math.pow(2, binary.length - i - 1);
    }
    return decimal;
}

function addToMemory() {
    if (!isNaN(parseFloat(res.value))) {
        memory += parseFloat(res.value);
        isMemorySet = true;
    }
}

function subtractFromMemory() {
    if (!isNaN(parseFloat(res.value))) {
        memory -= parseFloat(res.value);
        isMemorySet = true;
    }
}

function recallMemory() {
    if (isMemorySet) {
        res.value = memory;
    }
}

function clearMemory() {
    memory = 0;
    isMemorySet = false;
}

const inputs = document.querySelectorAll("input");
for (let input of inputs) {
    input.addEventListener("keydown", (event) => {
        if (event.code == "Enter" || event.key == "Enter") {
            eql();
            event.preventDefault()
        }
    });
}

// register a keystroke listener
document.addEventListener("keydown", (event) => {
    if (event.code === "Numpad0" || event.code === "Digit0") {
        insert(0);
    } else if (event.code === "Numpad1" || event.code === "Digit1") {
        insert(1);
    } else if (event.code == "NumpadAdd" || event.key == "+") {
        insert("+");
    } else if (event.code == "NumpadSubtract" || event.key == "-") {
        insert("-");
    } else if (event.code == "NumpadDivide" || event.key == "/") {
        insert("/");
    } else if (event.code == "NumpadMultiply" || event.key == "*") {
        insert("*");
    } else if (
        event.code == "KeyC" ||
        event.key == "c" ||
        event.code == "Backspace" ||
        event.key == "Backspace"
    ) {
        clc();
    } else if (event.code === "KeyM" || event.key === "m") {
        addToMemory();
    } else if (event.code === "KeyN" || event.key === "n") {
        subtractFromMemory();
    } else if (event.code === "KeyR" || event.key === "r") {
        recallMemory();
    } else if (event.code === "KeyL" || event.key === "l") {
        clearMemory();
    } else if (event.code === "NumpadDecimal" || event.key === "Period") {
        decimal();
    }
});

const toggleThemeButton = document.getElementById("toggle-theme-button");
const theme1Link = document.getElementById("theme1");
const theme2Link = document.getElementById("theme2");
let isTheme1Active = true;

toggleThemeButton.addEventListener("click", () => {
    if (isTheme1Active) {
        theme1Link.disabled = true;
        theme2Link.disabled = false;
    } else {
        theme1Link.disabled = false;
        theme2Link.disabled = true;
    }
    isTheme1Active = !isTheme1Active;
});

function openModal(message){
    console.log(`this is modal`);
    
    document.getElementById("modalResult").textContent = message;
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function binaryToOctal() {
    let binaryInput = document.getElementById("res").value;
    let decimalNumber = parseInt(binaryInput, 2);
    let octalNumber = decimalNumber.toString(8);
    let message = `Binary number ${binaryInput} in octal is: ${octalNumber}`;
    openModal(message);
}

function binaryToHexadecimal() {
    let binaryInput = document.getElementById("res").value;
    let decimalNumber = parseInt(binaryInput, 2);
    let hexadecimalNumber = decimalNumber.toString(16);
    let message = `Binary number ${binaryInput} in hexadecimal is: ${hexadecimalNumber}`;
    openModal(message);
}

function binaryToDecimal(){
    let binaryInput = document.getElementById("res").value;
    let decimalNumber = parseInt(binaryInput, 2);
    let message = `Binary number ${binaryInput} in decimal is: ${decimalNumber}`;
    openModal(message);
}
function circularShift(direction) {
    const inputValue = res.value;
    if (inputValue === "Invalid Input" || inputValue === "Error" || inputValue === "Undefined") {
        res.value = "";
        return;
    }

    const shiftValue = parseInt(prompt(`Enter the number of positions to ${direction === 'right' ? 'right' : 'left'} shift:`), 10);
    if (isNaN(shiftValue)) {
        return;
    }

    if (direction === 'right') {
        const shiftedValue = circularShiftRight(inputValue, shiftValue);
        res.value = shiftedValue;
    } else if (direction === 'left') {
        const shiftedValue = circularShiftLeft(inputValue, shiftValue);
        res.value = shiftedValue;
    }
}

function circularShiftRight(input, shift) {
    // Perform circular shift right
    const length = input.length;
    const shifted = input.substr(length - (shift % length)) + input.substr(0, length - (shift % length));
    return shifted;
}

function circularShiftLeft(input, shift) {
    // Perform circular shift left
    const length = input.length;
    const shifted = input.substr(shift % length) + input.substr(0, shift % length);
    return shifted;
}
const rorButton = document.querySelector('input[value="ROR"]');
const rolButton = document.querySelector('input[value="ROL"]');

rorButton.addEventListener("click", () => circularShift('right'));
rolButton.addEventListener("click", () => circularShift('left'));

function bitwiseNOT() {
    let binaryInput = res.value;
    let binaryInt = parseInt(binaryInput, 2);
    if (!isNaN(binaryInt)) {
        let numBits = binaryInput.length;

        let invertedBinaryInt = ~binaryInt;
        let mask = Math.pow(2, numBits) - 1;
        let finalBinary = invertedBinaryInt & mask;

        res.value = finalBinary.toString(2).padStart(numBits, '0');
    } else {
        res.value = "Invalid Input";
    }
}

function bitwiseAND() {
    const input = document.form.textview.value.split(",");
    if (input.length === 2) {
        const result = parseInt(input[0], 2) & parseInt(input[1], 2);
        document.form.textview.value = result.toString(2);
    } else {
        alert("Please enter two binary numbers separated by a comma");
    }
}

function bitwiseOR() {
    const input = document.form.textview.value.split(",");
    if (input.length === 2) {
        const result = parseInt(input[0], 2) | parseInt(input[1], 2);
        document.form.textview.value = result.toString(2);
    } else {
        alert("Please enter two binary numbers separated by a comma");
    }
}

function bitwiseXOR() {
    const input = document.form.textview.value.split(",");
    if (input.length === 2) {
        const result = parseInt(input[0], 2) ^ parseInt(input[1], 2);
        document.form.textview.value = result.toString(2);
    } else {
        alert("Please enter two binary numbers separated by a comma");
    }
}

function binaryToGray() {
    let binary = document.form.textview.value;
    let gray = binary[0];
    for (let i = 1; i < binary.length; i++) {
        gray += binary[i - 1] ^ binary[i];
    }
    document.form.textview.value = gray;
}


function binaryToFloat() {
    let binary = document.form.textview.value;
    let float = parseFloat(binary);
    let sign = binary[0] == '1' ? -1 : 1;
    let exponent = parseInt(binary.substr(1, 8), 2) - 127;
    let mantissa = 1 + binary.substr(9).split('').reduce((acc, bit, i) => acc + bit * Math.pow(2, -(i + 1)), 0);
    let result = sign * mantissa * Math.pow(2, exponent);
    document.form.textview.value = result.toFixed(6);
}

function calculateParityBit() {
    let binary = document.form.textview.value;
    let ones = binary.split('').filter(bit => bit === '1').length;
    let parity = ones % 2 === 0 ? 'Even' : 'Odd';
    alert(`Parity: ${parity}`);
}

function squareRootBinary() {
    let binary = document.form.textview.value;
    if (typeof binary === 'string') {
        if (/^[01]+$/.test(binary)) {
            decimalValue = parseInt(binary, 2);
        } else {
            throw new Error("Invalid binary string input.");
        }
    } else if (typeof binary === 'number') {
        decimalValue = binary;
    } else {
        throw new Error("Input must be a binary string or a number.");
    }

    const sqrtValue = Math.sqrt(decimalValue);

    const result = Number.isInteger(decimalValue)
    ? Math.floor(sqrtValue).toString(2)
    : sqrtValue;

    const message = `square root of ${binary} is ${result}`;
    openModal(message);
}

function factorialBinary() {
    let binary = document.form.textview.value;
    let factorial = 1;
    if (typeof binary === 'string') {
        if (/^[01]+$/.test(binary)) {
            decimalValue = parseInt(binary, 2);
        } else {
            throw new Error("Invalid binary string input.");
        }
    } else if (typeof binary === 'number') {
        decimalValue = binary;
    } else {
        throw new Error("Input must be a binary string or a number.");
    }

    for (let i = factorial+1; i <= decimalValue; i++) {
        factorial *= i
    }

    console.log(decimalValue);

    const message = `factorial of ${binary} is ${factorial}`
    openModal(message)
}

function toggleAdvancedOptions() {
    const advancedOptions = document.getElementById('advancedOptions');
    const toggleButton = document.getElementById('toggleAdvanced');
    
    if (advancedOptions.style.display === 'none' || advancedOptions.style.display === '') {
        advancedOptions.style.display = 'block';
        toggleButton.textContent = 'Hide Advanced Options';
    } else {
        advancedOptions.style.display = 'none';
        toggleButton.textContent = 'Show Advanced Options';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleAdvanced');
    toggleButton.addEventListener('click', toggleAdvancedOptions);
});
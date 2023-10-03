const res = document.form.textview;

function backspace() {
   if (res.value === "Invalid Input" || res.value === "Error" || res.value === "Undefined") {
    res.value = "";
   } else {
    res.value = res.value.substring(0, res.value.length - 1);
   }
}

function clc() {
  res.value = "";
}

function insert(num) {
  if (res.value === "Invalid Input" || res.value === "Error" || res.value === "Undefined") {
    res.value = "";
  }
  res.value += num;
}


function eql() {
  let result = res.value;

  const parts = result
    .split(/([\+\-\*\/&|^><])/)
    .filter((part) => part.trim() !== "");

  if (parts.length !== 3) {
    res.value = "Invalid Input";

    return;
  }

  const num1 = parseInt(parts[0], 2);
  const operator = parts[1];
  const num2 = parseInt(parts[2], 2);

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
      var div = num1 / num2;
      resultValue = div.toString(2);
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
  if(resultValue<0) {
    resultValue*=-1;
    res.value = "-"+decimalToBinary(resultValue);
  } else {
    res.value = decimalToBinary(resultValue);
  }
}

function decimalToBinary(num) {
    let binary = [];
    if(num==0)
      binary.push(0);
    while (num > 0) {
        binary.push(num % 2);
        num = Math.floor(num / 2);
    }
    return binary.reverse().join('');
}

function oneComplement(){
  const term=res.value;
  const onesComplement = term.split('').map(bit => bit === '0' ? '1' : '0').join('');
  res.value=onesComplement;
 }
 function twoComplement(){
  const binary=res.value;
  const onesComplement = binary.split('').map(bit => (bit === '0' ? '1' : '0')).join('');
  const decimalValue = parseInt(onesComplement, 2);
  const twosComplementDecimal = decimalValue + 1;
  const twosComplementBinary = twosComplementDecimal.toString(2);
  const paddedTwosComplement = twosComplementBinary.padStart(binary.length, '0');
  res.value= paddedTwosComplement;
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

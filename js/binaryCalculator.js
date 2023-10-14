const res = document.form.textview;

function backspace() {
  res.value = res.value.substring(0, res.value.length - 1);
}

function clc() {
  res.value = "";
}

function insert(num) {
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

  if (isNaN(num1) || isNaN(num2) || !"+-*/&|^><".includes(operator)) {
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
    case "&":
      resultValue = num1 & num2;
      break;
    case "|":
      resultValue = num1 | num2;
      break;
    case "^":
      resultValue = num1 ^ num2;
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

  res.value = decimalToBinary(resultValue);
}

function decimalToBinary(num) {
  if (num === 0) {
    return "0";
  }
  let binary = [];
  while (num > 0) {
    binary.push(num % 2);
    num = Math.floor(num / 2);
  }
  return binary.reverse().join("");
}

function binaryToDecimal(binary) {
  let decimal = 0;
  for (let i = 0; i < binary.length; i++) {
    decimal += binary[i] * Math.pow(2, binary.length - i - 1);
  }
  return decimal;
}

// Register a keystroke listener
document.addEventListener('keydown', event => {
  const key = event.key || event.code;
  if (key === "0" || key === "1") {
    insert(key);
  } else if ("+-*/&|^><".includes(key)) {
    insert(key);
  } else if (key === "Enter") {
    eql();
  } else if (key === "c" || key === "Backspace") {
    clc();
  }
});

const toggleThemeButton = document.getElementById('toggle-theme-button');
const theme1Link = document.getElementById('theme1');
const theme2Link = document.getElementById('theme2');
let isTheme1Active = true;

toggleThemeButton.addEventListener('click', () => {
  isTheme1Active = !isTheme1Active;
  theme1Link.disabled = isTheme1Active;
  theme2Link.disabled = !isTheme1Active;
});

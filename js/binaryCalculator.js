const res = document.form.textview;

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
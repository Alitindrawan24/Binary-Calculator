const res = document.getElementById("res");
const memory = { value: 0 };

function backspace() {
    if (res.value === "Invalid Input" || res.value === "Error" || res.value === "Undefined") {
        res.value = "";
    } else {
        res.value = res.value.slice(0, -1); // Simplified the string removal.
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
    const result = res.value;
    const parts = result.match(/([+\-*/&|^><])|(\d+)/g); // Improved splitting of expression.

    if (parts && parts.length === 3) {
        const num1 = parseInt(parts[0], 2);
        const operator = parts[1];
        const num2 = parseInt(parts[2], 2);

        if (!isNaN(num1) && !isNaN(num2)) {
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
                    resultValue = (num1 / num2).toString(2); // Simplified binary conversion.
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

            res.value = Math.abs(resultValue).toString(2); // Avoided duplication.
        } else {
            res.value = "Invalid Input";
        }
    } else {
        res.value = "Invalid Input";
    }
}

function toggleComplement(complementType) {
    const binary = res.value;
    const complemented = binary
        .split("")
        .map((bit) => (bit === "0" ? "1" : "0"))
        .join("");

    if (complementType === "twos") {
        const decimalValue = parseInt(complemented, 2);
        const twosComplementDecimal = decimalValue + 1;
        const twosComplementBinary = twosComplementDecimal.toString(2);
        res.value = twosComplementBinary.padStart(binary.length, "0"); // Simplified padding.
    } else {
        res.value = complemented;
    }
}

function addToMemory() {
    if (!isNaN(parseFloat(res.value))) {
        memory.value += parseFloat(res.value); // Utilized memory object.
    }
}

function subtractFromMemory() {
    if (!isNaN(parseFloat(res.value))) {
        memory.value -= parseFloat(res.value); // Utilized memory object.
    }
}

function recallMemory() {
    res.value = memory.value;
}

function clearMemory() {
    memory.value = 0;
}

document.addEventListener("keydown", (event) => {
    // Simplified event handling using key names.
    if (event.key === "0" || event.key === "1") {
        insert(event.key);
    } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
        insert(event.key);
    } else if (event.key === "Enter") {
        eql();
    } else if (event.key === "Backspace") {
        backspace();
    } else if (event.key === "c" || event.key === "C") {
        clc();
    } else if (event.key === "m" || event.key === "M") {
        addToMemory();
    } else if (event.key === "n" || event.key === "N") {
        subtractFromMemory();
    } else if (event.key === "r" || event.key === "R") {
        recallMemory();
    } else if (event.key === "l" || event.key === "L") {
        clearMemory();
    }
});

res.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        eql();
    }
});

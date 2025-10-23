// Binary Calculator Pro - UI Controller
import { BinaryCalculations } from './calculations.js';
import { ThemeManager } from './themes.js';

class BinaryCalculator {
  constructor() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForNumber = false;
    this.memory = 0;
    this.currentMode = this.loadMode();
    this.isAdvancedMode = this.currentMode === 'advanced';
    this.lastEquation = '';

    this.themeManager = new ThemeManager();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.switchMode(this.currentMode);
    this.updateDisplay();
    this.updateMemoryDisplay();
    this.updateEquationDisplay();
    this.themeManager.init();
  }

  setupEventListeners() {
    // Mode toggle buttons
    document.querySelectorAll('.mode-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchMode(btn.dataset.mode);
      });
    });

    // Digit buttons (0 and 1 only for binary)
    document.querySelectorAll('[data-digit]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.inputDigit(btn.dataset.digit);
      });
    });

    // Operator buttons
    document.querySelectorAll('[data-operator]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.inputOperator(btn.dataset.operator);
      });
    });

    // Action buttons
    document.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.performAction(btn.dataset.action);
      });
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    // Feedback Form
    document.querySelectorAll('#feedbackForm').forEach((btn) => {
      btn.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showFeedbackMessage();
      })
    })

    // Copy button
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.copyToClipboard();
      });
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.isAdvancedMode = mode === 'advanced';
    this.saveMode(mode);

    document.querySelectorAll('.mode-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
    });

    const indicator = document.querySelector('.mode-indicator');
    if (indicator) {
      if (this.isAdvancedMode) {
        indicator.classList.add('advanced');
      } else {
        indicator.classList.remove('advanced');
      }
    }

    const advancedSection = document.getElementById('advancedSection');
    if (advancedSection) {
      if (this.isAdvancedMode) {
        advancedSection.classList.remove('hidden');
      } else {
        advancedSection.classList.add('hidden');
      }
    }
  }

  inputDigit(digit) {
    if (digit !== '0' && digit !== '1') {
      return;
    }

    if (this.waitingForNumber) {
      this.currentValue = digit;
      this.waitingForNumber = false;
    } else {
      // Handle leading zero before decimal point
      if (this.currentValue === '0' && !this.currentValue.includes('.')) {
        this.currentValue = digit;
      } else {
        this.currentValue = this.currentValue + digit;
      }
    }

    this.updateDisplay();
  }

  inputDecimal() {
    // Only allow one decimal point
    if (this.currentValue.includes('.')) {
      return;
    }

    if (this.waitingForNumber) {
      this.currentValue = '0.';
      this.waitingForNumber = false;
    } else {
      this.currentValue = this.currentValue + '.';
    }

    this.updateDisplay();
  }

  inputOperator(operator) {
    if (
      this.previousValue !== null &&
      !this.waitingForNumber &&
      this.operation !== null
    ) {
      this.calculate();
    }

    this.previousValue = this.currentValue;
    this.operation = operator;
    this.waitingForNumber = true;

    this.updateEquationDisplay();
  }

  performAction(action) {
    switch (action) {
      case 'clear-entry':
        this.clearEntry();
        break;
      case 'all-clear':
        this.allClear();
        break;
      case 'backspace':
        this.backspace();
        break;
      case 'equals':
        this.calculate();
        break;
      case 'memory-add':
        this.memoryAdd();
        break;
      case 'memory-subtract':
        this.memorySubtract();
        break;
      case 'memory-clear':
        this.memoryClear();
        break;
      case 'memory-recall':
        this.memoryRecall();
        break;
      case 'ones-complement':
        this.onesComplement();
        break;
      case 'twos-complement':
        this.twosComplement();
        break;
      case 'not':
        this.bitwiseNot();
        break;
      case 'square':
        this.square();
        break;
      case 'factorial':
        this.factorial();
        break;
      case 'parity':
        this.parity();
        break;
      case 'rol':
        this.rotateLeft();
        break;
      case 'ror':
        this.rotateRight();
        break;
      case 'gray':
        this.grayCode();
        break;
      case 'decimal':
        this.inputDecimal();
        break;
      case 'toggle-keyboard-hints':
        this.toggleKeyboardHints();
        break;
    }
  }

  showFeedbackMessage() {
    var message = document.getElementById('feedbackMessage');
    var textarea = document.getElementById('feedbackText');

    message.style.display = 'block';
    textarea.value = '';

    // Hide the message after 3 seconds
    setTimeout(() => {
      message.style.display = 'none'
    }, 3000)
  }

  copyToClipboard() {
    const binaryDisplay = document.getElementById('binaryDisplay');
    if (!binaryDisplay) return;

    const textToCopy = binaryDisplay.textContent;

    // Use modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.showCopyFeedback(true);
      }).catch(() => {
        this.showCopyFeedback(false);
      });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand('copy');
        this.showCopyFeedback(true);
      } catch (err) {
        this.showCopyFeedback(false);
      }

      document.body.removeChild(textarea);
    }
  }

  showCopyFeedback(success) {
    const copyBtn = document.getElementById('copyBtn');
    if (!copyBtn) return;

    const originalHTML = copyBtn.innerHTML;

    if (success) {
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      copyBtn.style.color = 'var(--color-success, #4caf50)';
    } else {
      copyBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
      copyBtn.style.color = 'var(--color-error, #f44336)';
    }

    // Reset after 2 seconds
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.style.color = '';
    }, 2000);
  }

  calculate() {
    if (this.previousValue === null || this.operation === null) {
      return;
    }

    try {
      let result;

      switch (this.operation) {
        case '+':
          result = BinaryCalculations.add(this.previousValue, this.currentValue);
          break;
        case '-':
          result = BinaryCalculations.subtract(this.previousValue, this.currentValue);
          break;
        case '*':
          result = BinaryCalculations.multiply(this.previousValue, this.currentValue);
          break;
        case '/':
          result = BinaryCalculations.divide(this.previousValue, this.currentValue);
          break;
        case 'AND':
          result = BinaryCalculations.bitwiseAnd(this.previousValue, this.currentValue);
          break;
        case 'OR':
          result = BinaryCalculations.bitwiseOr(this.previousValue, this.currentValue);
          break;
        case 'XOR':
          result = BinaryCalculations.bitwiseXor(this.previousValue, this.currentValue);
          break;
        case '<<':
          result = BinaryCalculations.shiftLeft(this.previousValue, this.currentValue);
          break;
        case '>>':
          result = BinaryCalculations.shiftRight(this.previousValue, this.currentValue);
          break;
        default:
          return;
      }

      if (result < 0) {
        result = result >>> 0;
      }

      if (result > 0xffffffff) {
        result = result & 0xffffffff;
      }

      const resultBinary = BinaryCalculations.decimalToBinary(result);

      // Store equation without result (result is shown in main display)
      this.lastEquation = `${this.previousValue} ${this.operation} ${this.currentValue}`;

      this.currentValue = resultBinary;
      this.previousValue = null;
      this.operation = null;
      this.waitingForNumber = true;

      this.updateDisplay();
      this.updateEquationDisplay();
    } catch (error) {
      this.showError(error.message || 'Calculation error');
      this.clear();
    }
  }

  // Memory functions
  memoryAdd() {
    const value = BinaryCalculations.binaryToDecimal(this.currentValue);
    this.memory += value;
    this.updateMemoryDisplay();
  }

  memorySubtract() {
    const value = BinaryCalculations.binaryToDecimal(this.currentValue);
    this.memory -= value;
    this.updateMemoryDisplay();
  }

  memoryClear() {
    this.memory = 0;
    this.updateMemoryDisplay();
  }

  memoryRecall() {
    if (this.memory === 0) {
      this.currentValue = '0';
    } else {
      const absMemory = Math.abs(this.memory);
      this.currentValue = BinaryCalculations.decimalToBinary(absMemory);
    }
    this.waitingForNumber = true;
    this.updateDisplay();
  }

  // Advanced functions
  onesComplement() {
    const original = this.currentValue;
    const result = BinaryCalculations.onesComplement(this.currentValue);
    this.currentValue = BinaryCalculations.decimalToBinary(result);
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show explanation in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `1's Complement: ${original}`;
    }
  }

  twosComplement() {
    const original = this.currentValue;
    const result = BinaryCalculations.twosComplement(this.currentValue);
    this.currentValue = BinaryCalculations.decimalToBinary(result);
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show explanation in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `2's Complement: ${original}`;
    }
  }

  bitwiseNot() {
    const original = this.currentValue;
    const result = BinaryCalculations.bitwiseNot(this.currentValue);
    this.currentValue = BinaryCalculations.decimalToBinary(result);
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show calculation in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `${original} NOT`;
    }
  }

  square() {
    const original = this.currentValue;
    const result = BinaryCalculations.square(this.currentValue);
    this.currentValue = BinaryCalculations.decimalToBinary(result);
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show calculation in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `${original}²`;
    }
  }

  factorial() {
    try {
      const original = this.currentValue;
      const result = BinaryCalculations.factorial(this.currentValue);
      this.currentValue = BinaryCalculations.decimalToBinary(result);
      this.waitingForNumber = true;
      this.updateDisplay();

      // Show calculation in equation display
      const equationDisplay = document.getElementById('equationDisplay');
      if (equationDisplay) {
        equationDisplay.textContent = `${original}!`;
      }
    } catch (error) {
      this.showError(error.message);
    }
  }

  parity() {
    const parityBit = BinaryCalculations.parity(this.currentValue);
    const ones = this.currentValue.split('1').length - 1;

    // Show parity info in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      const parityType = parityBit === 0 ? 'even' : 'odd';
      equationDisplay.textContent = `Parity of ${this.currentValue} = ${parityBit} (${parityType}, ${ones} ones)`;
    }
  }

  rotateLeft() {
    const original = this.currentValue;
    const result = BinaryCalculations.rotateLeft(this.currentValue);
    this.currentValue = BinaryCalculations.decimalToBinary(result);
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show calculation in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `ROL: ${original}`;
    }
  }

  rotateRight() {
    const original = this.currentValue;
    const result = BinaryCalculations.rotateRight(this.currentValue);
    this.currentValue = BinaryCalculations.decimalToBinary(result);
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show calculation in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `ROR: ${original}`;
    }
  }

  grayCode() {
    const original = this.currentValue;
    const grayResult = BinaryCalculations.binaryToGray(this.currentValue);
    this.currentValue = grayResult;
    this.waitingForNumber = true;
    this.updateDisplay();

    // Show Gray Code conversion in equation display
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.textContent = `Binary → Gray: ${original}`;
    }
  }

  // Utility functions
  clearEntry() {
    // DEL - Clears current entry only
    this.currentValue = '0';
    this.waitingForNumber = false;
    this.updateDisplay();
  }

  allClear() {
    // AC - Clears everything
    this.currentValue = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForNumber = false;
    this.lastEquation = '';
    this.updateDisplay();
    this.updateEquationDisplay();
  }

  backspace() {
    if (this.waitingForNumber) {
      return;
    }

    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
    } else {
      this.currentValue = '0';
    }

    this.updateDisplay();
  }

  updateDisplay() {
    const binaryDisplay = document.getElementById('binaryDisplay');
    if (binaryDisplay) {
      binaryDisplay.textContent = this.currentValue;
    }

    const decimal = BinaryCalculations.binaryToDecimal(this.currentValue);

    const decDisplay = document.getElementById('decDisplay');
    const hexDisplay = document.getElementById('hexDisplay');
    const octDisplay = document.getElementById('octDisplay');

    if (decDisplay) {
      decDisplay.textContent = decimal.toString();
    }

    if (hexDisplay) {
      hexDisplay.textContent = BinaryCalculations.decimalToHex(decimal);
    }

    if (octDisplay) {
      octDisplay.textContent = BinaryCalculations.decimalToOctal(decimal);
    }
  }

  updateMemoryDisplay() {
    const memoryStatus = document.getElementById('memoryStatus');
    if (memoryStatus) {
      if (this.memory !== 0) {
        memoryStatus.textContent = `M: ${this.memory}`;
        memoryStatus.style.display = 'flex';
      } else {
        memoryStatus.style.display = 'none';
      }
    }
  }

  updateEquationDisplay() {
    const equationDisplay = document.getElementById('equationDisplay');
    if (!equationDisplay) return;

    if (this.previousValue && this.operation) {
      if (this.waitingForNumber) {
        equationDisplay.textContent = `${this.previousValue} ${this.operation}`;
      } else {
        equationDisplay.textContent = `${this.previousValue} ${this.operation} ${this.currentValue}`;
      }
    } else if (this.lastEquation) {
      equationDisplay.textContent = this.lastEquation;
    } else {
      equationDisplay.textContent = '';
    }
  }

  showError(message) {
    const equationDisplay = document.getElementById('equationDisplay');
    if (equationDisplay) {
      equationDisplay.innerHTML = `
        <span style="font-size: 12px; font-weight: 600; color: var(--color-error);
                     background: rgba(var(--color-error-rgb), 0.1);
                     padding: 4px 8px; border-radius: 4px; display: inline-block;">
          ⚠️ ${message}
        </span>
      `;

      // Auto-hide error after 5 seconds
      setTimeout(() => {
        if (equationDisplay.textContent.includes('⚠️')) {
          this.updateEquationDisplay();
        }
      }, 5000);
    }

    // Also log to console for debugging
    console.error('⚠️', message);
  }

  handleKeyboard(e) {
    // Don't interfere with browser shortcuts (Cmd/Ctrl combinations)
    if (e.metaKey || e.ctrlKey) {
      return;
    }

    // Don't interfere with input fields (feedback form, etc.)
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
      return;
    }

    if (this.isCalculatorKey(e.key)) {
      e.preventDefault();
    }

    // Animate the button that corresponds to the key pressed
    this.animateKeyPress(e.key);

    // Binary digits
    if (e.key === '0' || e.key === '1') {
      this.inputDigit(e.key);
    }

    // Decimal point (only . not , since , is used for ROL)
    if (e.key === '.') {
      this.inputDecimal();
    }

    // Basic operators
    const operatorMap = {
      '+': '+',
      '-': '-',
      '*': '*',
      '/': '/',
    };

    if (operatorMap[e.key]) {
      this.inputOperator(operatorMap[e.key]);
    }

    // Memory operations
    switch (e.key) {
      case 'm':
        this.performAction('memory-add');
        break;
      case 'M':
        this.performAction('memory-subtract');
        break;
      case 'l':
        this.performAction('memory-clear');
        break;
      case 'r':
        this.performAction('memory-recall');
        break;
    }

    // Advanced mode operations
    if (this.isAdvancedMode) {
      switch (e.key) {
        // Bitwise operations
        case 'a':
          this.inputOperator('AND');
          break;
        case 'o':
          this.inputOperator('OR');
          break;
        case 'x':
          this.inputOperator('XOR');
          break;
        case 'n':
          this.performAction('not');
          break;

        // Shift operations
        case '<':
          this.inputOperator('<<');
          break;
        case '>':
          this.inputOperator('>>');
          break;
        case ',':
          this.performAction('rol');
          break;
        case ';':
          this.performAction('ror');
          break;

        // Complement operations
        case '!':
          this.performAction('ones-complement');
          break;
        case '@':
          this.performAction('twos-complement');
          break;

        // Math operations
        case 's':
          this.performAction('square');
          break;
        case 'f':
          this.performAction('factorial');
          break;
        case 'p':
          this.performAction('parity');
          break;
        case 'g':
          this.performAction('gray');
          break;
      }
    }

    // General controls
    switch (e.key) {
      case '=':
        this.performAction('equals');
        break;
      case 'c':
      case 'C':
        this.performAction('all-clear');
        break;
      case 'Delete':
        this.performAction('clear-entry');
        break;
      case 'Backspace':
        this.performAction('backspace');
        break;
      case 't':
      case 'T':
        this.switchMode(this.currentMode === 'basic' ? 'advanced' : 'basic');
        break;
      case '?':
        this.performAction('toggle-keyboard-hints');
        break;
    }
  }

  toggleKeyboardHints() {
    document.body.classList.toggle('show-keyboard-hints');
  }

  animateKeyPress(key) {
    // Map special keys to their data-key values
    const keyMap = {
      'C': 'c',
      'T': 't',
      'Delete': 'Del',
    };

    const mappedKey = keyMap[key] || key;

    // Find button with matching data-key attribute
    const button = document.querySelector(`[data-key="${mappedKey}"]`);

    if (button) {
      button.classList.add('key-pressed');
      setTimeout(() => {
        button.classList.remove('key-pressed');
      }, 150);
    }
  }

  isCalculatorKey(key) {
    const calculatorKeys = [
      '0', '1', '.', '+', '-', '*', '/', '=', 'Backspace', 'Delete', '?',
      'c', 'C', 't', 'T', // Clear and Toggle
      'm', 'M', 'l', 'r', // Memory
      'a', 'o', 'x', 'n', '<', '>', ',', ';', '!', '@', 's', 'f', 'p', 'g' // Advanced
    ];
    return calculatorKeys.includes(key);
  }

  loadMode() {
    const savedMode = localStorage.getItem('calculator-mode');
    return savedMode === 'advanced' ? 'advanced' : 'basic';
  }

  saveMode(mode) {
    localStorage.setItem('calculator-mode', mode);
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const calculator = new BinaryCalculator();
  window.calculator = calculator; // For debugging
});

const toggleHintBtn = document.getElementById('toggleHint');
let hintEnabled = true;

// Function to update the button text dynamically
function updateHintButton() {
    toggleHintBtn.textContent = `Keyboard Hint: ${hintEnabled ? 'ON' : 'OFF'}`;
}

// Toggle hint state when button is clicked
toggleHintBtn.addEventListener('click', () => {
    hintEnabled = !hintEnabled;
    updateHintButton();
});

// Keyboard shortcut for 't'
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 't') {
        hintEnabled = !hintEnabled;
        updateHintButton();
    }
});

// Optional: dynamically update tooltip
toggleHintBtn.title = "Press 't' to toggle keyboard hints (works in Basic and Advanced)";

// Mode switching logic for UI clarity
const basicBtn = document.getElementById('basicMode');
const advancedBtn = document.getElementById('advancedMode');

function setMode(mode) {
    if (mode === 'Basic') {
        basicBtn.classList.add('active');
        advancedBtn.classList.remove('active');
    } else {
        advancedBtn.classList.add('active');
        basicBtn.classList.remove('active');
    }
}

// Event listeners for mode buttons
basicBtn.addEventListener('click', () => setMode('Basic'));
advancedBtn.addEventListener('click', () => setMode('Advanced'));

// Initial state
updateHintButton();
setMode('Basic');


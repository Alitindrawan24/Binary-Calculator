// Binary Calculator - Pure Calculation Functions
// No UI logic, only mathematical operations

export class BinaryCalculations {
  // ============================================
  // Conversion Functions
  // ============================================

  static binaryToDecimal(binary) {
    if (!binary || binary === '0') return 0;

    // Check if binary contains fractional part
    if (binary.includes('.')) {
      const parts = binary.split('.');
      const integralPart = parts[0] || '0';
      const fractionalPart = parts[1] || '';

      // Convert integral part
      const integralValue = parseInt(integralPart, 2) || 0;

      // Convert fractional part
      let fractionalValue = 0;
      for (let i = 0; i < fractionalPart.length; i++) {
        if (fractionalPart[i] === '1') {
          fractionalValue += Math.pow(2, -(i + 1));
        }
      }

      return integralValue + fractionalValue;
    }

    return parseInt(binary, 2) || 0;
  }

  static decimalToBinary(decimal) {
    if (decimal === 0) return '0';

    const absDecimal = Math.abs(decimal);

    // Separate integral and fractional parts
    const integralPart = Math.floor(absDecimal);
    const fractionalPart = absDecimal - integralPart;

    // Convert integral part
    let binaryIntegral = integralPart === 0 ? '0' : integralPart.toString(2);

    // Convert fractional part (if exists)
    if (fractionalPart > 0) {
      let binaryFractional = '';
      let fraction = fractionalPart;
      let precision = 10; // Limit to 10 fractional bits

      while (precision-- > 0 && fraction > 0) {
        fraction *= 2;
        const bit = Math.floor(fraction);
        binaryFractional += bit.toString();
        fraction -= bit;
      }

      // Remove trailing zeros
      binaryFractional = binaryFractional.replace(/0+$/, '');

      if (binaryFractional.length > 0) {
        return binaryIntegral + '.' + binaryFractional;
      }
    }

    return binaryIntegral;
  }

  static decimalToHex(decimal) {
    if (decimal === 0) return '0';
    const absDecimal = Math.abs(Math.floor(decimal));
    return absDecimal.toString(16).toUpperCase();
  }

  static decimalToOctal(decimal) {
    if (decimal === 0) return '0';
    const absDecimal = Math.abs(Math.floor(decimal));
    return absDecimal.toString(8);
  }

  // ============================================
  // Basic Arithmetic Operations
  // ============================================

  static add(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    return decimal1 + decimal2;
  }

  static subtract(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    return decimal1 - decimal2;
  }

  static multiply(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    return decimal1 * decimal2;
  }

  static divide(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);

    if (decimal2 === 0) {
      throw new Error('Division durch Null');
    }

    return Math.floor(decimal1 / decimal2);
  }

  // ============================================
  // Bitwise Operations
  // ============================================

  static bitwiseAnd(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    return decimal1 & decimal2;
  }

  static bitwiseOr(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    return decimal1 | decimal2;
  }

  static bitwiseXor(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    return decimal1 ^ decimal2;
  }

  static bitwiseNot(value) {
    const decimal = this.binaryToDecimal(value);
    // Use 32-bit mask for bitwise NOT
    return ~decimal & 0xffffffff;
  }

  // ============================================
  // Shift Operations
  // ============================================

  static shiftLeft(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    // Limit shift to prevent overflow
    return decimal1 << (decimal2 % 32);
  }

  static shiftRight(a, b) {
    const decimal1 = this.binaryToDecimal(a);
    const decimal2 = this.binaryToDecimal(b);
    // Limit shift to prevent overflow
    return decimal1 >> (decimal2 % 32);
  }

  static rotateLeft(value) {
    const decimal = this.binaryToDecimal(value);
    // Rotate left by 1 bit in 32-bit space
    return ((decimal << 1) | (decimal >>> 31)) >>> 0;
  }

  static rotateRight(value) {
    const decimal = this.binaryToDecimal(value);
    // Rotate right by 1 bit in 32-bit space
    return ((decimal >>> 1) | (decimal << 31)) >>> 0;
  }

  // ============================================
  // Complement Operations
  // ============================================

  static onesComplement(value) {
    const decimal = this.binaryToDecimal(value);
    // Use 32-bit mask for ones complement
    return ~decimal & 0xffffffff;
  }

  static twosComplement(value) {
    const decimal = this.binaryToDecimal(value);
    // Calculate two's complement with 32-bit mask
    return (~decimal + 1) & 0xffffffff;
  }

  // ============================================
  // Advanced Mathematical Operations
  // ============================================

  static square(value) {
    const decimal = this.binaryToDecimal(value);
    const result = decimal * decimal;
    // Limit result to prevent overflow
    return result > 0xffffffff ? result & 0xffffffff : result;
  }

  static factorial(value) {
    const decimal = this.binaryToDecimal(value);

    if (decimal < 0 || decimal > 20) {
      throw new Error('Factorial only allowed for 0-20');
    }

    let result = 1;
    for (let i = 2; i <= decimal; i++) {
      result *= i;
    }

    return result;
  }

  static parity(value) {
    const binary = value.toString();
    const ones = binary.split('1').length - 1;
    return ones % 2;
  }

  // ============================================
  // Special Conversions
  // ============================================

  static binaryToGray(binary) {
    if (!binary || binary === '0') return '0';

    let gray = binary[0];
    for (let i = 1; i < binary.length; i++) {
      // XOR current bit with previous bit
      gray += (parseInt(binary[i - 1]) ^ parseInt(binary[i])).toString();
    }

    return gray;
  }

  // ============================================
  // Validation
  // ============================================

  static isValidBinary(str) {
    return /^[01]+$/.test(str);
  }

  static sanitizeBinary(str) {
    // Remove any non-binary characters
    return str.replace(/[^01]/g, '');
  }
}

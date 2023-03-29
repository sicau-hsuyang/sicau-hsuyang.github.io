class Color {
  /**
   * 将16进制的rgb颜色转rgb颜色
   * @param {string} color
   */
  hexToRgb(color) {
    if (!isValidHexColor(color)) {
      return color;
    }
    const digit =
      color.length === 4
        ? this.extractSimpleHex(color)
        : this.extractNormalHex(color);
    return "rgb(" + digit.join(",") + ")";
  }

  /**
   * 将rgb颜色转16进制的颜色
   * @param {string} color 待转换颜色值
   */
  rgbToHex(color) {
    // 非合法色值，直接返回
    if (!this.isValidRgbColor(color)) {
      return color;
    }
    const digits = color
      .replace(/rgb\(/i, "")
      .replace(/\)/, "")
      .split(",")
      .map((v) => +v);
    const hexDigits = digits.map((num) => {
      return num.toString("16").padStart(2, 0);
    });
    // 需要化简颜色R G B 6位都一样的情况
    const isSimpleColor = hexDigits.every((hex) => {
      return hex.length === 2 && hex[0] === hex[1];
    });
    return (
      "#" +
      hexDigits
        .map((hex) => {
          return isSimpleColor ? hex[0] : hex;
        })
        .join("")
    );
  }

  /**
   * 校验颜色值是否合法
   * @param {string} color 待校验的颜色值
   * @returns
   */
  isValidRgbColor(color) {
    /**
     * TODO:
     * 
     * rgb(34, 12, 64, 0.6);
color: rgba(34, 12, 64, 0.6);
color: rgb(34 12 64 / 0.6);
color: rgba(34 12 64 / 0.3);
color: rgb(34.0 12 64 / 60%);
color: rgba(34.6 12 64 / 30%);
     */
    color = color.toLowerCase();
    const isValidFormat =
      /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/i.test(
        color.toLowerCase()
      );
    if (!isValidFormat) {
      return false;
    }
    return color
      .replace(/rgb\(/i, "")
      .replace(/\)/, "")
      .split(",")
      .every((v) => {
        const num = Number.parseInt(v);
        return num >= 0 && num <= 255;
      });
  }

  /**
   * 校验是否是正确的hex颜色值
   * @param {string} color 待校验的颜色
   */
  isValidHexColor(color) {
    if (color && color[0] != "#") {
      return false;
    }
    if (color.length !== 4 && color.length !== 7) {
      return false;
    }
    // 4位的hex颜色
    else if (color.length === 4) {
      const invalid = this.extractSimpleHex(color).some((num) => {
        return Number.isNaN(num);
      });
      return !invalid;
    }
    // 7位的hex颜色
    else if (color.length === 7) {
      let digits = this.extractNormalHex(color);
      const invalid = digits.some((v) => Number.isNaN(v));
      return !invalid;
    }
  }

  /**
   * 抽取4位数的hex color
   * @param {string} color
   * @returns
   */
  extractSimpleHex(color) {
    return color
      .slice(1)
      .split("")
      .map((v) => Number.parseInt(v, 16));
  }

  /**
   * 抽取7位数的hex color
   * @param {string} color
   * @returns
   */
  extractNormalHex(color) {
    let digits = [];
    for (let i = 1; i < color.length; i += 2) {
      digits.push(Number.parseInt(color.slice(i, i + 2), 16));
    }
    return digits;
  }
}

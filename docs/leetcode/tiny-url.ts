export class TinyURL {
  current = 1;

  urlToHashCode: Map<string, string> = new Map();

  hashCodeToUrl: Map<string, string> = new Map();

  getFactor(x: number): number {
    return 1000 * x + 10000000000;
  }

  getShortLinkCode(num: number): string {
    let result = "";
    // 我的字符映射码没有乱序，实际项目中一定要乱序，并且一定要存下来
    const charMap =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // 仅仅只需要将原来的26进制转化为62进制即可
    while (num >= 62) {
      const digit = (num - 1) % 62;
      const alphabet = charMap[digit];
      result = alphabet + result;
      num = Math.floor((num - 1) / 62);
    }
    // 处理最后一位数
    result = charMap[num - 1] + result;
    return result;
  }

  /**
   * Encodes a URL to a shortened URL.
   */
  encode(longUrl: string): string {
    let hashCode = this.urlToHashCode.get(longUrl) || null;
    if (!hashCode) {
      const factor = this.getFactor(this.current++);
      const code = this.getShortLinkCode(factor);
      this.urlToHashCode.set(longUrl, code);
      this.hashCodeToUrl.set(code, longUrl);
      hashCode = code
    }
    return "http://tinyurl.com/" + hashCode;
  }

  /**
   * Decodes a shortened URL to its original URL.
   */
  decode(shortUrl: string): string {
    const hashCode = shortUrl.replace("http://tinyurl.com/", "");
    return this.hashCodeToUrl.get(hashCode);
  }
}

const tinyURL = new TinyURL();

export const encode = tinyURL.encode.bind(tinyURL)

export const decode = tinyURL.decode.bind(tinyURL)

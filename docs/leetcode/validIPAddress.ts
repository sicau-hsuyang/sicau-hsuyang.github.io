function validIPv4(ip: string): boolean {
  const partial: string[] = ip.split(".");
  return (
    partial.length === 4 &&
    partial.every((sub) => {
      // 空，或者含有前导0
      if (sub === "" || /[a-zA-Z]+/.test(sub) || /^0\d+/.test(sub)) {
        return false;
      }
      const num = Number.parseInt(sub);
      return num >= 0 && num <= 255;
    })
  );
}

function validIPv6(ip: string) {
  const partial: string[] = ip.split(":");
  return (
    partial.length === 8 &&
    partial.every((sub) => {
      return /^[a-fA-F0-9]{1,4}$/.test(sub);
    })
  );
}

export function validIPAddress(ip: string) {
  if (validIPv4(ip)) {
    return "IPv4";
  }
  if (validIPv6(ip)) {
    return "IPv6";
  }
  return "Neither";
}

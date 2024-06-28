import { validIPAddress } from "./validIPAddress";

describe("validIpAddress", () => {
  it("case 1", () => {
    const ip = "2001:0db8:85a3:00000:0:8A2E:0370:7334";
    const r = validIPAddress(ip);
    console.log(r);
  });
});

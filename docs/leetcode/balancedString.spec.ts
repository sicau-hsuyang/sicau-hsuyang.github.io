import { balancedString } from './balancedString'


describe("balancedString", () => {
  it("case 1", () => {
    const s = "QQWE"
    balancedString(s);
  })

  it("case 2", () => {
    const s = 'QQRRWEWERWQWEWEW';
    balancedString(s);
  })
})
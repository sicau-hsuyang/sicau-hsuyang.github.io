import { subdomainVisits } from "./subdomainVisits";

describe("subdomainVisits", () => {
  it("case 1", () => {
    const cpdomains = [
      "900 google.mail.com",
      "50 yahoo.com",
      "1 intel.mail.com",
      "5 wiki.org",
    ];
    subdomainVisits(cpdomains);
  });
});

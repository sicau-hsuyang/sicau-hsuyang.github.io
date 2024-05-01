import { entityParser } from "./entityParser";

describe("entityParser", () => {
  it("case 1", () => {
    const text = "&amp; is an HTML entity but &ambassador; is not.";
    entityParser(text);
  });

  it("case 2", () => {
    const text = "and I quote: &quot;...&quot;";
    entityParser(text);
  });

  it("case 3", () => {
    const text = "Stay home! Practice on Leetcode :)";
    entityParser(text);
  });

  it("case 4", () => {
    const text = "x &gt; y &amp;&amp; x &lt; y is always false";
    entityParser(text);
  });

  it("case 5", () => {
    const text = "&&gt;";
    entityParser(text);
  });
});

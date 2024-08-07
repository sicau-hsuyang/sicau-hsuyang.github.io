import { removeComments } from "./removeComments";

describe("removeComments", () => {
  it("case 1", () => {
    const source = [
      "/*Test program */",
      "int main()",
      "{ ",
      "  // variable declaration ",
      "int a, b, c;",
      "/* This is a test",
      "   multiline  ",
      "   comment for ",
      "   testing */",
      "a = b + c;",
      "}",
    ];
    const res = removeComments(source);
    console.log(res);
  });

  it("case 2", () => {
    const source = ["a/*comment", "line", "more_comment*/b"];
    const res = removeComments(source);
    console.log(res);
  });

  it("case 3", () => {
    const source = [
      "main() {",
      "/* here is commments",
      "  // still comments */",
      "   double s = 33;",
      "   cout << s;",
      "}",
    ];
    const res = removeComments(source);
    console.log(res);
  });

  it("case 4", () => {
    const source = [
      "main() {",
      "  Node* p;",
      "  /* declare a Node",
      "  /*float f = 2.0",
      "   p->val = f;",
      "   /**/",
      "   p->val = 1;",
      "   //*/ cout << success;*/",
      "}",
      " ",
    ];
    const res = removeComments(source);
    console.log(res);

    /**
    
    ["main() {","  Node* p;","  ","   p->val = 1;","   ","}"," "]

     */
  });
});

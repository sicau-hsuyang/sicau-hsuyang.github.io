import { TextEditor } from "./TextEditor";

describe("TextEditor", () => {
  const editor = new TextEditor();

  it("case 1", () => {
    const actions = [
      "TextEditor",
      "addText",
      "deleteText",
      "addText",
      "cursorRight",
      "cursorLeft",
      "deleteText",
      "cursorLeft",
      "cursorRight",
    ];
    const args = [
      [],
      ["leetcode"],
      [4],
      ["practice"],
      [3],
      [8],
      [10],
      [2],
      [6],
    ];
    for (let i = 1; i < actions.length; i++) {
      const action = actions[i];
      const arg = args[i];
      const val = editor[action].apply(editor, arg);
      // editor.printText();
      if (val) {
        console.log(val);
      }
    }
  });
});

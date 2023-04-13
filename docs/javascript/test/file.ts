// myModule.ts
import * as fs from "fs";

function readFile(filename: string): string {
  return fs.readFileSync(filename, "utf8");
}

export { readFile };

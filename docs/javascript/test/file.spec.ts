import * as fs from 'fs';
import { readFile } from './file';

jest.mock('fs');

describe('readFile', () => {
  it('reads the contents of a file', () => {
    const mockFileContents = 'Hello, world!';
    (fs.readFileSync as jest.Mock).mockReturnValueOnce(mockFileContents);

    const contents = readFile('test.txt');
    expect(contents).toBe(mockFileContents);
    expect(fs.readFileSync).toHaveBeenCalledWith('test.txt', 'utf8');
  });
});

export function reverseMessage(message: string): string {
  const wordArray: string[] = message.trim().split(/\s+/).reverse().join(' ');
}

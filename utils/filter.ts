import { badWords } from "./badwords";

const flatBadWords = Object.values(badWords).flat().map(word => word.toLowerCase());

export function containsBadWord(text: string): boolean {
  const lowered = text.toLowerCase();
  return flatBadWords.some(badWord => lowered.includes(badWord));
}

export function normalizeText(str: string) {
  return str.split(/-|_/).map(toCapitalize).join(" ");
}

export function toCapitalize(word: string) {
  const [firstLetter, ...rest] = word;
  return firstLetter?.toUpperCase() + rest.join("");
}

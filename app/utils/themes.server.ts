export async function fetchThemes() {
  const URL =
    "https://raw.githubusercontent.com/anuraghazra/github-readme-stats/master/themes/index.js";

  const themesRes = await fetch(URL);

  const data = await themesRes.text();
  const themes = JSON.parse(parseThemes(data));

  return themes;
}

function parseThemes(text: string) {
  text = text.replace(/const themes = /, "return ").replace(/module\.exports = themes;/, "");

  // eslint-disable-next-line no-new-func
  const d = new Function(text)();

  return JSON.stringify(d);
}

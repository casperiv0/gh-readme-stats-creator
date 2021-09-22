import type { NextApiRequest, NextApiResponse } from "next";

const URL =
  "https://raw.githubusercontent.com/anuraghazra/github-readme-stats/master/themes/index.js";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const themesRes = await fetch(URL);

  const data = await themesRes.text();
  const themes = JSON.parse(parseThemes(data));

  return res.json({ themes });
}

function parseThemes(text: string) {
  text = text.replace(/const themes = /, "return ").replace(/module\.exports = themes;/, "");

  // eslint-disable-next-line no-new-func
  const d = new Function(text)();

  return JSON.stringify(d);
}

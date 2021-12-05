import type { Values } from "~/types/Values";

export const GITHUB_URL = "https://github-readme-stats.vercel.app/api";

const urlParams: Record<keyof Values, string> = {
  "count-private-contributions": "count_private",
  "custom-title": "custom_title",
  animations: "disable_animations",
  "github-username": "username",
  "hide-rank": "hide_rank",
  "hide-title": "hide_title",
  "include-all-commits": "include_all_commits",
  "line-height": "line_height",
  "show-icons": "show_icons",
  theme: "theme",
  "colors.bg_color": "bg_color",
  "colors.border_color": "border_color",
  "colors.icon_color": "icon_color",
  "colors.text_color": "text_color",
  "colors.title_color": "title_color",
  "custom-host-url": "",
};

export function generateBadgeUrl(data: Values) {
  const searchParams = new URLSearchParams();
  const url = data["custom-host-url"] || GITHUB_URL;

  for (const key in data) {
    let value = data[key];
    if (value && urlParams[key]) {
      if (typeof value === "string" && value.startsWith("#")) {
        value = value.replace("#", "");
      }
      searchParams.append(urlParams[key], value);
    }
  }

  return `${url}?${searchParams.toString()}`;
}

export function parseValues(data: URLSearchParams): Values {
  const numberKeys: (keyof Values)[] = ["line-height"];
  const booleanKeys: (keyof Values)[] = [
    "show-icons",
    "animations",
    "count-private-contributions",
    "include-all-commits",
    "hide-rank",
    "hide-title",
  ];
  const stringKeys: (keyof Values)[] = ["github-username", "theme", "custom-title"];

  const obj = {};

  numberKeys.map((key) => {
    const v = data.get(key);
    if (v) {
      obj[key] = parseInt(v);
    }
  });

  booleanKeys.map((key) => {
    const v = data.get(key);
    if (v === "") {
      if (key === "animations") {
        obj[key] = false;
      } else {
        obj[key] = true;
      }
    }
  });

  stringKeys.map((key) => {
    const v = data.get(key);
    if (v) {
      obj[key] = v;
    }
  });

  return obj as Values;
}

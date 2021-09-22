import type { Values } from "types/Values";

// todo: allow providing custom URL
const GITHUB_URL = "https://github-readme-stats.vercel.app/api";

const urlParams: Record<keyof Values, string> = {
  "count-private-contributions": "count_private",
  "custom-title": "custom_title",
  "disable-animations": "disable_animations",
  "github-username": "username",
  "hide-rank": "hide_rank",
  "hide-title": "hide_title",
  "include-all-commits": "include_all_commits",
  "line-height": "line_height",
  "show-icons": "show_icons",
  theme: "theme",
};

export function generateBadgeUrl(data: Values) {
  const searchParams = new URLSearchParams();

  for (const key in data) {
    if (data[key]) {
      searchParams.append(urlParams[key], data[key]);
    }
  }

  return `${GITHUB_URL}?${searchParams.toString()}`;
}

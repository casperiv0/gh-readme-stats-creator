export type Themes = Record<string, Theme>;

export interface Theme {
  title_color: string;
  icon_color: string;
  text_color: string;
  bg_color: string;
  border_color?: string;
}

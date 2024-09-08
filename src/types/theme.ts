export interface themeType {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
}

export type allThemesType = Record<string, themeType>;
export type themeStateType = {
  current_theme: string;
  all_themes: allThemesType;
};

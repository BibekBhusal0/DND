import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const useCurrentTheme = () => {
  const { current_theme, all_themes } = useSelector(
    (state: RootState) => state.theme
  );
  const colors = all_themes[current_theme];
  return colors;
};

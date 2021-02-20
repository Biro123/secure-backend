import { theme } from '@material-ui/core';
import { lightSoothingTheme, darkSoothingTheme } from './soothing';

const themes = [ lightSoothingTheme, darkSoothingTheme ];

export function getThemeByName(themeName) {
  return themes.find((theme) => theme.palette.type === themeName);
}

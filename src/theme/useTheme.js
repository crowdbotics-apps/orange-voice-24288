import {useContext} from 'react';
import {CustomThemeContext} from './ThemeContext';

export const useCustomTheme = () => {
  const {setColors, colors} = useContext(CustomThemeContext);

  return {setColors, colors};
};

export default useCustomTheme;

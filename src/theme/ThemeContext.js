import {Colors} from './color';
import React, {useMemo, useState} from 'react';

export const CustomThemeContext = React.createContext({
  colors: Colors,
  setColors: (colors) => {},
});

const ThemeContextProvider = ({children}) => {
  const [colors, setColors] = useState(Colors);
  const value = useMemo(() => ({colors, setColors}), [colors]);

  return (
    <CustomThemeContext.Provider value={value}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export default ThemeContextProvider;

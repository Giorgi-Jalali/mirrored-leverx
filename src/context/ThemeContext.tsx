import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { DARK, DARK_THEME, LIGHT, LIGHT_THEME } from '../constants/constants';

type TTheme = string;

interface ThemeContextProps {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getDefaultTheme = (): TTheme => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  };

  const [theme, setTheme] = useState<TTheme>(getDefaultTheme);

  useEffect(() => {
    document.documentElement.classList.remove(theme === LIGHT ? DARK_THEME : LIGHT_THEME);
    document.documentElement.classList.add(theme === LIGHT ? LIGHT_THEME : DARK_THEME);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === LIGHT ? DARK : LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";

// Define your theme names as constants to avoid typos
const LIGHT_THEME = "localchefbazaar";
const DARK_THEME = "localchefbazaar-dark";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return DARK_THEME;
      }
    }
    return LIGHT_THEME;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
  };

  const isDark = theme === DARK_THEME;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

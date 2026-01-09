import { use } from "react";

import { ThemeContext } from "../providers/ThemeProvider";

const useTheme = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default useTheme;

import { FiSun, FiMoon } from "react-icons/fi";

import useTheme from "../../hooks/useTheme";

const ThemeToggle = ({ className = "" }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <label
      className={`swap swap-rotate ${className}`}
      aria-label="Toggle Theme"
    >
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={isDark}
        className="theme-controller"
      />

      <FiSun className="swap-off h-5 w-5 text-primary" strokeWidth={2} />

      <FiMoon className="swap-on h-5 w-5 text-accent" strokeWidth={2} />
    </label>
  );
};

export default ThemeToggle;

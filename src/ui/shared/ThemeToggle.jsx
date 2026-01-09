import { FiSun, FiMoon } from "react-icons/fi";

import useTheme from "../../hooks/useTheme";

const ThemeToggle = ({ className = "" }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <label
      className={`swap swap-rotate btn bg-transparent btn-circle border-3 border-transparent ${
        isDark ? "hover:border-accent" : "hover:border-primary"
      } transition-colors duration-150 ease-in-out ${className}`}
      aria-label="Toggle Theme"
    >
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={isDark}
        className="theme-controller"
      />

      <FiSun className="swap-off h-7 w-7 text-primary" strokeWidth={2} />

      <FiMoon className="swap-on h-7 w-7 text-accent" strokeWidth={2} />
    </label>
  );
};

export default ThemeToggle;

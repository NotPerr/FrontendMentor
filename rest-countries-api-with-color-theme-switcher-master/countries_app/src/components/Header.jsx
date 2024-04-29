import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("color-theme", newMode ? "dark" : "light");
  };
  return (
    <nav className="flex justify-between w-full py-5 px-3 dark:bg-darkCardBg">
      <div>
        <p className="font-bold">Where in the world?</p>
      </div>
      <div>
        <button id="theme-toggle" type="button" onClick={toggleTheme}>
          <div className="flex items-center">
            {darkMode ? (
              <FontAwesomeIcon icon={faSun} className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className="mr-2" />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </div>
        </button>
      </div>
    </nav>
  );
}

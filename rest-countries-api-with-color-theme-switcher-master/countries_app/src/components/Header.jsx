import { useState } from "react";

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
    <>
      <h1 className="text-2xl font-bold underline ">Where in the world?</h1>
      <button id="theme-toggle" type="button" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </>
  );
}

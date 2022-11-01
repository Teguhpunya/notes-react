import { ThemeConsumer } from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button onClick={toggleTheme}>
            {theme === "dark" ? <FaMoon /> : <FaSun />}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;

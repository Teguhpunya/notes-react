import React, { useContext } from "react";
import LangContext, { LangConsumer } from "../contexts/LangContext";

const ToggleLang = () => {
  return (
    <LangConsumer>
      {({ lang, toggleLang }) => {
        return (
          <button onClick={toggleLang}>{lang === "en-US" ? "🇺🇸" : "🇮🇩"}</button>
        );
      }}
    </LangConsumer>
  );
};

export default ToggleLang;

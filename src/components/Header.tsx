import React from "react";
import { Link } from "react-router-dom";
import { LangConsumer } from "../contexts/LangContext";
import ToggleLang from "./ToggleLang";
import ToggleTheme from "./ToggleTheme";

type Props = {
  title: String;
};

const Header = (props: Props) => {
  const home = "/notes-react";
  return (
    <LangConsumer>
      {({ langData }) => {
        return (
          <header>
            <Link to={`${home}`}>
              <h1>{props.title}</h1>
            </Link>
            <div>
              <Link to={`${home}/archive`}>
                <button>{`${langData.header.archive}`}</button>
              </Link>
              <ToggleTheme />
              <ToggleLang />
            </div>
          </header>
        );
      }}
    </LangConsumer>
  );
};

export default Header;

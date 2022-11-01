import React from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";

type Props = {
  title: String;
};

const Header = (props: Props) => {
  const home = "/notes-react";
  return (
    <header>
      <Link to={`${home}`}>
        <h1>{props.title}</h1>
      </Link>
      <div>
        <Link to={`${home}/archive`}>
          <h1>🗃️ Archive</h1>
        </Link>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;

import React from "react";

type Props = {
  title: String;
};

const Header = (props: Props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
};

export default Header;

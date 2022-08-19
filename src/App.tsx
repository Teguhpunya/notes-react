import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./styles/style.css";

const titleApp = "Yet another notes";

function App() {
  return (
    <div className="App">
      <Header title={titleApp} />
      <Main />
    </div>
  );
}

export default App;

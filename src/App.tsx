import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import "./styles/style.css";

const titleApp = "Yet another notes";

function App() {
  return (
    <div className="App">
      <Header title={titleApp} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

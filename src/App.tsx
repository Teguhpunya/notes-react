import React from "react";
import AppRoutes from "./components/AppRoutes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewNoteButton from "./components/NewNoteButton";
import "./styles/style.css";

const titleApp = "📓 Yet another notes";

function App() {
  return (
    <>
      <Header title={titleApp} />
      <AppRoutes />
      <NewNoteButton />
      <Footer />
    </>
  );
}

export default App;

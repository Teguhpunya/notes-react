import React, { useState } from "react";
import {
  getAccessToken,
  getUserLogged,
  putAccessToken,
} from "./utils/network-data";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewNoteButton from "./components/NewNoteButton";
import "./styles/style.css";
import LoginRoutes from "./routes/LoginRoutes";
import { useEffect } from "react";

const titleApp = "📓 Yet another notes";

function App() {
  const [authedUser, setAuthedUser] = useState(getAccessToken());
  const [initializing, setInitializing] = useState(true);

  // Fetch user data using token
  useEffect(() => {
    async function getToken() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    getToken();
  }, []);

  /* Functions */
  async function onLoginSuccess({ accessToken }: { accessToken: string }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken("");
  }

  /* Main */
  // if (initializing) {
  //   return null;
  // }

  if (authedUser === null) {
    return (
      <>
        <Header title={titleApp} />
        <LoginRoutes loginSuccess={onLoginSuccess} />
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header title={titleApp} />
      <button className="container-base" onClick={onLogout}>
        Logout
      </button>
      <AppRoutes />
      <NewNoteButton />
      <Footer />
    </>
  );
}

export default App;

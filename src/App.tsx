import React, { Component, useState } from "react";
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
import { ThemeProvider } from "./contexts/ThemeContext";

const titleApp = "📓 Yet another notes";

function CoreApp() {
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

type State = {
  theme: string;
  toggleTheme: Function;
};

class App extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "dark" ? "light" : "dark";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };
  }

  componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }
  componentDidUpdate(prevProps: any, prevState: State) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <CoreApp />
      </ThemeProvider>
    );
  }
}

export default App;

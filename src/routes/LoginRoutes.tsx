import { Route, Routes } from "react-router-dom";
import "../styles/login.css";

import LoginPage from "../pages/LoginPage";
import MissingPage from "../pages/MissingPage";
import RegisterPage from "../pages/RegisterPage";

type Prop = {
  loginSuccess: Function;
};

export default function LoginRoutes({ loginSuccess }: Prop) {
  const home = "/notes-react";

  return (
    <main>
      <Routes>
        <Route
          path={`${home}`}
          element={<LoginPage loginSuccess={loginSuccess} />}
        />
        <Route path={`${home}/register`} element={<RegisterPage />} />
        <Route path={`${home}/*`} element={<MissingPage />} />
        <Route path={`/*`} element={<MissingPage />} />
      </Routes>
    </main>
  );
}

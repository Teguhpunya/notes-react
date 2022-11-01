import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
// import PropTypes from "prop-types";
import { login } from "../utils/network-data";

type Props = {
  loginSuccess: Function;
};

type User = { email: string; password: string };

const LoginPage = ({ loginSuccess }: Props) => {
  /* Functions */
  async function onLogin({ email, password }: User) {
    const { error, data } = await login({ email, password });

    if (!error) {
      alert("Login berhasil!");
      loginSuccess(data);
    }
  }

  /* Main */
  return (
    <div className="container-auth">
      <h1>Login</h1>
      <LoginInput input={onLogin} />
      <p>
        Belum punya akun?{" "}
        <Link to="/notes-react/register">Daftar di sini.</Link>
      </p>
    </div>
  );
};

// LoginPage.propTypes = {};

export default LoginPage;

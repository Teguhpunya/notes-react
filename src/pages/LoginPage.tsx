import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { LangConsumer } from "../contexts/LangContext";
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
      loginSuccess(data);
    }
  }

  /* Main */
  return (
    <LangConsumer>
      {({ langData }) => {
        return (
          <div className="container-auth">
            <h1>Login</h1>
            <LoginInput input={onLogin} />
            <p>
              {langData.authentication.noAccount}
              <Link to="/notes-react/register">
                {langData.authentication.registerHere}
              </Link>
            </p>
          </div>
        );
      }}
    </LangConsumer>
  );
};

// LoginPage.propTypes = {};

export default LoginPage;

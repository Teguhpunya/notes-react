import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { LangConsumer } from "../contexts/LangContext";
import { register } from "../utils/network-data";

type User = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();

  async function onRegisterHandler(user: User) {
    const { error } = await register(user);
    if (!error) {
      navigate("/notes-react");
    }
  }

  return (
    <LangConsumer>
      {({ langData }) => {
        return (
          <div className="container-auth">
            <h1>{langData.authentication.registerSection}</h1>
            <RegisterInput register={onRegisterHandler} />
            <p>
              {langData.authentication.hasAccount}
              <Link to="/notes-react/">
                {langData.authentication.loginHere}
              </Link>
            </p>
          </div>
        );
      }}
    </LangConsumer>
  );
};

export default RegisterPage;

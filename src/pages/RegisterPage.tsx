import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
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
      alert("Berhasil daftar!");

      navigate("/notes-react");
    }
  }

  return (
    <div className="container-auth">
      <h1>Daftar</h1>
      <RegisterInput register={onRegisterHandler} />
      <p>
        Sudah punya akun? <Link to="/notes-react/">Login di sini.</Link>
      </p>
    </div>
  );
};

export default RegisterPage;

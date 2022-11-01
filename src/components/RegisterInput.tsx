import useInput from "../data/CustomHooks";
import PropTypes from "prop-types";

type Props = { register: Function };

const RegisterInput = (props: Props) => {
  const { value: name, onValueChangeHandler: onNameChange } = useInput();
  const { value: email, onValueChangeHandler: onEmailChange } = useInput();
  const { value: password, onValueChangeHandler: onPassChange } = useInput();

  function onSubmitHandler(e: { preventDefault: () => void }) {
    e.preventDefault();

    props.register({
      name: name,
      email: email,
      password: password,
    });
  }

  return (
    <form className="card" onSubmit={onSubmitHandler}>
      <label htmlFor="reg-name">Nama</label>
      <input type="text" id="reg-name" onChange={onNameChange} value={name} />
      <label htmlFor="reg-email">Email</label>
      <input
        type="email"
        id="reg-email"
        onChange={onEmailChange}
        value={email}
      />
      <label htmlFor="reg-pass">Password</label>
      <input
        type="password"
        id="reg-pass"
        onChange={onPassChange}
        value={password}
      />
      <button type="submit">Daftar</button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;

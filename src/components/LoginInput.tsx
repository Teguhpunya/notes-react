import React from "react";
import useInput from "../data/CustomHooks";

type Props = { input: Function };

const LoginInput = (props: Props) => {
  const { value: email, onValueChangeHandler: onEmailChange } = useInput();
  const { value: password, onValueChangeHandler: onPassChange } = useInput();

  function onSubmitHandler(e: { preventDefault: () => void }) {
    e.preventDefault();

    props.input({
      email: email,
      password: password,
    });
  }

  return (
    <form className="card" onSubmit={onSubmitHandler}>
      <label htmlFor="login-email">Email</label>
      <input
        type="email"
        id="login-email"
        onChange={onEmailChange}
        value={email}
      />
      <label htmlFor="login-pass">Password</label>
      <input
        type="password"
        id="login-pass"
        onChange={onPassChange}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginInput;

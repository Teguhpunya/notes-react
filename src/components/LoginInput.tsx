import React from "react";
import useInput from "../data/CustomHooks";
import LoadingSpinner from "./LoadingSpinner";

type Props = { input: Function };

const LoginInput = (props: Props) => {
  const { value: email, onValueChangeHandler: onEmailChange } = useInput();
  const { value: password, onValueChangeHandler: onPassChange } = useInput();
  const [isLoading, setIsLoading] = React.useState(false);

  function onSubmitHandler(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsLoading(true);

    props
      .input({
        email: email,
        password: password,
      })
      .then(() => setIsLoading(false));
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
      <button className="button-submit" type="submit" disabled={isLoading}>
        {isLoading ? LoadingSpinner() : "Login"}
      </button>
    </form>
  );
};

export default LoginInput;

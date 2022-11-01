import useInput from "../data/CustomHooks";
import PropTypes from "prop-types";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = { register: Function };

const ConfirmPasswd = React.forwardRef(
  (
    props: {
      mainPasswd: string;
      inputText: string;
    },
    ref: any
  ) => {
    return (
      <div ref={ref} className="char-remaining">
        Tuliskan ulang password.
      </div>
    );
  }
);

const RegisterInput = (props: Props) => {
  const { value: name, onValueChangeHandler: onNameChange } = useInput();
  const { value: email, onValueChangeHandler: onEmailChange } = useInput();
  const { value: password, onValueChangeHandler: onPassChange } = useInput();
  const { value: password2, onValueChangeHandler: onPassChange2 } = useInput();

  const [isLoading, setIsLoading] = React.useState(false);

  const refConfPasswd = React.createRef<HTMLDivElement>();

  function onSubmitHandler(e: { preventDefault: () => void }) {
    e.preventDefault();
    setIsLoading(true);

    if (password !== password2) return;
    props
      .register({
        name: name,
        email: email,
        password: password,
      })
      .then(() => setIsLoading(false));
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
      <label htmlFor="reg-pass2">Confirm password</label>
      <input
        type="password"
        id="reg-pass2"
        onChange={(e) => {
          if (refConfPasswd.current) {
            onPassChange2(e);
            if (e.target.value !== password)
              refConfPasswd.current.style.display = "block";
            else refConfPasswd.current.style.display = "none";
          }
        }}
        value={password2}
      />
      <ConfirmPasswd
        ref={refConfPasswd}
        inputText={password2}
        mainPasswd={password}
      />
      <button className="button-submit" disabled={isLoading} type="submit">
        {isLoading ? LoadingSpinner() : "Daftar"}
      </button>
    </form>
  );
};

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;

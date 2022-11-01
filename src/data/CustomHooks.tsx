import { useState } from "react";

function useInput() {
  const [value, setValue] = useState("");

  const onValueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, onValueChangeHandler };
}

export default useInput;

import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState("0");
  const [disabled, setDisabled] = useState(true);
  const onChange = (e) => {
    if (e.target.checked === true) {
      setDisabled(false);
    }
    const {
      target: { value }
    } = e;

    setValue(Boolean(value));
  };

  return { value, setValue, disabled, setDisabled, onChange };
};

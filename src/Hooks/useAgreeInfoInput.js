import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    if (e.target.checked === false) {
      setDisabled(true);
    }
    const {
      target: { checked }
    } = e;

    setValue(checked);
  };

  return { value, setValue, onChange, disabled, setDisabled };
};

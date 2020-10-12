import { useState } from "react";

export default (defaultValue) => {
  const [get, setGet] = useState("0");
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    if (e.target.checked === true) {
      setDisabled(false);
    }
    const {
      target: { value: get }
    } = e;
    setGet(get);
  };

  return { get, setGet, disabled, setDisabled, onChange };
};

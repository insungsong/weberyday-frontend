import { useState } from "react";

export default (defaultValue) => {
  const [get, setGet] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [filter, setFilter] = useState("Yes");

  const onChange = (e) => {
    if (e.target.checked === true) {
      setDisabled(false);
    }
    const {
      target: { value: get }
    } = e;
    setGet(get);
  };

  return { get, setGet, disabled, setDisabled, onChange, filter, setFilter };
};

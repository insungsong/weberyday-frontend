import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  console.log(value);
  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };
  return { value, onChange, setValue };
};

import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const [filter, setFilter] = useState("Yes");
  const onChange = (e) => {
    const {
      target: { value }
    } = e;
    setValue(value);
    setFilter("No");
  };
  return { value, onChange, setValue, filter, setFilter };
};

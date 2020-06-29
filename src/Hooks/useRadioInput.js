import { useState } from "react";

export default (defaultValue) => {
  const [get, setGet] = useState(defaultValue);
  const onChange = (e) => {
    const {
      target: { value: get }
    } = e;
    setGet(get);
  };

  return { get, setGet, onChange };
};

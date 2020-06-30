import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { checked }
    } = e;
    setValue(checked);
  };

  return { value, setValue, onChange };
};

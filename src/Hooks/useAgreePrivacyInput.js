import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    console.log(e.target.checked);
    const {
      target: { checked }
    } = e;
    setValue(checked);
    console.log(checked);
  };

  return { value, setValue, onChange };
};

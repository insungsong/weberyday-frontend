import React from "react";
import SignUpPresenter from "./SignUpPresenter";
import useInput from "../../Hooks/useInput";

export default () => {
  const emailValue = useInput("");

  return <SignUpPresenter emailValue={emailValue} />;
};

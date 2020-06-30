import React from "react";
import styled from "styled-components";

const Container = styled.input.attrs({
  type: "checkBox"
})``;

const InputCheckBox = ({
  id,
  value,
  setValue,
  onChange,
  disabled,
  checked,
  onClick
}) => {
  return (
    <Container
      id={id}
      value={value}
      setValue={setValue}
      disabled={disabled}
      onChange={onChange}
      onClick={onClick}
      checked={checked}
    />
  );
};

export default InputCheckBox;

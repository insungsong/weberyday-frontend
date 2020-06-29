import React from "react";
import styled from "styled-components";

const Container = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 1px #eef1f4;
`;

const Input = ({
  id,
  placeholder,
  focus = false,
  value,
  onChange,
  type = "text",
  style
}) => (
  <Container
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    autoFocus={focus}
    style={style}
  />
);

export default Input;

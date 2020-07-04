import React from "react";
import styled from "styled-components";

const Container = styled.input.attrs({
  type: "radio"
})`
  width: 20%;
  padding: 0;
  margin: 0;
`;

const CheckInput = ({ id, name, value, onClick, onChange, checked, style }) => {
  return (
    <Container
      id={id}
      name={name}
      value={value}
      onClick={onClick}
      onChange={onChange}
      checked={checked}
      style={style}
    />
  );
};

export default CheckInput;

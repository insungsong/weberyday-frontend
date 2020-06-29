import React from "react";
import styled from "styled-components";

const Container = styled.input.attrs({
  type: "radio"
})`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 1px #eef1f4;
`;

const CheckInput = ({ name, value, onChange }) => {
  return <Container name={name} value={value} onChange={onChange} />;
};

export default CheckInput;

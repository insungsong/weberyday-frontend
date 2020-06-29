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

const CheckInput = ({ name, value, onChange, id }) => {
  return <Container id={id} name={name} value={value} onChange={onChange} />;
};

export default CheckInput;

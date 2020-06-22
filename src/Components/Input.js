import React from "react";
import styled from "styled-components";

const Container = styled.input`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const Input = ({ placeholder }) => <Container placeholder={placeholder} />;

export default Input;

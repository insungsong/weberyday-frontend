import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 90%;
  height: 50px;
  margin-top: 18px;
  margin-bottom: 12px;
`;

const Button = ({ text }) => <Container>{text}</Container>;

export default Button;

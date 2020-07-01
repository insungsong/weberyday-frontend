import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 90%;
  height: 50px;
  margin-top: 18px;
  margin-bottom: 12px;
`;

const Button = ({ onClick, text, style }) => (
  <Container onClick={onClick} style={style}>
    {text}
  </Container>
);

export default Button;

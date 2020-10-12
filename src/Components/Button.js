import React from "react";
import styled from "styled-components";

const Container = styled.button`
  width: 90%;
  height: 50px;
  margin-top: 18px;
  margin-bottom: 12px;

  &:disabled {
    background-color: ${(props) => props.theme.greyColor};
  }
`;

const Button = ({ onClick, text, style, disabled }) => (
  <Container onClick={onClick} style={style} disabled={disabled}>
    {text}
  </Container>
);

export default Button;

import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Header from "./Header";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Container>
        <Header />
      </Container>
    </ThemeProvider>
  );
};

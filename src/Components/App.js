import React from "react";
import { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import Body from "./Body";

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
      <Container>
        <Body />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

import React, { useState } from "react";
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
`;

const BigContainer = styled.div`
  width: 100%;
  height: 100%;
  background: red;
`;

export default () => {
  const [onSearch, setOnSearch] = useState(false);
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <BigContainer
        onClick={(e) => {
          console.log(e.target.getAttribute);
          console.log(e.target);
          if (e.target.className.baseVal === "aa") {
            setOnSearch(true);
          } else {
            setOnSearch(false);
          }
        }}
      >
        <Container>
          <Header pushKey={onSearch} />
          <Body />
        </Container>
        <Footer />
      </BigContainer>
    </ThemeProvider>
  );
};

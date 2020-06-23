import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import Body from "./Body";

const BigContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default () => {
  const [searchPoint, setSearchPoint] = useState(false);
  const [MenuPoint, setMenuPoint] = useState(false);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <BigContainer
        onClick={(e) => {
          if (
            e.target.className.baseVal === "Search" ||
            e.target.id === "SearchPostBox"
          ) {
            setSearchPoint(true);
            setMenuPoint(false);
          } else if (
            e.target.className.baseVal === "Menu" ||
            e.currentTarget.id === "MenuBox"
          ) {
            setMenuPoint(true);
            setSearchPoint(false);
          } else {
            setMenuPoint(false);
            setSearchPoint(false);
          }
        }}
      >
        <Container>
          <Header MenuPoint={MenuPoint} searchPoint={searchPoint} />
          <Body />
        </Container>
        <Footer />
      </BigContainer>
    </ThemeProvider>
  );
};

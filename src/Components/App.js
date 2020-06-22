import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <h1>Hello, world!</h1>
    </ThemeProvider>
  );
};

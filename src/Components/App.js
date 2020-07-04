import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Theme from "../Styles/Theme";
import GlobalStyles from "../Styles/GlobalStyles";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const BigContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  const [searchPoint, setSearchPoint] = useState(false);
  const [menuPoint, setMenuPoint] = useState(false);

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
            menuPoint === true &&
            e.target.className.baseVal === "Menu"
          ) {
            setMenuPoint(false);
          } else if (
            e.target.className.baseVal === "Menu" ||
            e.target.id === "MenuBox" ||
            e.target.parentElement.id === "MenuBox"
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
          <BrowserRouter>
            <Header
              isLoggedIn={isLoggedIn}
              menuPoint={menuPoint}
              searchPoint={searchPoint}
            />
            <Routes />
          </BrowserRouter>
        </Container>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
        <Footer />
      </BigContainer>
    </ThemeProvider>
  );
};

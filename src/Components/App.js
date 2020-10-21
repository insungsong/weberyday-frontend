import React, { useState, useEffect } from "react";
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
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { FIND_USER_INFO } from "../Routes/User/Me/MeQuery";

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
  console.log("test");
  const {
    data: findUserInfoData,
    loading: findUserInfoLoading,
    error: findUserInfoError
  } = useQuery(FIND_USER_INFO);

  //localStorage로 부터 email정보를 얻어오는 hooks
  const [
    currentLocalStorageEmailValue,
    setCurrentLocalStorageEmailValue
  ] = useState(localStorage.getItem("userEmailToken"));

  if (
    findUserInfoData &&
    findUserInfoData.findUserInfo &&
    findUserInfoData.findUserInfo.email !== undefined &&
    findUserInfoData.findUserInfo.email !== currentLocalStorageEmailValue
  ) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");
    toast.success(
      "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
    );
    setTimeout(() => {
      window.location.reload();
    }, [1500]);
  }

  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);

  const [isLogIn, setIsLogIn] = useState("");

  useEffect(() => {
    if (isLoggedIn && isLogIn !== "") {
      toast.success("로그인 되었습니다");
    }
  }, [isLoggedIn]);

  const [searchPoint, setSearchPoint] = useState(false);
  const [menuPoint, setMenuPoint] = useState(false);

  //오른쪽 클릭 방지
  document.oncontextmenu = (e) => {
    return false;
  };

  //f12개발자모드 켜기
  document.body.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) {
      //return e.preventDefault();
    }
  });

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
          <Router>
            <Header
              isLoggedIn={isLoggedIn}
              setIsLogIn={setIsLogIn}
              menuPoint={menuPoint}
              searchPoint={searchPoint}
            />
            <Routes />
          </Router>
        </Container>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
        <Footer />
      </BigContainer>
    </ThemeProvider>
  );
};

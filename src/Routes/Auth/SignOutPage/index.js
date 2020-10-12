import React, { useState } from "react";
import styled from "styled-components";
import { SignOutIcon } from "../../../Components/Icons";
import { withRouter, Link } from "react-router-dom";

const Container = styled.div`
  height: 80vh;
`;

const SignOutTitle = styled.p`
  margin-top: 50px;
  font-size: 18px;
`;

const SignOutValue = styled.p`
  margin-top: 20px;
  font-size: 13px;
`;

const ErrorIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: 40vh;
`;

const SignOutBtnBox = styled.div`
  text-align: center;
`;

const SignOutBtn = styled.button``;

export default withRouter((props) => {
  const searchProp = props.location.search;
  const searchArr = searchProp.split("?");

  if (searchArr[1] === "success") {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");
    props.history.push("/signOutPage");
    window.location.reload();
  }

  return (
    <Container>
      <SignOutTitle>그동안 웨브리데이를 사랑해주셔서 감사합니다.</SignOutTitle>
      <SignOutValue>
        부족한 부분을 수정하여 더욱 완성도 있는 플랫폼을 제작하는 웨브리데이
        팀이 되도록 하겠습니다
      </SignOutValue>
      <ErrorIconBox>
        <SignOutIcon />
      </ErrorIconBox>
      <Link to="/">
        <SignOutBtnBox>
          <SignOutBtn
            style={{
              backgroundColor: "#4996C4",
              color: "white",
              border: "none",
              width: "25vh",
              height: "5vh"
            }}
          >
            메인으로 가기
          </SignOutBtn>
        </SignOutBtnBox>
      </Link>
    </Container>
  );
});

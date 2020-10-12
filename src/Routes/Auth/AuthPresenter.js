import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import {
  FacebookLogoImg,
  KakaoLogoImg,
  NaverLogoImg
} from "../../Components/Icons";
import Input from "../../Components/Input";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Connect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 18px 0px;
`;

const LoginKeep = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10%;
  justify-items: flex-start;
`;

const SocialLoginBoxDesign = styled.button`
  width: 270px;
  height: 50px;
  margin-top: 20px;
  border: solid 1px #bdc3c7;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Atag = styled.a``;

const Text = styled.p`
  color: white;
  font-size: 17px;
  margin: 20px 10px 10px 0;
`;

const LoginTextBox = styled.div`
  background-color: #97c4d8;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px;
`;

const LoginText = styled.p`
  font-size: 15px;
`;

const LoginBox = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  background-color: #a2cfe8;
  border: solid 1px #f7f8f9;
  width: 300px;
  height: 75vh;
  top: 80px;
  right: 32.5vh;
  border-radius: 5px;
  z-index: 200;
`;

const LoginForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextLinkBox = styled.div`
  width: 100%;
  align-items: none;
`;

const TextValueBorderLine = styled.div`
  border-bottom: 1px solid #4996c4;
  display: flex;
  width: 90%;
  margin-left: 10px;
`;

export default ({
  isLoggedIn,
  action = "logIn",
  setAction,
  onSubmit,
  email,
  password,
  style,
  userInfo,
  userCertification,
  userCertificationLoading,
  setIsLogIn
}) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  let certification = false;

  if (
    (userCertification &&
      userCertification.findUserInfo &&
      userCertification.findUserInfo.certification) !== undefined
  ) {
    certification = userCertification.findUserInfo.certification;
  }

  return (
    <LoginBox style={style}>
      {!isLoggedIn ? (
        <>
          <LoginForm id="MenuBox" onSubmit={onSubmit}>
            <Text style={{ marginBottom: "30px" }}>이메일로 로그인/가입</Text>
            <Input
              {...email}
              focus={true}
              type="email"
              placeholder="이메일을 입력해주세요"
            />
            <Input
              {...password}
              type="password"
              style={{ color: "inherit", textDecoration: "inherit" }}
              placeholder="비밀번호를 입력해주세요"
            />
            {/* <LoginKeep id="MenuBox">
              <input type="checkBox" onClick={() => setChecked(!checked)} />
              <LoginText style={{ marginLeft: 10, color: "white" }}>
                로그인 상태 유지
              </LoginText>
            </LoginKeep> */}
            <Button
              style={{ marginTop: "0px" }}
              onClick={() => {
                setValue("change");
                setIsLogIn("change");
              }}
              style={{
                border: "none",
                color: "white",
                background: "#4996c4"
              }}
              text={"이메일로 로그인 하기"}
            />
            <Connect>
              <Link
                to="/signUp"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                이메일로 회원가입
              </Link>
              <Link
                to="/findPassword"
                style={{ color: "white", textDecoration: "inherit" }}
              >
                비밀번호 찾기
              </Link>
            </Connect>
            <Text>SNS 계정으로 로그인/가입</Text>
          </LoginForm>
          <form action="http://localhost:5000/login/naver">
            <SocialLoginBoxDesign
              style={{ border: "none", background: "#00C73B" }}
            >
              <NaverLogoImg />
              <LoginText
                style={{
                  marginLeft: "15px",
                  color: "white",
                  borderRadius: "3px"
                }}
              >
                네이버 로그인
              </LoginText>
            </SocialLoginBoxDesign>
          </form>
          <form action="http://localhost:5000/login/kakao">
            <SocialLoginBoxDesign
              style={{
                border: "none",
                background: "#FFEB3B",
                borderRadius: "3px"
              }}
            >
              <KakaoLogoImg />
              <LoginText style={{ marginLeft: "15px", color: "#3C1D1F" }}>
                카카오로 로그인
              </LoginText>
            </SocialLoginBoxDesign>
          </form>
          <form action="https://875c6792d9ca.ngrok.io/auth/facebook">
            <SocialLoginBoxDesign
              style={{
                border: "none",
                background: "#2D88FF",
                borderRadius: "3px"
              }}
            >
              <FacebookLogoImg />
              <LoginText style={{ marginLeft: "15px", color: "white" }}>
                페이스북으로 로그인
              </LoginText>
            </SocialLoginBoxDesign>
          </form>
          <LoginText
            style={{ padding: "0px 30px", marginTop: "40px", color: "white" }}
          >
            고객문의가 필요하시다면,
            <Atag>[고객지원]</Atag>페이지로 로그인에 문제가 있다면,
            weberydayofficial@gmail.com으로 문의 주시기바랍니다
          </LoginText>
        </>
      ) : (
        <TextLinkBox>
          <LoginTextBox>
            <LoginText style={{ color: "white" }}>
              {localStorage.userEmailToken}님
            </LoginText>
          </LoginTextBox>
          <TextValueBorderLine>
            <Link to="/me">
              <Text>내정보</Text>
            </Link>
          </TextValueBorderLine>

          {certification ? (
            <TextValueBorderLine>
              <Link to="/myPostList">
                <Text>내작품</Text>
              </Link>
            </TextValueBorderLine>
          ) : (
            <TextValueBorderLine>
              <Link to="/certification">
                <Text>내작품</Text>
              </Link>
            </TextValueBorderLine>
          )}
          <TextValueBorderLine>
            <Link to="/mySubscriptionBucket">
              <Text>구독함</Text>
            </Link>
          </TextValueBorderLine>
          <TextValueBorderLine style={{ cursor: "pointer" }}>
            <Text
              onClick={() => {
                localStorage.removeItem("userEmailToken");
                localStorage.removeItem("token");
                toast.success("로그아웃 되었습니다 😁");
                setTimeout(() => {
                  window.location.reload();
                }, [1500]);
              }}
            >
              로그아웃
            </Text>
          </TextValueBorderLine>
        </TextLinkBox>
      )}
    </LoginBox>
  );
};

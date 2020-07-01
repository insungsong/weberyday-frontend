import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import { FacebookLogoImg, KakaoLogoImg } from "../../Components/Icons";
import Input from "../../Components/Input";
import { Link } from "react-router-dom";

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
  font-size: 20px;
  margin: 20px;
`;

const LoginText = styled.p`
  font-size: 15px;
`;

const LoginBox = styled.div`
  width: 300px;
  height: 700px;
  background-color: #ecf0f1;
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: 80px;
  right: 280px;
  border: solid 1px #f7f8f9;
  border-radius: 5px;
  padding-top: 30px;
`;

const LoginForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ({
  isLoggedIn,
  action = "logIn",
  setAction,
  onSubmit,
  email,
  password,
  style
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <LoginBox style={style}>
      {!isLoggedIn ? (
        <>
          <LoginForm id="MenuBox" onSubmit={onSubmit}>
            <Text>이메일로 로그인/가입</Text>
            <Input
              focus={true}
              type="email"
              placeholder="이메일을 입력해주세요"
              {...email}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...password}
            />
            <LoginKeep id="MenuBox">
              <input type="checkBox" onClick={() => setChecked(!checked)} />
              <LoginText style={{ marginLeft: 10 }}>로그인 상태 유지</LoginText>
            </LoginKeep>
            <Button text={"이메일로 로그인 하기"} />
            <Connect>
              <Link to="/signUp">이메일로 회원가입</Link>
              <Link to="/password">비밀번호 찾기</Link>
            </Connect>
            <Text>SNS 계정으로 로그인/가입</Text>
          </LoginForm>
          <SocialLoginBoxDesign>
            <KakaoLogoImg />
            <LoginText style={{ marginLeft: "15px" }}>
              카카오로 로그인
            </LoginText>
          </SocialLoginBoxDesign>
          <SocialLoginBoxDesign>
            <FacebookLogoImg />
            <LoginText style={{ marginLeft: "15px" }}>
              페이스북으로 로그인
            </LoginText>
          </SocialLoginBoxDesign>
          <LoginText style={{ padding: "0px 20px", marginTop: "35px" }}>
            고객문의가 필요하시다면,
            <Atag>[고객지원]</Atag>페이지로 로그인에 문제가 있다면,
            weberydayofficial@gmail.com으로 문의 주시기바랍니다
          </LoginText>
        </>
      ) : (
        <div>{localStorage.getItem("token")}</div>
      )}
    </LoginBox>
  );
};

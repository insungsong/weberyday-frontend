import React, { useState } from "react";
import styled from "styled-components";
import {
  Logo,
  Search,
  Bell,
  Menu,
  FacebookLogoImg,
  KakaoLogoImg
} from "./Icons";
import Input from "./Input";
import Button from "./Button";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #fafbfc;
  width: 80%;
  height: 120px;
`;

const NoIconBox = styled.div`
  width: 30%;
  display: flex;
  margin-left: 5%;
`;

const LoginForm = styled.form`
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

const HeaderContentUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
`;

const HeaderContentli = styled.li`
  text-align: center;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  margin-right: 10px;
`;

const IconParent = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-around;
  align-items: center;
  margin-right: 5%;
`;

const BellPlace = styled.div``;

const SearchPlace = styled.div``;

const MenuPlace = styled.div``;

const SearchPostBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  font-size: 20px;
  margin: 20px;
`;

const LoginText = styled.p`
  font-size: 15px;
`;

const MenuInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 1px #eef1f4;
`;

const Atag = styled.a``;

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

export default ({ searchPoint, menuPoint }) => {
  const [value, setValue] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <Header>
      <NoIconBox>
        <HeaderContentUl>
          <Logo />
          <HeaderContentli>랭킹</HeaderContentli>
          <HeaderContentli>작품</HeaderContentli>
        </HeaderContentUl>
      </NoIconBox>
      <IconParent>
        {searchPoint ? (
          <SearchPostBox id="SearchPostBox">
            <MenuInput
              style={{ width: "100%" }}
              id="SearchPostBox"
              focus={true}
              placeholder="🔎작품/제작팀명을 검색해주세요."
            />
          </SearchPostBox>
        ) : (
          <>
            <SearchPlace>
              <Search />
            </SearchPlace>
            {menuPoint ? (
              <>
                <LoginForm id="MenuBox">
                  <Text>이메일로 로그인/가입</Text>
                  <MenuInput focus={true} placeholder="아이디를 입력해주세요" />
                  <MenuInput placeholder="비밀번호를 입력해주세요" />
                  <LoginKeep id="MenuBox">
                    <input
                      type="checkBox"
                      onClick={() => setChecked(!checked)}
                    />
                    <LoginText style={{ marginLeft: 10 }}>
                      로그인 상태 유지
                    </LoginText>
                  </LoginKeep>
                  <Button text={"이메일로 로그인 하기"} />
                  <Connect>
                    <Atag style={{ borderBottom: "solid 1px" }}>
                      이메일로 회원가입
                    </Atag>
                    <Atag>비밀번호 찾기</Atag>
                  </Connect>
                  <Text>SNS 계정으로 로그인/가입</Text>
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
                </LoginForm>
              </>
            ) : (
              ""
            )}
            <BellPlace>
              <Bell />
            </BellPlace>
            <MenuPlace onClick={() => setValue(!value)}>
              <Menu />
            </MenuPlace>
          </>
        )}
      </IconParent>
    </Header>
  );
};

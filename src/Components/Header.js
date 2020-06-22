import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Logo, Search, Bell, Menu } from "./Icons";
import Input from "./Input";
import Button from "./Button";

const Header = styled.header`
  background-color: ${(props) => props.theme.firstColor};
  width: 80%;
  height: 120px;
`;

const HeaderValue = styled.div`
  margin: 25px 25px;
  display: flex;
  align-items: center;
`;

const HeaderContentUl = styled.ul`
  list-style: none;
  display: block;
`;

const LoginToggle = styled.div`
  width: 280px;
  height: 500px;
  background-color: #95a5a6;
  position: absolute;
  top: 80px;
  right: 220px;
`;

const HeaderContentli = styled.li`
  padding: 30px 60px;
  text-align: center;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  display: inline-block;
  margin-right: 10px;
`;

const BellPlace = styled.div`
  position: absolute;
  right: 420px;
`;

const SearchPlace = styled.div`
  position: absolute;
  right: 320px;
`;

const MenuPlace = styled.div`
  position: absolute;
  right: 220px;
`;

const LoginUserBox = styled.div`
  width: 100%;
  height: 400px;
  background-color: #95a5a6;
`;

const LoginBoxSize = styled.div`
  padding: 30px 30px;
`;

const InputSize = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
`;

const TextFlex = styled.div`
  display: flex;
`;

const TextUnderLine = styled.div`
  border-bottom: 1px solid black;
`;

const onMenu = keyframes`
    from{
        width:0px;
        height:0px;
    }
    to{
        width:280px;
        heigth:500px;
    }
`;

const offMenu = keyframes`
    from{
        width:280px;
        heigth:500px;
    }
    to{
        width:0px;
        height:0px;
    }
`;

export default () => {
  const [value, setValue] = useState(false);
  const [checked, setChecked] = useState(false);

  //처음 keyFrame의 오류를 방지하는 역할
  const [locked, setLocked] = useState(false);

  // let LoginToggle = styled.div`
  //   position: absolute;

  //   width: ${value ? "280px" : 0};
  //   height: ${value ? "500px" : 0};
  //   background-color: #95a5a6;
  //   animation-name: ${value ? onMenu : offMenu};
  //   animation-duration: 0.5s;
  //   top: 80px;
  //   right: 220px;
  // `;

  return (
    <Header>
      <HeaderValue>
        <Logo />
        <HeaderContentUl>
          <HeaderContentli>랭킹</HeaderContentli>
          <HeaderContentli>작품</HeaderContentli>
        </HeaderContentUl>
        <SearchPlace>
          <Search />
        </SearchPlace>
        <MenuPlace onClick={() => setValue(!value)}>
          <Menu />
        </MenuPlace>
        {value ? (
          <LoginToggle>
            <LoginUserBox>
              <LoginBoxSize>
                <h3>로그인</h3>
              </LoginBoxSize>
              <InputSize>
                <Input placeholder="아이디를 입력해주세요" />
              </InputSize>
              <InputSize>
                <Input placeholder="비밀번호를 입력해주세요" />
              </InputSize>
              <InputSize>
                <input
                  type="checkBox"
                  checked={checked}
                  onClick={() => setChecked(!checked)}
                />
                <h3>로그인 상태 유지</h3>
              </InputSize>
              <InputSize>
                <Button text={"이메일로 로그인 하기"} />
              </InputSize>
              <InputSize>
                <TextFlex>
                  <TextUnderLine>
                    <h4>이메일로 회원가입</h4>
                  </TextUnderLine>
                  <h4 style={{ paddingLeft: "50px" }}>비밀번호 찾기</h4>
                </TextFlex>
              </InputSize>
              <InputSize>
                <h3>
                  고객문의가 필요하시다면, [고객지원]페이지로 로그인에 문제가
                  있다면, weberydayofficial@gmail.com으로 문의 주시기바랍니다
                </h3>
              </InputSize>
            </LoginUserBox>
          </LoginToggle>
        ) : (
          ""
        )}
        <BellPlace>
          <Bell />
        </BellPlace>
      </HeaderValue>
    </Header>
  );
};

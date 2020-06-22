import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Header = styled.header`
  background-color: ${(props) => props.theme.firstColor};
  width: 80%;
  height: 120px;
  display: flex;
  justify-content: space-between;
`;

const FirstBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const Title = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Setli = styled.li`
  font-size: 1.5em;
`;

const SecondBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
`;

const on = keyframes`
   from {
      width: 0px;
      height: 0px;
      display:none;
    }
    to {
      width: 280px;
      height: 500px;
      display:inline;
    }
`;
const off = keyframes`
   from {
      width: 280px;
      height: 500px;
      display:inline;
    }
    to {
      width: 0;
      height: 0;
      display:none;
    }
`;

export default () => {
  const [value, setValue] = useState(false);
  const [too, setToo] = useState(false);
  let width = "280px";
  let height = "500px";

  let ToggleLogin = styled.div`
    position: absolute;
    width: ${value ? width : 0};
    height: ${value ? height : 0};
    background-color: red;
    animation-name: ${value ? on : off};
    animation-duration: 0.5s;
  `;

  return (
    <Header>
      <FirstBox>
        <Title>
          <Setli>Weberyday</Setli>
          <Setli>랭킹</Setli>
          <Setli>작품</Setli>
        </Title>
      </FirstBox>
      <SecondBox>
        <Title>
          <Setli>알림</Setli>
          <Setli>돋보기</Setli>
          <Setli
            onClick={() => {
              setValue(!value);
              setToo(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
            </svg>
          </Setli>
        </Title>
      </SecondBox>
      {too ? (
        value ? (
          <ToggleLogin>
            <div>asdasdasdasd</div>
          </ToggleLogin>
        ) : (
          <ToggleLogin>
            <div>asdasdasdasd</div>
          </ToggleLogin>
        )
      ) : (
        ""
      )}
    </Header>
  );
};

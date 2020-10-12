import React from "react";
import styled from "styled-components";
import { ErrorIcon } from "../../../Components/Icons";

const Container = styled.div`
  height: 80vh;
`;

const KakaoTitle = styled.p`
  margin-top: 50px;
  font-size: 18px;
`;

const KakaoTitleValue = styled.p`
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

export default ({}) => {
  return (
    <Container>
      <KakaoTitle>해당 카카오 로그인 기능을 수행 할 수 없습니다</KakaoTitle>
      <KakaoTitleValue>해당 에러의 이유 🤔</KakaoTitleValue>
      <KakaoTitleValue>
        해당 로그인이 되지 않는 경우는, 카카오 로그인시 이메일 사용 동의를
        허용해주지 않은 경우 해당 에러🔥가 날 수 있습니다.
        <br /> 해당 동의를 안하고 진행하셨을 경우 해당 동의 후 다시한번
        시도해주시기 바랍니다.
      </KakaoTitleValue>
      <ErrorIconBox>
        <ErrorIcon />
      </ErrorIconBox>
    </Container>
  );
};

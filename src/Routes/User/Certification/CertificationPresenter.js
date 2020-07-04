import React from "react";
import styled from "styled-components";
import Button from "../../../Components/Button";
import CheckInput from "../../../Components/CheckInput";
import InputCheckBox from "../../../Components/InputCheckBox";
import Input from "../../../Components/Input";

const Container = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  width: 60%;
`;

const TitleText = styled.p`
  font-size: 1.8em;
  margin-bottom: 30px;
`;

const Text = styled.p`
  font-size: 1em;
  line-height: 16px;
  font-weight: 400px;
  margin-bottom: 30px;
`;

const Certify = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

const CertifyField = styled.div`
  padding: 50px 30px;
  border: solid 1px #bdc3c7;
  border-radius: 2px;
`;

const LabelOption = styled.label`
  display: flex;
  width: 100%;
  margin: 0px 0 0px 0;
`;

const CertificationAgreeCheck = styled.div`
  display: flex;
  margin-top: 25px;
`;

const TextBox = styled.div`
  display: flex;
`;
const CertificationContirmContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
`;

export default ({}) => {
  return (
    <Container>
      <TitleText>제작팀 등록</TitleText>
      <Certify>
        <CertifyField>
          <TitleText>이메일 인증</TitleText>
          <Text>
            제작팀과의 원할한 소통을 위하여 이메일 인증을 합니다.
            <br />
            웹드라마 검수현황, 웹드라마 승격등 서비스와 관련된 주요 내용을
            메일로 안내드립니다.
          </Text>
          <Text style={{ marginBottom: "20px" }}>이메일</Text>
          <Text>{localStorage.getItem("userEmailToken")}</Text>
          <Button
            style={{ width: "90px", marginTop: "48px" }}
            disabled={true}
            text={"인증완료"}
          />
        </CertifyField>
        <CertifyField style={{ marginLeft: "30px", marginRight: "30px" }}>
          <TitleText>본인 인증</TitleText>
          <Text>
            제작팀의 대표자의 연령 및 실명 확인을 위해 본인인증을 합니다.
            <br />
            본인 인증 정보를 통해 성인인 경우에만 성인작품 등록이 가능합니다.
          </Text>
          <LabelOption>
            <CheckInput style={{ width: "10%" }} name={"certificationRadio"} />
            <Text>아이핀 인증</Text>
          </LabelOption>
          <LabelOption>
            <CheckInput style={{ width: "10%" }} name={"certificationRadio"} />
            <Text>본인인증(휴대폰)</Text>
          </LabelOption>
          <Button style={{ width: "90px" }} disabled={true} text={"인증"} />
        </CertifyField>
        <CertifyField>
          <TitleText>제작팀명 등록</TitleText>
          <Text>
            특수 부호를 제외한 영문, 한글 명을 입력해주세요
            <br />
            작가명은 작가등록 된 이후 변경이 불가능하니 신중히 선택해주세요.
          </Text>
          <Text style={{ marginBottom: "15px" }}>제작팀명</Text>
          <Input />
          <Button style={{ width: "90px" }} disabled={true} text={"확인"} />
        </CertifyField>
      </Certify>
      <CertificationAgreeCheck>
        <TextBox>
          <InputCheckBox />
          <Text style={{ marginLeft: "10px" }}>
            제작팀명 수집에 동의합니다.
          </Text>
        </TextBox>
      </CertificationAgreeCheck>
      <CertificationContirmContainer>
        <Button
          style={{ width: "180px", marginRight: "20px", borderRadius: "2px" }}
          disabled={true}
          text={"취소"}
        />
        <Button
          style={{ width: "180px", marginLeft: "20px", borderRadius: "2px" }}
          disabled={true}
          text={"제작팀 등록"}
        />
      </CertificationContirmContainer>
    </Container>
  );
};

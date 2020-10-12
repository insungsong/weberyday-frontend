import React from "react";
import styled from "styled-components";
import Button from "../../../Components/Button";
import CheckInput from "../../../Components/CheckInput";
import InputCheckBox from "../../../Components/InputCheckBox";
import Input from "../../../Components/Input";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import SmallLoader from "../../../Components/SmallLoader";
import * as jwtDecode from "jwt-decode";

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

export default ({
  myselfCertificaiton,
  setMyselfCertification,
  teamName,
  setState,
  onSubmit,
  data,
  loading,
  isMyInfo,
  teamNameCertification,
  setTeamNameCertification,
  teamNameAgree
}) => {
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");
    toast.success(
      "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
    );
    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }

  let isTrue = true;
  if ((data && data.searchTeamName) !== undefined) {
    if (myselfCertificaiton && teamNameCertification && teamNameAgree.value) {
      isTrue = false;
    } else {
      isTrue = true;
    }
  }

  //certification이 undefined라는 에러가 남
  return isMyInfo.findUserInfo.certification === false ? (
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
            style={{
              border: "none",
              borderRadius: "2px",
              width: "90px",
              marginTop: "48px"
            }}
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
          <Button
            onClick={(e) => {
              setMyselfCertification(true);
              toast.success("인증에 성공하였습니다!");
            }}
            style={{
              width: "90px",
              border: "none",
              borderRadius: "2px",
              backgroundColor: "#4996C4",
              color: "white"
            }}
            disabled={myselfCertificaiton}
            text={myselfCertificaiton ? "인증완료" : "인증"}
          />
        </CertifyField>
        <CertifyField>
          <TitleText>제작팀명 등록</TitleText>
          <Text>
            특수 부호를 제외한 영문, 한글 명을 입력해주세요
            <br />
            작가명은 작가등록 된 이후 변경이 불가능하니 신중히 선택해주세요.
          </Text>
          <Text style={{ marginBottom: "15px" }}>제작팀명</Text>
          <Input
            {...teamName}
            onFocus={() => {
              setTeamNameCertification(false);
            }}
          />
          {loading ? (
            <>
              <p style={{ color: "#4996C4", marginBottom: "20px" }}>
                해당 이름을 검색중입니다..🔍
              </p>
              <SmallLoader />
            </>
          ) : data.searchTeamName === true ? (
            <Button
              onClick={async () => {
                if ((data && data.searchTeamName) === undefined) {
                  toast.error(
                    "해당 조건을 검색중입니다 확인을 다시한번 눌러주세요 🔍"
                  );
                }
                if ((data && data.searchTeamName) !== undefined) {
                  if (data.searchTeamName === true) {
                    setTeamNameCertification(true);
                    toast.success("사용가능한 제작팀 명입니다");
                  } else {
                    toast.error("이미 사용중인 제작팀 명입니다");
                  }
                }
              }}
              style={{
                width: "90px",
                border: "none",
                borderRadius: "2px",
                backgroundColor: "#4996C4",
                color: "white"
              }}
              text={"확인"}
            />
          ) : teamName.value === "" ? (
            <p style={{ color: "#4996C4" }}>제작팀명을 입력해주세요.</p>
          ) : (
            <p style={{ color: "red" }}>
              존재하는 제작팀명 입니다. 다른 제작팀명을 사용해주시길 바랍니다.
            </p>
          )}
        </CertifyField>
      </Certify>
      <CertificationAgreeCheck>
        <TextBox>
          <InputCheckBox
            {...teamNameAgree}
            onClick={async () => await teamNameAgree.setValue(true)}
          />
          <Text style={{ marginLeft: "10px" }}>
            제작팀명 수집에 동의합니다.
          </Text>
        </TextBox>
      </CertificationAgreeCheck>
      <CertificationContirmContainer>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            width: "180px",
            marginRight: "20px",
            border: "none",
            borderRadius: "2px"
          }}
          disabled={false}
          text={"취소"}
        />
        {isTrue ? (
          <Button
            style={{
              width: "180px",
              marginLeft: "20px",
              border: "none",
              borderRadius: "2px",
              color: "white"
            }}
            disabled={isTrue}
            onClick={async () => {
              await setState("teamNameConfirm");
              onSubmit();
            }}
            text={"제작팀 등록"}
          />
        ) : (
          <Button
            style={{
              width: "180px",
              marginLeft: "20px",
              border: "none",
              borderRadius: "2px",
              backgroundColor: "#4996C4",
              color: "white"
            }}
            disabled={isTrue}
            onClick={async () => {
              await setState("teamNameConfirm");
              onSubmit();
            }}
            text={"제작팀 등록"}
          />
        )}
      </CertificationContirmContainer>
    </Container>
  ) : (
    <Redirect to="/myPostList" />
  );
};

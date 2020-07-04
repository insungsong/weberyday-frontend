import React, { useEffect } from "react";
import styled from "styled-components";
import Input from "../../../Components/Input";
import CheckInput from "../../../Components/CheckInput";
import { Eraser } from "../../../Components/Icons";
import InputCheckBox from "../../../Components/InputCheckBox";

const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.p`
  font-size: 3.5em;
`;

const MiddleTitle = styled.p`
  font-size: 2em;
  margin: 20px 0;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.p`
  font-size: 1.2em;
`;

const MeInfoBox = styled.div`
  width: 100%;
`;

const LineBox = styled.div`
  margin: 25px 0;
`;

const ChangeBox = styled.details`
  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    cursor: pointer;
  }
  :hover {
    border: solid 0.5px #4996c4;
  }
  border-radius: 2px;
  padding: 8px;
`;

const Package = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

const ButtonBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: auto;
`;

const MiniChangeBox = styled.div`
  width: 80%;
  margin: 10px 0;
`;

const Birthday = styled.select`
  width: 95px; /* 원하는 너비설정 */
  margin-left: 10px;
  height: 43px;
  padding: 0.8em 0.5em; /* 여백으로 높이 설정 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 0px; /* iOS 둥근모서리 제거 */
  font-size: 14px;
  -webkit-appearance: none; /* 네이티브 외형 감추기 */
  -moz-appearance: none;
  appearance: none;
`;

const SignUpBirthday = styled.fieldset``;

const SignUpBirthdayOption = styled.div`
  display: flex;
  margin: 10px 0 20px 0;
`;

const LoginGender = styled.fieldset``;

const LoginGenderOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin: 10px;
  background: ${(props) => props.theme.lightGreyColor};
`;

const LabelOption = styled.label`
  display: flex;
  width: 100%;
  margin: 10px 0 20px 0;
`;

const SignUpAgreeCheck = styled.div`
  display: flex;
  margin-top: 25px;
`;

const SaveButton = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 18px;
  margin-bottom: 12px;
  border: none;
  color: white;
  border-radius: 2px;
  background-color: ${(props) => props.theme.favoriteColor};

  &:disabled {
    background-color: ${(props) => props.theme.greyColor};
  }
`;

const CancelButton = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 18px;
  margin-bottom: 12px;
  border: none;
  border-radius: 2px;
  background-color: #fafbfc;
`;
export default ({
  currentPassword,
  newPassword,
  newPasswordConfirm,
  onSubmit,
  setState,
  onPasswordDisabled,
  userInfo,
  checked
}) => {
  useEffect(() => {
    var today = new Date();
    var previousYear = 1919;
    var birthday = today.getFullYear();
    var startMonth = 0;
    var endMonth = 12;
    var startDay = 0;
    var endDay = 31;

    var strYear = "";
    var strMonth = "";
    var strDay = "";

    for (var i = previousYear; i <= birthday; i++) {
      if (i === previousYear) {
        strYear += "<option value=" + 0 + ">" + "년" + "</option>";
      } else {
        strYear += "<option value=" + i + ">" + i + "</option>";
      }
    }

    for (var i = startMonth; i <= endMonth; i++) {
      if (i === startMonth) {
        strMonth += "<option value=" + 0 + ">" + "월" + "</option>";
      } else {
        strMonth += "<option value=" + i + ">" + i + "</option>";
      }
    }

    for (var i = startDay; i <= endDay; i++) {
      if (i === startMonth) {
        strDay += "<option value=" + 0 + ">" + "일" + "</option>";
      } else {
        strDay += "<option value=" + i + ">" + i + "</option>";
      }
    }
    document.getElementById("year").innerHTML = strYear;
    document.getElementById("month").innerHTML = strMonth;
    document.getElementById("day").innerHTML = strDay;
  }, []);

  const passwordCheckBox = document.getElementById("passwordCheckBox");

  let year = "0";
  let month = "0";
  let day = "0";
  let agreePrivacy = false;

  const femailInput = document.getElementById("femail");
  const mailInput = document.getElementById("mail");

  const agreeInfo = document.getElementById("agreeInfo");
  const yearValue = document.getElementById("year");
  const monthValue = document.getElementById("month");
  const dayValue = document.getElementById("day");

  if (userInfo !== undefined) {
    let birthday = userInfo.findUserInfo.birthday;
    year = birthday.slice(0, 4);
    month = parseInt(birthday.slice(4, 6));
    day = parseInt(birthday.slice(6, 8));

    let gender = userInfo.findUserInfo.gender;
    document.getElementById(gender).checked = true;

    agreePrivacy = userInfo.findUserInfo.agreePrivacy;
    agreeInfo.checked = agreePrivacy;
  }

  return (
    <Container>
      <Title>내 정보</Title>
      <MiddleTitle>계정 관리</MiddleTitle>
      <MeInfoBox>
        <LineBox>
          <TextBox>
            <Text style={{ paddingRight: "40px" }}>이메일</Text>
            <Text>{localStorage.getItem("userEmailToken")}</Text>
          </TextBox>
        </LineBox>
        <LineBox>
          <ChangeBox id="passwordCheckBox">
            <summary style={{ fontSize: "1.2em" }}>비밀번호 수정</summary>
            <Package>
              <MiniChangeBox>
                <Text>현재 비밀번호</Text>
                <Input
                  {...currentPassword}
                  placeholder="영문,숫자 및 특수문자 포함 8자 이상"
                  type="password"
                  selectInput="meInput"
                />
              </MiniChangeBox>
              <MiniChangeBox>
                <Text>새 비밀번호</Text>
                <Input
                  {...newPassword}
                  placeholder="영문,숫자 및 특수문자 포함 8자 이상"
                  type="password"
                  selectInput="meInput"
                />
              </MiniChangeBox>
              <MiniChangeBox>
                <Text>새 비밀번호 재입력</Text>
                <Input
                  {...newPasswordConfirm}
                  placeholder="영문,숫자 및 특수문자 포함 8자 이상"
                  type="password"
                  selectInput="meInput"
                />
              </MiniChangeBox>
              <ButtonBox>
                <CancelButton onClick={() => (passwordCheckBox.open = false)}>
                  취소
                </CancelButton>

                <SaveButton
                  disabled={onPasswordDisabled}
                  onClick={async (e) => {
                    await setState("passwordChange");
                  }}
                >
                  저장
                </SaveButton>
              </ButtonBox>
            </Package>
          </ChangeBox>
        </LineBox>
        <LineBox>
          <ChangeBox id="birthdayCheckBox">
            <summary style={{ fontSize: "1.2em" }}>생년월일/성별</summary>
            <Package>
              <MiniChangeBox>
                <SignUpBirthday>
                  <legend>생년월일</legend>
                  <SignUpBirthdayOption>
                    <Birthday
                      id="year"
                      title="년"
                      onChange={async (e) => {
                        agreeInfo.checked = true;
                        agreeInfo.disabled = false;
                      }}
                      value={String(year)}
                    />
                    <Birthday
                      id="month"
                      title="월"
                      onChange={async (e) => {
                        agreeInfo.checked = true;
                        agreeInfo.disabled = false;
                      }}
                      value={String(month)}
                    />
                    <Birthday
                      id="day"
                      title="일"
                      value={String(day)}
                      onChange={async (e) => {
                        agreeInfo.checked = true;
                        agreeInfo.disabled = false;
                      }}
                    />
                  </SignUpBirthdayOption>
                </SignUpBirthday>
                <LoginGender>
                  <legend>성별</legend>
                  <LoginGenderOption>
                    <LabelOption>
                      <CheckInput
                        id="femail"
                        name="gender"
                        value="femail"
                        onChange={async (e) => {
                          agreeInfo.checked = true;
                          agreeInfo.disabled = false;
                        }}
                      />
                      <Text style={{ marginLeft: "10px" }}>여성</Text>
                    </LabelOption>
                    <LabelOption>
                      <CheckInput
                        id="mail"
                        name="gender"
                        value="mail"
                        onChange={async (e) => {
                          agreeInfo.checked = true;
                          agreeInfo.disabled = false;
                        }}
                      />
                      <Text style={{ marginLeft: "10px" }}>남성</Text>
                    </LabelOption>
                    <LabelOption
                      onClick={async () => {
                        if (
                          yearValue.value !== "0" ||
                          monthValue.value !== "0" ||
                          dayValue.value !== "0"
                        ) {
                          agreeInfo.checked = true;
                        }
                        mailInput.checked = false;
                        femailInput.checked = false;
                      }}
                    >
                      <Eraser />
                    </LabelOption>
                  </LoginGenderOption>
                </LoginGender>
                <SignUpAgreeCheck>
                  <InputCheckBox
                    onChange={(e) => console.log(e)}
                    onClick={(e) => {
                      if (e.target.checked === false) {
                        e.target.disabled = true;
                        mailInput.checked = false;
                        femailInput.checked = false;
                        yearValue.value = "0";
                        monthValue.value = "0";
                        dayValue.value = "0";
                      }
                    }}
                    id="agreeInfo"
                  />
                  <TextBox
                    style={{
                      justifyContent: "space-between",
                      marginLeft: "8px"
                    }}
                  >
                    <Text>개인정보 수집 및 이용동의</Text>
                    <Text>상세보기</Text>
                  </TextBox>
                </SignUpAgreeCheck>
              </MiniChangeBox>
              <ButtonBox>
                <CancelButton onClick={() => (passwordCheckBox.open = false)}>
                  취소
                </CancelButton>
                <SaveButton
                  onClick={async (e) => {
                    await setState("birthdayChange");
                  }}
                >
                  저장
                </SaveButton>
              </ButtonBox>
            </Package>
          </ChangeBox>
        </LineBox>
        <LineBox>
          <ChangeBox id="birthdayCheckBox">
            <summary style={{ fontSize: "1.2em" }}>이벤트 정보 알림</summary>
            <LoginGender>
              <LoginGenderOption
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <LabelOption>
                  <CheckInput id="femailInput" name="gender" value="femail" />
                  <Text style={{ marginLeft: "10px" }}>수신</Text>
                </LabelOption>
                <LabelOption>
                  <CheckInput id="mailInput" name="gender" value="mail" />
                  <Text style={{ marginLeft: "10px" }}>비수신</Text>
                </LabelOption>
              </LoginGenderOption>
            </LoginGender>
            <ButtonBox>
              <CancelButton onClick={() => (passwordCheckBox.open = false)}>
                취소
              </CancelButton>
              <SaveButton>저장</SaveButton>
            </ButtonBox>
          </ChangeBox>
        </LineBox>
      </MeInfoBox>
    </Container>
  );
};

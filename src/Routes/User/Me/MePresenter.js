import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../../../Components/Input";
import CheckInput from "../../../Components/CheckInput";
import { Eraser } from "../../../Components/Icons";
import InputCheckBox from "../../../Components/InputCheckBox";
import { useQuery } from "react-apollo-hooks";
import { INFOW_FIND_USER } from "../../Main/MainQuery";

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

const LoginGender = styled.div``;

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
  setState,
  onPasswordDisabled,
  userInfo,
  userInfoError,
  gender,
  nEvent,
  birthdayInfo,
  agreePrivacyInfo,
  setSignOutReason,
  signOutMutation
}) => {
  //해당 유저 쿠키가 있는지 없는지 알기 위해
  if (!localStorage.getItem("userEmailToken")) {
    window.location.href = "/";
  }

  const [inflow, setInflow] = useState("");
  const [notRender, setNotRender] = useState(false);
  const { data, loading, error } = useQuery(INFOW_FIND_USER, {
    variables: {
      email: localStorage.getItem("userEmailToken")
    }
  });

  if (data && data.inflowFindUser !== undefined && !notRender) {
    setInflow(data.inflowFindUser.inflow);
    setNotRender(true);
  }

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

    if (
      inflow === "weberyday" &&
      document.getElementById("year") &&
      document.getElementById("month") &&
      document.getElementById("day") !== undefined
    ) {
      document.getElementById("year").innerHTML = strYear;
      document.getElementById("month").innerHTML = strMonth;
      document.getElementById("day").innerHTML = strDay;
    }
  }, [data]);

  const passwordCheckBox = document.getElementById("passwordCheckBox");
  const birthdayCheckBox = document.getElementById("birthdayCheckBox");
  const eventCheckBox = document.getElementById("eventCheckBox");
  const signOutCheckBox = document.getElementById("signOutCheckBox");

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

  const nEventTrueInfo = document.getElementById("nEventTrue");
  const nEventFalseInfo = document.getElementById("nEventFalse");

  let birthday = "";

  if (
    (userInfo && userInfo.findUserInfo && userInfo.findUserInfo.birthday) !==
    undefined
  ) {
    birthday = userInfo.findUserInfo.birthday;

    year = birthday.slice(0, 4);
    if (birthdayInfo.year !== "") {
      if ((yearValue && yearValue.value) !== null) {
        yearValue.value = birthdayInfo.year;
      }
    } else if (yearValue !== null && yearValue.value !== null) {
      yearValue.value = year;
    }

    month = parseInt(birthday.slice(4, 6));
    if (birthdayInfo.month !== "") {
      if ((monthValue && monthValue.value) !== null) {
        monthValue.value = Number(birthdayInfo.month);
      }
    } else if (monthValue !== null && monthValue.value !== null) {
      monthValue.value = month;
    }

    day = parseInt(birthday.slice(6, 8));
    if (birthdayInfo.day !== "") {
      if ((dayValue && dayValue.value) !== null) {
        dayValue.value = Number(birthdayInfo.day);
      }
    } else if (dayValue !== null && dayValue.value !== null) {
      dayValue.value = day;
    }

    let genderValue = userInfo.findUserInfo.gender;
    let genderRadio = gender.get;
    if (genderRadio === null) {
    } else if (genderRadio.length !== 1) {
      if (document.getElementById(genderRadio) !== null) {
        document.getElementById(genderRadio).checked = true;
      }
    } else if (document.getElementById(genderValue) !== null) {
      document.getElementById(genderValue).checked = true;
    }

    if (
      (userInfo &&
        userInfo.findUserInfo &&
        userInfo.findUserInfo.agreePrivacy) !== undefined
    ) {
      agreePrivacy = userInfo.findUserInfo.agreePrivacy;

      if (agreePrivacyInfo.value !== "") {
        agreeInfo.checked = agreePrivacyInfo.value;
      } else if ((agreeInfo && agreeInfo.checked) !== null) {
        agreeInfo.checked = agreePrivacy;
      }
    }
  }

  //개인정보 안에서 알림 수신/비수신에 관한 코드
  if (nEventTrueInfo && nEventTrueInfo.checked !== null) {
    if (nEvent.value === true) {
      nEventTrueInfo.checked = true;
    } else {
      nEventFalseInfo.checked = true;
    }
  }

  return (
    <Container>
      <Title>내 정보</Title>
      <MiddleTitle>계정 관리</MiddleTitle>
      <MeInfoBox>
        <LineBox>
          <TextBox>
            <Text style={{ paddingLeft: "7px" }}>이메일</Text>
            <Text>{localStorage.getItem("userEmailToken")}</Text>
          </TextBox>
        </LineBox>
        {inflow === "weberyday" ? (
          <>
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
                    <CancelButton
                      onClick={() => (passwordCheckBox.open = false)}
                    >
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
                      <SignUpBirthdayOption {...birthdayInfo}>
                        <Birthday
                          id="year"
                          title="년"
                          onChange={async (e) => {
                            agreePrivacyInfo.setValue(true);
                            agreeInfo.disabled = false;
                            if (
                              yearValue.value == "0" &&
                              monthValue.value == "0" &&
                              dayValue.value == "0" &&
                              femailInput.checked === false &&
                              mailInput.checked === false
                            ) {
                              agreePrivacyInfo.setValue(false);
                              agreeInfo.disabled = true;
                            }
                          }}
                        />
                        <Birthday
                          id="month"
                          title="월"
                          onChange={async (e) => {
                            agreePrivacyInfo.setValue(true);
                            agreeInfo.disabled = false;
                            if (
                              yearValue.value == "0" &&
                              monthValue.value == "0" &&
                              dayValue.value == "0" &&
                              femailInput.checked === false &&
                              mailInput.checked === false
                            ) {
                              agreePrivacyInfo.setValue(false);
                              agreeInfo.disabled = true;
                            }
                          }}
                        />
                        <Birthday
                          id="day"
                          title="일"
                          onChange={async (e) => {
                            agreePrivacyInfo.setValue(true);
                            agreeInfo.disabled = false;
                            if (
                              yearValue.value == "0" &&
                              monthValue.value == "0" &&
                              dayValue.value == "0" &&
                              femailInput.checked === false &&
                              mailInput.checked === false
                            ) {
                              agreePrivacyInfo.setValue(false);
                              agreeInfo.disabled = true;
                            }
                          }}
                        />
                      </SignUpBirthdayOption>
                    </SignUpBirthday>
                    <LoginGender>
                      <legend>성별</legend>
                      <LoginGenderOption>
                        <LabelOption>
                          <CheckInput
                            {...gender}
                            id="femail"
                            name="gender"
                            value="femail"
                            onClick={async (e) => {
                              gender.setGet(e.target.value);
                              agreePrivacyInfo.setValue(true);
                              agreeInfo.disabled = false;
                            }}
                          />
                          <Text style={{ marginLeft: "10px" }}>여성</Text>
                        </LabelOption>
                        <LabelOption>
                          <CheckInput
                            {...gender}
                            id="mail"
                            name="gender"
                            value="mail"
                            onClick={async (e) => {
                              gender.setGet(e.target.value);
                              agreePrivacyInfo.setValue(true);
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
                              agreePrivacyInfo.setValue(true);
                            }
                            if (
                              yearValue.value === "0" &&
                              monthValue.value === "0" &&
                              dayValue.value === "0"
                            ) {
                              agreePrivacyInfo.setValue(false);
                              agreeInfo.disabled = true;
                            }
                            await gender.setGet("null");
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
                        {...agreePrivacyInfo}
                        onClick={async (e) => {
                          if (e.target.checked === false) {
                            e.target.disabled = true;
                            mailInput.checked = false;
                            femailInput.checked = false;
                            gender.setGet("null");
                            await birthdayInfo.updateBirthday();
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
                    <CancelButton
                      onClick={() => (birthdayCheckBox.open = false)}
                    >
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
              <ChangeBox id="eventCheckBox">
                <summary style={{ fontSize: "1.2em" }}>
                  이벤트 정보 알림
                </summary>
                <LoginGender>
                  <LoginGenderOption
                    style={{
                      width: "80%",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <LabelOption>
                      <CheckInput
                        {...nEvent}
                        onClick={async () => {
                          await nEvent.setValue(true);
                        }}
                        id="nEventTrue"
                        name="nEvent"
                      />
                      <Text style={{ marginLeft: "10px" }}>수신</Text>
                    </LabelOption>
                    <LabelOption>
                      <CheckInput
                        {...nEvent}
                        onClick={async () => {
                          await nEvent.setValue(false);
                        }}
                        id="nEventFalse"
                        name="nEvent"
                      />
                      <Text style={{ marginLeft: "10px" }}>비수신</Text>
                    </LabelOption>
                  </LoginGenderOption>
                </LoginGender>
                <ButtonBox>
                  <CancelButton onClick={() => (eventCheckBox.open = false)}>
                    취소
                  </CancelButton>
                  <SaveButton
                    onClick={async (e) => {
                      await setState("nEventChange");
                    }}
                  >
                    저장
                  </SaveButton>
                </ButtonBox>
              </ChangeBox>
            </LineBox>
          </>
        ) : (
          ""
        )}
        <LineBox style={{ marginBottom: "300px" }}>
          <ChangeBox id="signOutCheckBox">
            <summary style={{ fontSize: "1.2em", marginBottom: "25px" }}>
              회원을 탈퇴하시겠습니까?
            </summary>
            <LabelOption>
              <CheckInput
                onClick={async () => {
                  setSignOutReason("이용이 불편하고 장애가 많음");
                }}
                id="signOut"
                name="signOut"
              />
              <Text>이용이 불편하고 장애가 많음</Text>
            </LabelOption>
            <LabelOption>
              <CheckInput
                onClick={async () => {
                  setSignOutReason("다른 사이트가 더 좋아서");
                }}
                id="signOut"
                name="signOut"
              />
              <Text>다른 사이트가 더 좋아서</Text>
            </LabelOption>
            <LabelOption>
              <CheckInput
                onClick={async () => {
                  setSignOutReason("사용빈도가 낮아서");
                }}
                id="signOut"
                name="signOut"
              />
              <Text>사용빈도가 낮아서</Text>
            </LabelOption>
            <LabelOption>
              <CheckInput
                onClick={async () => {
                  setSignOutReason("콘텐츠 불만");
                }}
                id="signOut"
                name="signOut"
              />
              <Text>콘텐츠 불만</Text>
            </LabelOption>
            <LabelOption>
              <CheckInput
                onClick={async () => {
                  setSignOutReason("기타");
                }}
                id="signOut"
                name="signOut"
              />
              <Text>기타</Text>
            </LabelOption>
            <ButtonBox>
              <CancelButton onClick={() => (signOutCheckBox.open = false)}>
                취소
              </CancelButton>
              <SaveButton
                onClick={async (e) => {
                  await signOutMutation();
                  window.location.href = "/signOutPage?success";
                }}
              >
                탈퇴하기
              </SaveButton>
            </ButtonBox>
          </ChangeBox>
        </LineBox>
      </MeInfoBox>
    </Container>
  );
};

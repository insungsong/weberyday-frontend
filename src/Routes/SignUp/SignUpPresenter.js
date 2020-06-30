import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import CheckInput from "../../Components/CheckInput";
import { Eraser } from "../../Components/Icons";
import InputCheckBox from "../../Components/InputCheckBox";

const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 25%;
  margin: 10vh 0 16vh 0;
`;

const SigupFilterBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.3em;
`;
//CheckForm----------------------------------------

const MainBox = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const CertificationForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const InputLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 18px 0;
`;

const CheckBoxLabel = styled.label`
  display: flex;
`;

const TextBox = styled.div`
  display: flex;
  width: 90%;
`;

const Text = styled.p`
  font-size: 1.1em;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;

const CheckButton = styled.button`
  width: 90%;
  height: 40px;
  border-radius: 5px;
  color: white;
  background-color: #3498db;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  &:disabled {
    background-color: ${(props) => props.theme.greyColor};
  }
  :nth-child(1) {
    color: black;
  }
`;

const SignUpOption = styled.fieldset`
  width: 90%;
  height: 100%;
  margin-bottom: 20px;
  padding: 10px;
  background-color: ${(props) => props.theme.lightGreyColor};
`;

const LoginGender = styled.fieldset``;

const LoginGenderOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LabelOption = styled.label`
  display: flex;
  width: 100%;
  margin: 10px 0 20px 0;
`;

const SignUpBirthday = styled.fieldset``;

const SignUpBirthdayOption = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Birthday = styled.select`
  width: 120px; /* 원하는 너비설정 */
  height: 40px;
  padding: 0.8em 0.5em; /* 여백으로 높이 설정 */
  font-family: inherit; /* 폰트 상속 */
  border: 1px solid #999;
  border-radius: 0px; /* iOS 둥근모서리 제거 */
  font-size: 14px;
  -webkit-appearance: none; /* 네이티브 외형 감추기 */
  -moz-appearance: none;
  appearance: none;
`;

const SignUpAgreeCheck = styled.div`
  display: flex;
  margin-top: 25px;
`;

const InputCheck = styled.input.attrs({
  type: "checkBox"
})``;
//1.check 2.emailCheck 3.signUpForm
export default ({
  onSubmit,
  emailCertification,
  password,
  gender,
  agreeInfo,
  birthdayInfo,
  secretCode,
  secretCodeIsExist
}) => {
  const [state, setState] = useState("signUpForm");
  const [checkDisable, setCheckDisable] = useState(true);
  const [sendSecret, setSendSecret] = useState(false);

  let year = false;
  let month = false;
  let day = false;
  let allLength = false;

  console.log(year, month, day, allLength);

  //체크박스를 가져오는 코드
  var mustCheckedBox = document.querySelectorAll(".must");

  const allRigthButton = document.getElementById("allCheck");
  const agreePolicy = document.getElementById("agree-Policy");
  const agreePp = document.getElementById("agree-pp");
  const agreeMarketEmail = document.getElementById("agree-market-email");

  const femailInput = document.getElementById("femailInput");
  const mailInput = document.getElementById("mailInput");

  var birthdayNumberLength = birthdayInfo.birthday.length;

  if (year && month && day) {
    allLength = true;
  }
  if (allLength) {
    gender.setDisabled(true);
    agreeInfo.setValue(false);
  }
  //체크박스가 체크가 되었는지의 여부를 확인하는 fun
  const mustBoxCheck = () => {
    var arr = [];
    for (var i = 0; i < mustCheckedBox.length; i++) {
      arr.push(mustCheckedBox[i].checked);
    }
    if (arr.includes(false)) {
      setCheckDisable(true);
    } else {
      setCheckDisable(false);
    }
  };

  const regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  var emailIsTrue = true;

  var emailCertificationChecking = emailCertification.value.match(regExp);
  if (emailCertificationChecking !== null) {
    emailIsTrue = false;
  }

  useEffect(() => {
    if (state === "signUpForm") {
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
    }
  }, [state]);

  //이메일로 회원가입 버튼을 disable => false 를 해주기위함
  //TO DO: 이부분을 지금은 하나라도 입력하면 disabled가 false가 되도록하지만 실제 완성할때는, 정규식으로 비밀번호를 거른것이 true라면 disabled할 수 있도록 해야함
  var secondCheckDisable = true;

  if (password.value !== "") {
    secondCheckDisable = false;
  } else {
    secondCheckDisable = true;
  }

  return (
    <SignUpBox>
      {state === "check" && (
        <SigupFilterBox>
          <Title>이메일로 회원가입</Title>
          <MainBox>
            <InputLine>
              <CheckBoxLabel>
                <InputCheck
                  id="allCheck"
                  className="all-Check"
                  onClick={(e) => {
                    var objs = document.querySelectorAll(".checked");
                    for (var i = 0; i < objs.length; i++) {
                      objs[i].checked = e.target.checked;
                    }
                    mustBoxCheck();
                  }}
                />
                <Text>전체동의</Text>
              </CheckBoxLabel>
            </InputLine>
            <hr />
            <InputLine>
              <CheckBoxLabel>
                <InputCheck
                  onClick={(e) => {
                    console.log(allRigthButton.checked);
                    console.log(agreePp.checked);
                    console.log(agreeMarketEmail.checked);
                    if (allRigthButton.checked === true) {
                      allRigthButton.checked = false;
                    } else if (
                      allRigthButton.checked === false &&
                      agreePp.checked === true &&
                      agreeMarketEmail.checked === true
                    ) {
                      allRigthButton.checked = true;
                    }
                    mustBoxCheck();
                  }}
                  id="agree-Policy"
                  className="checked must"
                  name="agree-Policy"
                />
                <Text>
                  웨브리데이 이용약관<b style={{ color: "red" }}>(필수)</b>
                </Text>
              </CheckBoxLabel>
              <Text>
                <Link to="#">상세보기</Link>
              </Text>
            </InputLine>
            <InputLine>
              <CheckBoxLabel>
                <InputCheck
                  id="agree-pp"
                  name="agree-pp"
                  className="checked must"
                  onClick={(e) => {
                    if (allRigthButton.checked === true) {
                      allRigthButton.checked = false;
                    } else if (
                      allRigthButton.checked === false &&
                      agreePolicy.checked === true &&
                      agreeMarketEmail.checked === true
                    ) {
                      allRigthButton.checked = true;
                    }
                    mustBoxCheck();
                  }}
                />
                <Text>
                  개인정보 수집 및 이용에 대한 안내
                  <b style={{ color: "red" }}>(필수)</b>
                </Text>
              </CheckBoxLabel>
              <Text>
                <Link to="#">상세보기</Link>
              </Text>
            </InputLine>
            <InputLine>
              <CheckBoxLabel>
                <InputCheck
                  id="agree-market-email"
                  name="agree-market-email"
                  className="checked"
                  onClick={(e) => {
                    {
                      if (allRigthButton.checked === true) {
                        allRigthButton.checked = false;
                      } else if (
                        allRigthButton.checked === false &&
                        agreePolicy.checked === true &&
                        agreePp.checked === true
                      ) {
                        allRigthButton.checked = true;
                      }
                    }
                  }}
                />
                <Text>이벤트 혜택 및 마케팅 정보 이메일 알림(선택)</Text>
              </CheckBoxLabel>
            </InputLine>
            <hr />
            <InputLine>
              <CheckBoxLabel>
                <InputCheck
                  id="adult"
                  name="adult"
                  className="must"
                  onClick={() => {
                    mustBoxCheck();
                  }}
                />
                <Text>
                  만 14세 이상입니다.<b style={{ color: "red" }}>(필수)</b>
                </Text>
              </CheckBoxLabel>
            </InputLine>
            <ButtonBox>
              <CheckButton style={{ backgroundColor: "#ffffff", width: "48%" }}>
                취소
              </CheckButton>
              <CheckButton
                style={{ width: "48%" }}
                disabled={checkDisable}
                onClick={() => setState("certification")}
              >
                확인
              </CheckButton>
            </ButtonBox>
          </MainBox>
        </SigupFilterBox>
      )}
      {state === "certification" && (
        <SigupFilterBox>
          <Title>이메일로 회원가입</Title>
          <CertificationForm>
            <Input
              {...emailCertification}
              placeholder="이메일을 입력해주세요"
              type="email"
              readOnly={sendSecret}
              selectInput="description"
            />
            <TextBox>
              <Text style={{ fontSize: "0.9em", marginBottom: "25px" }}>
                로그인에 사용하실 이메일을 입력해주세요.
              </Text>
            </TextBox>
            {sendSecret ? (
              <>
                <Input {...secretCode} type="number" selectInput="number" />
                <TextBox>
                  <Text style={{ fontSize: "0.9em", marginBottom: "25px" }}>
                    인증번호 번호를 입력하세요
                  </Text>
                </TextBox>
                {secretCodeIsExist ? (
                  setState("signUpForm")
                ) : (
                  <CheckButton
                    onClick={() => {
                      onSubmit();
                      setState("certification&&SendSecret");
                    }}
                  >
                    다음
                  </CheckButton>
                )}
              </>
            ) : (
              <CheckButton
                disabled={emailIsTrue}
                onClick={async () => {
                  const isTrue = await onSubmit();
                  setSendSecret(isTrue);
                }}
              >
                이메일 발송
              </CheckButton>
            )}
          </CertificationForm>
        </SigupFilterBox>
      )}
      {state === "certification&&SendSecret" && (
        <SigupFilterBox>
          <Title>이메일로 회원가입</Title>
          <CertificationForm>
            <Input
              {...emailCertification}
              placeholder="이메일을 입력해주세요"
              type="email"
              readOnly={sendSecret}
              selectInput="description"
            />
            <TextBox>
              <Text style={{ fontSize: "0.9em", marginBottom: "25px" }}>
                로그인에 사용하실 이메일을 입력해주세요.
              </Text>
            </TextBox>
            {sendSecret ? (
              <>
                <Input {...secretCode} type="number" selectInput="number" />
                <TextBox>
                  <Text style={{ fontSize: "0.9em", marginBottom: "25px" }}>
                    인증번호 번호를 입력하세요
                  </Text>
                </TextBox>
                {secretCodeIsExist ? (
                  setState("signUpForm")
                ) : (
                  <CheckButton
                    onClick={() => {
                      onSubmit();
                      setState("certification");
                    }}
                  >
                    다음
                  </CheckButton>
                )}
              </>
            ) : (
              <CheckButton
                disabled={emailIsTrue}
                onClick={() => {
                  onSubmit();
                  setSendSecret(true);
                }}
              >
                이메일 발송
              </CheckButton>
            )}
          </CertificationForm>
        </SigupFilterBox>
      )}
      {state === "signUpForm" && (
        <>
          <Title>이메일로 회원가입</Title>
          <CertificationForm>
            <Input
              {...emailCertification}
              placeholder="이메일을 입력해주세요"
              type="email"
              readOnly={sendSecret}
              selectInput="description"
            />
            <Input
              id="lastPassword"
              {...password}
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
            <TextBox>
              <Text style={{ fontSize: "1.1em", marginBottom: "10px" }}>
                선택정보
              </Text>
            </TextBox>
            <SignUpOption>
              <LoginGender>
                <legend>성별</legend>
                <LoginGenderOption>
                  <LabelOption>
                    <CheckInput
                      {...gender}
                      id="femailInput"
                      name="gender"
                      value="femail"
                      onClick={async () => await agreeInfo.setValue(true)}
                    />
                    <Text style={{ marginLeft: "10px" }}>여성</Text>
                  </LabelOption>
                  <LabelOption>
                    <CheckInput
                      {...gender}
                      id="mailInput"
                      name="gender"
                      value="mail"
                      onClick={async () => await agreeInfo.setValue(true)}
                    />
                    <Text style={{ marginLeft: "10px" }}>남성</Text>
                  </LabelOption>
                  <LabelOption
                    onClick={async () => {
                      mailInput.checked = false;
                      femailInput.checked = false;
                      await gender.setDisabled(true);
                      await agreeInfo.setValue(false);
                    }}
                  >
                    <Eraser />
                  </LabelOption>
                </LoginGenderOption>
              </LoginGender>
              <SignUpBirthday>
                <legend style={{ marginBottom: "10px" }}>생년월일</legend>
                <SignUpBirthdayOption {...birthdayInfo}>
                  <Birthday
                    id="year"
                    title="년"
                    onChange={(e) => {
                      if (e.target.value !== "0") {
                        year = e.target.value;
                      }
                    }}
                  />
                  <Birthday
                    id="month"
                    title="월"
                    onChange={(e) => {
                      if (e.target.value !== "0") {
                        month = true;
                      }
                    }}
                  />
                  <Birthday
                    id="day"
                    title="일"
                    onChange={(e) => {
                      if (e.target.value !== "0") {
                        day = true;
                      }
                    }}
                  />
                </SignUpBirthdayOption>
                <SignUpAgreeCheck>
                  <InputCheckBox
                    {...agreeInfo}
                    checked={agreeInfo.value}
                    disabled={gender.disabled}
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
              </SignUpBirthday>
            </SignUpOption>
            {secondCheckDisable ? (
              <CheckButton disabled={secondCheckDisable}>
                이메일로 회원가입
              </CheckButton>
            ) : (
              <CheckButton
                disabled={secondCheckDisable}
                onClick={() => {
                  onSubmit();
                  setState("welcomePage");
                }}
              >
                이메일로 회원가입
              </CheckButton>
            )}
          </CertificationForm>
        </>
      )}
      {state === "welcomePage" && ""}
    </SignUpBox>
  );
};

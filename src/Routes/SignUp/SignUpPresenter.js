import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//CheckForm----------------------------------------
const CheckBox = styled.div`
  width: 23%;
  margin: 10vh 0 16vh 0;
`;

const CheckBoxTitle = styled.h2`
  text-align: center;
  font-size: 1.3em;
`;

const MainBoxForm = styled.form`
  margin-top: 30px;
`;

const InputLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 18px 0;
`;

const InputCheckBox = styled.input.attrs({
  type: "checkBox"
})``;

const CheckBoxLabel = styled.label`
  display: flex;
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
  width: 45%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
`;

//1.check 2.emailCheck 3.signUpForm
export default ({}) => {
  const [check, setCheck] = useState("check");
  const [disable, setDisable] = useState(true);

  var mustCheckedBox = document.querySelectorAll(".must");

  const mustBoxCheck = () => {
    console.log("lalla");
    var arr = [];
    for (var i = 0; i < mustCheckedBox.length; i++) {
      arr.push(mustCheckedBox[i].checked);
    }
    if (arr.includes(false)) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  return (
    <>
      {check === "check" ? (
        <CheckBox>
          <CheckBoxTitle>이메일로 회원가입</CheckBoxTitle>
          <MainBoxForm>
            <InputLine>
              <CheckBoxLabel>
                <InputCheckBox
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
                <InputCheckBox
                  onClick={() => mustBoxCheck()}
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
                <InputCheckBox
                  name="agree-pp"
                  className="checked must"
                  onClick={() => mustBoxCheck()}
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
                <InputCheckBox name="agree-market-email" className="checked" />
                <Text>이벤트 혜택 및 마케팅 정보 이메일 알림(선택)</Text>
              </CheckBoxLabel>
            </InputLine>
            <hr />
            <InputLine>
              <CheckBoxLabel>
                <InputCheckBox
                  name="adult"
                  className="must"
                  onClick={() => mustBoxCheck()}
                />
                <Text>
                  만 14세 이상입니다.<b style={{ color: "red" }}>(필수)</b>
                </Text>
              </CheckBoxLabel>
            </InputLine>
            <ButtonBox>
              <CheckButton style={{ backgroundColor: "#ffffff" }}>
                취소
              </CheckButton>
              <CheckButton disabled={disable}>확인</CheckButton>
            </ButtonBox>
          </MainBoxForm>
        </CheckBox>
      ) : (
        ""
      )}
    </>
  );
};

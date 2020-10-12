import React, { useState, isValidElement, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../../../Components/Button";

const BigContainer = styled.div`
  margin-top: 50px;
  height: 65vh;
`;

const Container = styled.div`
  max-width: 400px;
  margin-top: 64px;
`;

const FindPasswordTitle = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.3em;
`;

const MainBox = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const TextBox = styled.div`
  display: flex;
  width: 90%;
`;

const Text = styled.p`
  font-size: 1.1em;
`;

const FindPasswordDescription = styled.p`
  line-height: 1.5;
  padding: 0 30px 0 30px;
`;

const FindPasswordInput = styled.input.attrs((props) => ({}))`
  display: block;
  width: 330px;
  margin: 30px 30px 0 30px;
  border: none;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;

const FindPasswordBtn = styled.button`
  margin: 30px 30px 30px 30px;
  width: 330px;
  background: #4996c4;
  border: none;
  color: white;
  font-size: 1em;
  border-radius: 3px;
  height: 5vh;
`;

export default ({
  email,
  sendSecret,
  data,
  newPassword,
  requestSecretMutation,
  userSecretKeyUpdateMutation,
  confirmSecretMutation,
  updatePasswordMutation
}) => {
  let isTrue = false;
  let isMutation = "";
  const [state, setState] = useState("");
  const [value, setValue] = useState("");
  const [viewChange, setViewChange] = useState("");
  const [inflow, setInflow] = useState("");
  //무한렌더를 막기위한 hooks
  const [isRender, setIsRender] = useState(false);

  if (data && data.checkUserEmail !== undefined) {
    isTrue = true;
  }
  if (isTrue) {
    if (data && data.checkUserEmail !== undefined && !isRender) {
      setInflow(data.checkUserEmail.inflow);
      setIsRender(true);
    }
  }

  useEffect(() => {
    setIsRender("");
  }, [data]);

  return (
    <BigContainer>
      <Container>
        {viewChange === "" ? (
          <>
            <FindPasswordTitle>비밀번호 찾기</FindPasswordTitle>
            {state === "" || state === "noEmail" || state === "socialEmail" ? (
              <FindPasswordDescription>
                비밀번호를 다시 설정하시려면 아래 입력창에 본인의 메일 주소를
                입력하세요.
              </FindPasswordDescription>
            ) : value === false || value === "" ? (
              <FindPasswordDescription>
                해당 이메일로 발송된 시크릿 코드를 입력해주세요 📦
              </FindPasswordDescription>
            ) : (
              <FindPasswordDescription>
                변경할 비밀번호를 입력해주세요 🔐
              </FindPasswordDescription>
            )}

            {state === "Email" && (value === "" || value === false) ? (
              <FindPasswordInput
                readOnly
                type="email"
                {...email}
                placeholder="이메일"
              />
            ) : value === false ||
              (value === true && state === "confirmSecret") ? (
              <FindPasswordInput
                type="email"
                readOnly
                {...email}
                placeholder="이메일을 입력하세요."
              />
            ) : (
              <FindPasswordInput
                onKeyDownCapture={async (e) => {
                  if (e.keyCode === 13 && !isTrue) {
                    setState("noEmail");
                    toast.error("이메일 정보를 다시한번 확인 부탁드립니다 😢");
                  }
                  if (e.keyCode === 13 && isTrue) {
                    setState("Email");
                    await userSecretKeyUpdateMutation();
                    toast.success(
                      "해당 이메일로 시크릿 코드가 전송되었습니다 ✅"
                    );
                  }
                }}
                type="email"
                {...email}
                placeholder="이메일을 입력하세요."
              />
            )}

            {state === "noEmail" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  paddingLeft: "30px",
                  paddingTop: "10px"
                }}
              >
                해당 이메일은 존재하지 않는 이메일입니다.
              </p>
            ) : state === "socialEmail" ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  paddingLeft: "30px",
                  paddingTop: "10px"
                }}
              >
                해당 이메일 소셜이메일로 가입한 이메일입니다.
              </p>
            ) : (
              ""
            )}
            {isTrue ? (
              state === "Email" || value === false ? (
                <>
                  <FindPasswordInput
                    type="email"
                    {...sendSecret}
                    onKeyDown={async (e) => {
                      if (e.keyCode === 13) {
                        setState("confirmSecret");
                        isMutation = await confirmSecretMutation();
                        setValue(isMutation.data.findPasswordConfirmSecret);

                        if (isMutation.data.findPasswordConfirmSecret) {
                          toast.success("시크릿 코드 인증이 완료되었습니다 ✅");
                        } else {
                          toast.error(
                            "시크릿 코드값을 다시한번 확인 하시길 바랍니다 😓"
                          );
                        }
                      }
                    }}
                    placeholder="시크릿 번호를 입력하세요"
                  />
                  <FindPasswordBtn
                    type="button"
                    onClick={async () => {
                      setState("confirmSecret");
                      isMutation = await confirmSecretMutation();
                      setValue(isMutation.data.findPasswordConfirmSecret);

                      if (isMutation.data.findPasswordConfirmSecret) {
                        toast.success("시크릿 코드 인증이 완료되었습니다 ✅");
                      } else {
                        toast.error(
                          "시크릿 코드값을 다시한번 확인 하시길 바랍니다 😓"
                        );
                      }
                    }}
                  >
                    확인
                  </FindPasswordBtn>
                </>
              ) : value === true ? (
                <>
                  <FindPasswordInput
                    type="password"
                    {...newPassword}
                    onKeyDown={async (e) => {
                      if (e.keyCode === 13) {
                        await updatePasswordMutation();
                        toast.success("비밀번호 변경이 완료되었습니다 🎉");
                        setViewChange("done");
                      }
                    }}
                    placeholder="새로운 비밀번호를 입력하세요"
                  />
                  <FindPasswordBtn
                    type="button"
                    onClick={async () => {
                      await updatePasswordMutation();
                      toast.success("비밀번호 변경이 완료되었습니다 🎉");
                      setViewChange("done");
                    }}
                  >
                    비밀번호 변경
                  </FindPasswordBtn>
                </>
              ) : (
                //해당 db에 해당 이메일이 있는경우에 나오는 버튼
                <>
                  <FindPasswordBtn
                    type="button"
                    onClick={async () => {
                      if (inflow === "weberyday") {
                        setState("Email");
                        await userSecretKeyUpdateMutation();
                        toast.success(
                          "해당 이메일로 시크릿 코드가 전송되었습니다 ✅"
                        );
                      } else {
                        setState("socialEmail");
                        toast.error(
                          "해당 이메일은 소셜계정과 연결된 계정입니다 🙂",
                          "해당 소셜 로그인을 이용해주세요!"
                        );
                      }
                    }}
                  >
                    확인
                  </FindPasswordBtn>
                </>
              )
            ) : (
              //email이 계정 정보에 없을 경우 나오는 버튼
              <FindPasswordBtn
                type="button"
                onClick={() => {
                  setState("noEmail");
                  toast.error("이메일 정보를 다시한번 확인 부탁드립니다 😢");
                }}
              >
                확인
              </FindPasswordBtn>
            )}
          </>
        ) : (
          <>
            <Title>🔒비밀번호 변경을 완료하였습니다 🔒</Title>
            <MainBox
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "50px"
              }}
            >
              <img src="../Images/weberydayTextLogo.png" width="200px" />
              <TextBox
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "60px"
                }}
              >
                <br />
                <Text>
                  새롭게 변경된 계정으로 로그인하여 주시길 바랍니다 😁
                </Text>
              </TextBox>
              <Link to="/">
                <FindPasswordBtn>메인화면으로</FindPasswordBtn>
              </Link>
            </MainBox>
          </>
        )}
      </Container>
    </BigContainer>
  );
};

import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-apollo-hooks";
import { LOG_IN, LOCAL_LOG_IN, FIND_USER } from "./AuthQuery";
import AuthPresenter from "./AuthPresenter";

export default ({ isLoggedIn, style }) => {
  const [action, setAction] = useState("logIn");
  const email = useInput("");
  const password = useInput("");

  //weberyday로 로그인 할때
  const [loginMuation] = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });

  //weberyday로그인 하고나서 토큰 값 회원 브라우저에 저장하기
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const localFindUser = useQuery(FIND_USER);

  //TO DO
  //1. 로그인 유지상태 만들기
  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value === "") {
        toast.error("이메일 입력해주세요🧑‍💻");
      } else if (password.value === "") {
        toast.error("비밀번호를 입력해주세요👩‍💻");
      }
      if (email.value !== "" && password.value !== "") {
        try {
          //로그인 해서 토큰 생성하기
          const {
            data: { signIn: token }
          } = await loginMuation();

          if (token === "" || token === undefined) {
            toast.error("가입하지 않은 이메일이거나, 잘못된 비밀번호입니다 🥺");
          }

          if (token !== "" || token !== undefined) {
            await localLogInMutation({ variables: { token } });
            setAction("logInUser");
          }
          if (localStorage.getItem("token")) {
            console.log("lalala");
            const aa = localFindUser;
            console.log(aa);
          }
        } catch (e) {
          console.log(e);
          return "가입하지 않은 이메일이거나, 잘못된 비밀번호입니다 🥺";
        }
      }
    }
  };

  return (
    <AuthPresenter
      isLoggedIn={isLoggedIn}
      email={email}
      password={password}
      onSubmit={onSubmit}
      action={action}
      setAction={setAction}
      style={style}
    />
  );
};

import React, { useState, useEffect } from "react";
import MePresenter from "./MePresenter";
import useInput from "../../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { EDIT_USER, FIND_USER, FIND_USER_INFO } from "./MeQuery";
import { toast } from "react-toastify";

export default () => {
  const [state, setState] = useState("");
  const currentPassword = useInput("");
  const newPassword = useInput("");
  const newPasswordConfirm = useInput("");

  let onPasswordDisabled = true;
  let onEventDisabled = true;

  //비밀번호 수정 part
  const { data, loading, error } = useQuery(FIND_USER, {
    variables: {
      password: currentPassword.value
    }
  });

  //회원정보중 생년월일 관련 part
  const {
    data: userInfo,
    loading: userInfoLoading,
    error: userInfoError
  } = useQuery(FIND_USER_INFO);

  //로그인하고 난후 개인정보수정에서 생년월일/성별을 들어갔을때 아직 로드가 되지 않아서 정보가 안나오는 경우를 방지하기 위함
  if (localStorage.getItem("token") !== null && userInfo !== undefined) {
    if (Object.keys(userInfo).length === 0) {
      window.location.reload();
    }
  }

  if (
    currentPassword.value !== "" &&
    newPassword.value !== "" &&
    newPasswordConfirm.value !== ""
  ) {
    onPasswordDisabled = false;
  } else {
    onPasswordDisabled = true;
  }

  const [passwordChangeMuataion] = useMutation(EDIT_USER, {
    variables: {
      password: newPassword.value,
      actions: "EDIT"
    }
  });

  useEffect(() => {
    onSubmit();
    setState("");
  }, [state]);

  const onSubmit = async () => {
    if (state === "passwordChange") {
      if (data !== undefined) {
        if (Object.keys(data).length === 1) {
          if (newPassword.value === newPasswordConfirm.value) {
            await passwordChangeMuataion();
            toast.success("비밀번호 변경이 완료되었습니다 ✅");
            currentPassword.setValue("");
            newPassword.setValue("");
            newPasswordConfirm.setValue("");

            //비밀번호를 수정한 후에 예를 들어 현재 비밀번호가 123이였는데 12로 비밀번호를 수정한후 다시 비밀번호를 수정하려고 하면 12와 123둘중 하나를
            //현재 비밀번호에 입력해도 user데이터를 가져와 버리는 상황을 방지하기 위함
            window.location.reload();
            return true;
          } else {
            toast.error(
              "새 비밀번호와 재입력에 입력하신 부분의 정보가 일치하지 않습니다."
            );
            return false;
          }
        } else {
          toast.error("입력하신 현재 비밀번호가 틀렸습니다.");
          return false;
        }
      }
    }
    if (state === "birthdayChange") {
      if (userInfo !== undefined) {
        console.log(userInfo);
      }
    }
    if (state === "nEventChange") {
      if (userInfo !== undefined) {
        console.log("Asdddddd", userInfo);
      }
    }
  };

  return (
    <MePresenter
      currentPassword={currentPassword}
      newPassword={newPassword}
      newPasswordConfirm={newPasswordConfirm}
      onSubmit={onSubmit}
      setState={setState}
      userInfo={userInfo}
      userInfoLoading={userInfoLoading}
      userInfoError={userInfoError}
      onPasswordDisabled={onPasswordDisabled}
    />
  );
};

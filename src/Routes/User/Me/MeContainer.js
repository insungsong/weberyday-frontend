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

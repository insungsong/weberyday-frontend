import React, { useState, useEffect } from "react";
import MePresenter from "./MePresenter";
import useInput from "../../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { EDIT_USER, FIND_USER, FIND_USER_INFO } from "./MeQuery";
import { toast } from "react-toastify";
import useRadioInput from "../../../Hooks/useRadioInput";
import useBirthdayInput from "../../../Hooks/useBirthdayInput";
import useAgreePrivacyInput from "../../../Hooks/useAgreePrivacyInput";
import useRadioEvent from "../../../Hooks/useRadioEvent";
import * as jwtDecode from "jwt-decode";

export default () => {
  const [state, setState] = useState("");
  const email = localStorage.getItem("userEmailToken");
  const currentPassword = useInput("");
  const newPassword = useInput("");
  const newPasswordConfirm = useInput("");
  const gender = useRadioInput("");
  const birthdayInfo = useBirthdayInput("");
  const agreePrivacy = useAgreePrivacyInput("");
  const nEvent = useRadioEvent("");

  //회원탈퇴를 하는경우 해당 회원탈퇴를 하는 회원의 탈퇴사유를 keepUser데이터를 update할때 보내주기 위함
  const [signOutReason, setSignOutReason] = useState("");

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

  if ((userInfo && userInfo.findUserInfo) !== undefined) {
    //해당 회원이 정보를 바꾸지 않고 그대로 저장하기를 누웠을때 그 정보를 주는 것
    if (gender.get === "0") {
      gender.get = userInfo.findUserInfo.gender;
    }
    if (birthdayInfo.year === "") {
      birthdayInfo.setYear(Number(userInfo.findUserInfo.birthday.slice(0, 4)));
    }
    if (birthdayInfo.month === "") {
      birthdayInfo.setMonth(Number(userInfo.findUserInfo.birthday.slice(4, 6)));
    }
    if (birthdayInfo.day === "") {
      birthdayInfo.setDay(Number(userInfo.findUserInfo.birthday.slice(6, 8)));
    }

    //이벤트 정보동의에 대한 정보를 가져오는 곳
    if (nEvent.value === "0") {
      nEvent.setValue(userInfo.findUserInfo.nEvent);
    }
  }

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

  const [birthdayChangeMutation] = useMutation(EDIT_USER, {
    variables: {
      birthday: birthdayInfo.birthday,
      gender: gender.get,
      agreePrivacy: agreePrivacy.value,
      actions: "EDIT"
    }
  });

  const [nEventChangeMutation] = useMutation(EDIT_USER, {
    variables: {
      nEvent: nEvent.value,
      actions: "EDIT"
    }
  });

  //회원 탈퇴를 시키기 위한 Mutation
  const [signOutMutation] = useMutation(EDIT_USER, {
    variables: {
      email,
      signOutReason,
      actions: "DELETE"
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
            try {
              await passwordChangeMuataion();
            } catch (e) {
              let token = "";
              if (localStorage.getItem("token")) {
                try {
                  token = jwtDecode(localStorage.getItem("token"));
                } catch (e) {
                  localStorage.removeItem("userEmailToken");
                  localStorage.removeItem("token");
                  toast.success(
                    "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
                  );
                  setTimeout(() => {
                    window.location.reload();
                  }, [1500]);
                }
              }
            }
            currentPassword.setValue("");
            newPassword.setValue("");
            newPasswordConfirm.setValue("");
            //비밀번호를 수정한 후에 예를 들어 현재 비밀번호가 123이였는데 12로 비밀번호를 수정한후 다시 비밀번호를 수정하려고 하면 12와 123둘중 하나를
            //현재 비밀번호에 입력해도 user데이터를 가져와 버리는 상황을 방지하기 위함

            toast.success("비밀번호 변경이 완료되었습니다 ✅");
            setTimeout(() => {
              window.location.reload();
            }, 1200);
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
        try {
          if (
            birthdayInfo.birthday === "0" ||
            birthdayInfo.birthday === "00" ||
            birthdayInfo.birthday === "000" ||
            birthdayInfo.birthday.length === 8
          ) {
            try {
              await birthdayChangeMutation();
            } catch (e) {
              let token = "";
              if (localStorage.getItem("token")) {
                try {
                  token = jwtDecode(localStorage.getItem("token"));
                } catch (e) {
                  localStorage.removeItem("userEmailToken");
                  localStorage.removeItem("token");
                  toast.success(
                    "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
                  );
                  setTimeout(() => {
                    window.location.reload();
                  }, [1500]);
                }
              }
            }
            toast.success("개인정보 변경이 완료되었습니다😆");
          } else {
            toast.error("생년월일을 정확히 기입해 주시기 바랍니다.");
          }
        } catch (e) {
          console.log(e);
          toast.error("변경사항이 없습니다 변경사항을 입력해주세요🙁");
        }
      }
    }

    if (state === "nEventChange") {
      if (userInfo !== undefined) {
        try {
          await nEventChangeMutation();
          toast.success("이벤트 정보 알림 수신 정보가 수정되었습니다🤗");
        } catch (e) {
          toast.error("해당정보를 변경할 수 없습니다. 문의부탁드립니다.🧑‍💻");
        }
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
      gender={gender}
      nEvent={nEvent}
      birthdayInfo={birthdayInfo}
      agreePrivacyInfo={agreePrivacy}
      setSignOutReason={setSignOutReason}
      signOutMutation={signOutMutation}
    />
  );
};

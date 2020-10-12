import React, { useState } from "react";
import SignUpPresenter from "./SignUpPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  REQUEST_SECRET,
  CONFIRM_SECRET,
  CREATE_ACCOUNT,
  IS_EXIST_KEEP_USER
} from "./SignUpQuery";
import { toast } from "react-toastify";
import useRadioInput from "../../Hooks/useRadioInput";
import useBirthdayInput from "../../Hooks/useBirthdayInput";
import useAgreePrivacyInput from "../../Hooks/useAgreePrivacyInput";
import useAgreeInfoInput from "../../Hooks/useAgreeInfoInput";
import { LOG_IN, LOCAL_LOG_IN } from "../Auth/AuthQuery";

export default () => {
  const [action, setAction] = useState("certification");

  //secretCode가 true인지 false인지에 따라, 그에 맞는 값을 Presenter에게 던져주기 위함
  const [secretCodeIsExist, setSecretCodeIsExist] = useState(false);

  const email = useInput("");
  const secretCode = useInput("");
  const password = useInput("");
  const gender = useRadioInput("");
  const birthdayInfo = useBirthdayInput("");
  const agreeInfo = useAgreeInfoInput(false);
  const agreePrivacy = useAgreePrivacyInput(false);
  const nEvent = useAgreePrivacyInput(false);

  //현재 유저가 로그인한 유저인지를 확인하기 위함
  if (localStorage.getItem("userEmailToken")) {
    window.location.href = "/";
  }

  const {
    data: isExistKeepUserData,
    loading: isExistKeepUserLoading,
    error: isExistKeepUserError
  } = useQuery(IS_EXIST_KEEP_USER, {
    variables: { email: email.value }
  });

  let isExistKeepUser = false;
  if (
    isExistKeepUserData &&
    isExistKeepUserData.isExistKeepUser !== undefined
  ) {
    isExistKeepUser = isExistKeepUserData.isExistKeepUser;
  }

  const [reqeustSecretMutation] = useMutation(REQUEST_SECRET, {
    variables: {
      email: email.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secretCode: secretCode.value
    }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      password: password.value,
      inflow: "weberyday",
      gender: gender.get,
      certification: false,
      birthday: birthdayInfo.birthday,
      rank: "user",
      nEvent: nEvent.value,
      agreePrivacy: !gender.disabled
    }
  });

  const [sigInMutation] = useMutation(LOG_IN, {
    variables: {
      email: email.value,
      password: password.value
    }
  });
  //weberyday로그인 하고나서 토큰 값 회원 브라우저에 저장하기
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    if (action === "certification") {
      try {
        const {
          data: { requestSecret }
        } = await reqeustSecretMutation();

        if (requestSecret && !isExistKeepUser) {
          toast.success("해당 이메일로 시크릿코드를 전달해드렸습니다 ✅");
          setAction("signUpForm");
          return true;
        } else if (isExistKeepUser) {
          toast.error(
            "해당 이메일은 탈퇴를 진행했던 이메일 정보입니다 다른 이메일을 사용부탁드립니다 😥"
          );
          return false;
        } else {
          toast.error("해당 이메일로 시크릿코드 전달을 실패하였습니다. 😅");
          return false;
        }
      } catch (e) {
        toast.error("이미 가입한 이메일 또는 탈퇴한 계정 정보입니다 😭");
        return false;
      }
    }
    if (action === "signUpForm") {
      try {
        const {
          data: { confirmSecret }
        } = await confirmSecretMutation();

        if (confirmSecret) {
          toast.success("인증에 성공하였습니다. 다음절차로 이동합니다.😀");
          setSecretCodeIsExist(true);
          setAction("signUpDone");
        } else {
          toast.error(
            "인증에 실패하셨습니다. 시크릿코드를 다시 한번 확인하시길 바랍니다.😭"
          );
          setSecretCodeIsExist(false);
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (action === "signUpDone") {
      try {
        const {
          data: { createAccount }
        } = await createAccountMutation();

        if (createAccount) {
          toast.success("🎉 회원가입이 완료되었습니다 🎉");

          //이 문장만 실행하면 회원가입 하자마자 로그인을 시켜주지만, 이렇게 될 경우에 route에서 localStorage를 기준으로 /signUp을 들어올 수 있는 것이기떄문에
          //해당 done!페이지가 망가지게되어 일단 주석처리함
          // const {
          //   data: { signIn: token }
          // } = await sigInMutation();
          // if (token !== "" || token !== undefined) {
          //   localLogInMutation({ variables: { token } });
          //   localStorage.setItem("userEmailToken", email.value);
          // }
          // if (token === "" || token === undefined) {
          //   toast.error(
          //     "서비스가 원활하지 않습니다. 로그인기능으로 로그인 부탁드립니다.😂"
          //   );
          //   return false;
          // }

          return true;
        } else {
          toast.error(
            "회원 가입에 실패하였습니다 관리자에게 문의부탁드립니다.👩‍💻"
          );
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  };

  return (
    <SignUpPresenter
      emailCertification={email}
      secretCode={secretCode}
      secretCodeIsExist={secretCodeIsExist}
      password={password}
      gender={gender}
      birthdayInfo={birthdayInfo}
      agreeInfo={agreeInfo}
      agreePrivacy={agreePrivacy}
      nEvent={nEvent}
      onSubmit={onSubmit}
    />
  );
};

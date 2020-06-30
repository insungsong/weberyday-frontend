import React, { useState } from "react";
import SignUpPresenter from "./SignUpPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { REQUEST_SECRET, CONFIRM_SECRET, CREATE_ACCOUNT } from "./SignUpQuery";
import { toast } from "react-toastify";
import useRadioInput from "../../Hooks/useRadioInput";
import useBirthdayInput from "../../Hooks/useBirthdayInput";
import useAgreePrivacyInput from "../../Hooks/useAgreePrivacyInput";
import useAgreeInfoInput from "../../Hooks/useAgreeInfoInput";

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
      nEvent: false,
      agreePrivacy: !gender.disabled
    }
  });

  const onSubmit = async (e) => {
    if (action === "certification") {
      try {
        const {
          data: { requestSecret }
        } = await reqeustSecretMutation();

        console.log("apple", requestSecret);

        if (requestSecret) {
          toast.success("해당 이메일로 시크릿코드를 전달해드렸습니다 ✅");
          setAction("signUpForm");
          return true;
        } else {
          toast.error("해당 이메일로 시크릿코드 전달을 실패하였습니다. 😅");
          return false;
        }
      } catch (e) {
        toast.error("이미 가입한 이메일입니다. 😭");
        console.log(e);
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

        console.log(createAccount);

        if (createAccount) {
          toast.success("🎉 회원가입이 완료되었습니다 🎉");
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
      onSubmit={onSubmit}
    />
  );
};

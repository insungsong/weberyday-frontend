import React from "react";
import FindPasswordPresenter from "./FindPasswordPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  CHECK_USER_EMAIL,
  USER_SECRET_KEY_UPDATE,
  FIND_PASSWORD_CONFIRM_SECRET,
  USER_PASSWORD_UPDATE
} from "./FindPasswordQuery";
import useInput from "../../../Hooks/useInput";
import { REQUEST_SECRET } from "../../SignUp/SignUpQuery";

export default ({}) => {
  const email = useInput("");
  const sendSecret = useInput("");
  const newPassword = useInput("");

  //해당 이메일이 계정중에 있는지 확인하는 email
  const { data, loading, error } = useQuery(CHECK_USER_EMAIL, {
    variables: { email: email.value }
  });

  //시크릿 코드를 해당 이메일로 보내는 mutation
  const [requestSecretMutation] = useMutation(REQUEST_SECRET, {
    variables: {
      email: email.value
    }
  });

  //db에 secret코드를 넣어놓음
  const [userSecretKeyUpdateMutation] = useMutation(USER_SECRET_KEY_UPDATE, {
    variables: {
      email: email.value
    }
  });

  //이메일로 보내준 시크릿코드와 db에 저장된 시크릿코드를 비교하는 Mutation
  const [confirmSecretMutation] = useMutation(FIND_PASSWORD_CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secretCode: sendSecret.value
    }
  });

  const [updatePasswordMutation] = useMutation(USER_PASSWORD_UPDATE, {
    variables: {
      email: email.value,
      password: newPassword.value
    }
  });

  return (
    <FindPasswordPresenter
      email={email}
      sendSecret={sendSecret}
      data={data}
      requestSecretMutation={requestSecretMutation}
      userSecretKeyUpdateMutation={userSecretKeyUpdateMutation}
      confirmSecretMutation={confirmSecretMutation}
      newPassword={newPassword}
      updatePasswordMutation={updatePasswordMutation}
    />
  );
};

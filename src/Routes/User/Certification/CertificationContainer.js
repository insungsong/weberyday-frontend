import React, { useState } from "react";
import CertificationPresenter from "./CertificationPresenter";
import useInput from "../../../Hooks/useInput";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEARCH_TEAM_NAME, TEAM_NAME_UPLOAD } from "./CertificationQuery";
import useAgreePrivacyInput from "../../../Hooks/useAgreePrivacyInput";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { FIND_USER_INFO } from "../Me/MeQuery";
import Loader from "../../../Components/Loader";

export default withRouter((props) => {
  const [state, setState] = useState("");
  const [myselfCertificaiton, setMyselfCertification] = useState(false);
  const [teamNameCertification, setTeamNameCertification] = useState(false);
  const teamName = useInput("");
  const teamNameAgree = useAgreePrivacyInput(false);

  //내 정보에서 teamName이 있는지를 확인하기 위함
  const {
    data: isMyInfo,
    loading: isMyInfoLoading,
    error: isMyInfoError
  } = useQuery(FIND_USER_INFO);

  //제작팀 이름의 중복확인
  const { data, loading, error } = useQuery(SEARCH_TEAM_NAME, {
    variables: {
      teamName: teamName.value
    }
  });

  //제작팀 등록을 눌렀을때
  const [uploadTeamNameMutation] = useMutation(TEAM_NAME_UPLOAD, {
    variables: {
      teamName: teamName.value
    }
  });

  const onSubmit = async () => {
    if ((data && data.searchTeamName) !== undefined) {
      if (myselfCertificaiton === true && data.searchTeamName === true) {
        await uploadTeamNameMutation();
        toast.success("제작팀 등록이 완료되었습니다 😄");
        return props.history.push("/myPostList");
      }
    }
  };

  return !isMyInfoLoading &&
    isMyInfo &&
    isMyInfo.findUserInfo &&
    isMyInfo.findUserInfo.certification !== undefined ? (
    <CertificationPresenter
      myselfCertificaiton={myselfCertificaiton}
      setMyselfCertification={setMyselfCertification}
      teamName={teamName}
      state={state}
      setState={setState}
      onSubmit={onSubmit}
      data={data}
      loading={loading}
      isMyInfo={isMyInfo}
      teamNameCertification={teamNameCertification}
      setTeamNameCertification={setTeamNameCertification}
      teamNameAgree={teamNameAgree}
    />
  ) : (
    <Loader />
  );
});

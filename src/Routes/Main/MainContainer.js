import React, { useEffect, useState } from "react";
import MainPresenter from "./MainPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  ALL_POST,
  ALL_BANNER,
  KAKAO_EMAIL_IN_THE_USER_INFORMATION_DB,
  NAVER_EMAIL_IN_THE_USER_INFORMATION_DB,
  FACEBOOK_EMAIL_IN_THE_USER_INFORMATION_DB
} from "./MainQuery";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";
import { LOCAL_LOG_IN } from "../Auth/AuthQuery";
import { withRouter } from "react-router-dom";
import { FIND_USER_INFO } from "../User/Me/MeQuery";
import * as jwtDecode from "jwt-decode";

export default withRouter((props) => {
  const {
    data: bannerData,
    error: bannerError,
    loading: bannerLoading
  } = useQuery(ALL_BANNER);

  //브라우저에 저장된 쿠키를 알아내기 위한 코드
  const getCookieValue = (key) => {
    let cookieKey = key + "=";
    let result = "";
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      if (cookieArr[i][0] === " ") {
        cookieArr[i] = cookieArr[i].substring(1);
      }

      if (cookieArr[i].indexOf(cookieKey) === 0) {
        result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
        return result;
      }
    }
    return result;
  };

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/episodeUpdate";
    }
  }

  const { data, error, loading } = useQuery(ALL_POST);

  ///////////////////////////////////////////////////////////////////////////
  //해당 localStorage정보 조작을 막는 코드
  //localStorage접근에 대한 막음
  const {
    data: findUserInfoData,
    loading: findUserInfoLoading,
    error: findUserInfoError
  } = useQuery(FIND_USER_INFO);

  //localStorage로 부터 email정보를 얻어오는 hooks
  const [
    currentLocalStorageEmailValue,
    setCurrentLocalStorageEmailValue
  ] = useState(localStorage.getItem("userEmailToken"));

  useEffect(() => {
    setCurrentLocalStorageEmailValue(localStorage.getItem("userEmailToken"));

    if (
      findUserInfoData &&
      findUserInfoData.findUserInfo &&
      findUserInfoData.findUserInfo.email !== undefined &&
      findUserInfoData.findUserInfo.email !== currentLocalStorageEmailValue
    ) {
      localStorage.removeItem("userEmailToken");
      localStorage.removeItem("token");
      toast.success(
        "해당 계정정보 조작으로 인하여 로그아웃됨을 알려드립니다. 😎"
      );
      setTimeout(() => {
        window.location.reload();
      }, [1500]);
    }

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

    if (
      findUserInfoData &&
      findUserInfoData.findUserInfo &&
      findUserInfoData.findUserInfo.email &&
      token !== undefined
    ) {
      if (findUserInfoData.findUserInfo.id !== token.id) {
        localStorage.removeItem("userEmailToken");
        localStorage.removeItem("token");
      }
    }
  }, [findUserInfoLoading, findUserInfoData, currentLocalStorageEmailValue]);
  ///////////////////////////////////////////////////////////////////////////

  //카카오 email이 있는지 확인하기 위함
  const [KakaoEmailInTheUserInformationDBMutation] = useMutation(
    KAKAO_EMAIL_IN_THE_USER_INFORMATION_DB
  );

  //네이버 email이 있는지 확인하기 위함
  const [naverEmailInTheUserInformationDBMutation] = useMutation(
    NAVER_EMAIL_IN_THE_USER_INFORMATION_DB
  );

  //fb email이 있는지 확인하기 위함
  const [fbEmailInTheUserInformationDBMutation] = useMutation(
    FACEBOOK_EMAIL_IN_THE_USER_INFORMATION_DB
  );

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const kakaoLoginFunc = async () => {
    //카카오 로그인
    if (getCookieValue("current_kakaoUser")) {
      const currentKakaoEmail = decodeURIComponent(
        getCookieValue("current_kakaoUser")
      );
      let currentKaKaoCookieValue = currentKakaoEmail;
      try {
        deleteAllCookies();
        const {
          data: { kakaoEmailInTheUserInfomation }
        } = await KakaoEmailInTheUserInformationDBMutation({
          variables: {
            email: currentKaKaoCookieValue
          }
        });
        await localLogInMutation({
          variables: { token: kakaoEmailInTheUserInfomation }
        });

        localStorage.setItem("userEmailToken", currentKaKaoCookieValue);
        toast.success("카카오 로그인이 되었습니다. ✅");
        return true;
      } catch (e) {
        deleteAllCookies();
        toast.error(
          "해당 카카오 이메일은 weberyday에 등록된 이메일 또는 탈퇴 계정 이메일입니다 웨브리데이 로그인을 이용해주세요 😁"
        );
        return false;
      }
    }
  };

  kakaoLoginFunc();

  //네이버 로그인
  const naverLoginFunc = async () => {
    if (getCookieValue("current_NaverUser")) {
      const currentNaverEmail = decodeURIComponent(
        getCookieValue("current_NaverUser")
      );
      let currentNaverCookieValue = currentNaverEmail;
      try {
        deleteAllCookies();
        const {
          data: { naverEmailInTheUserInfomation }
        } = await naverEmailInTheUserInformationDBMutation({
          variables: {
            email: currentNaverCookieValue
          }
        });
        await localLogInMutation({
          variables: { token: naverEmailInTheUserInfomation }
        });

        localStorage.setItem("userEmailToken", currentNaverCookieValue);
        toast.success("네이버 로그인이 되었습니다. ✅");
        return true;
      } catch (e) {
        deleteAllCookies();
        toast.error(
          "해당 네이버 이메일은 weberyday에 등록된 이메일 또는 탈퇴 계정 이메일입니다 웨브리데이 로그인을 이용해주세요 😁"
        );
        return false;
      }
    }
  };
  naverLoginFunc();
  //페이스북 로그인
  const facebookLoginFunc = async () => {
    let currentFacebookUserEmail = props.location.search.split("=")[1];
    if (props.location.search.split("=")[1] !== undefined) {
      props.location.search = "";
      console.log("currentFacebookUserEmail", currentFacebookUserEmail);
      try {
        //if문안으로 들어와서 무한 렌더가 나게 하지 않게 하기위함
        const {
          data: { facebookEmailInTheUserInfomation }
        } = await fbEmailInTheUserInformationDBMutation({
          variables: {
            email: currentFacebookUserEmail
          }
        });
        await localLogInMutation({
          variables: { token: facebookEmailInTheUserInfomation }
        });

        localStorage.setItem("userEmailToken", currentFacebookUserEmail);
        toast.success("페이스북 로그인이 되었습니다. ✅");

        //무한렌더를 막기위한 url변경
        props.history.push("/");

        return true;
      } catch (e) {
        props.location.search = "";
        toast.error(
          "해당 페이스북 이메일은 weberyday에 등록된 이메일 또는 탈퇴 계정 이메일입니다 웨브리데이 로그인을 이용해주세요 😁"
        );

        //무한렌더를 막기위한 url변경
        props.history.push("/");
        return false;
      }
    }
  };

  facebookLoginFunc();

  return (
    <>
      {!loading && data && data.allPost !== undefined ? (
        <MainPresenter data={data} bannerData={bannerData} loading={loading} />
      ) : (
        <Loader />
      )}
    </>
  );
});

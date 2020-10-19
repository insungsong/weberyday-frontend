import React, { useEffect, useState } from "react";
import MyPostListPresenter from "./MyPostListPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { FIND_USER_INFO } from "../../../Me/MeQuery";
import { UPLOAD_POST } from "../PostUpload/PostUploadQuery";
import Loader from "../../../../../Components/Loader";
import { withRouter } from "react-router-dom";

export default withRouter((props) => {
  const { data, loading, error, refetch } = useQuery(FIND_USER_INFO);

  const [filter, setFilter] = useState("");

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
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/myPostList";
    }
  }

  //인코딩이 깨져서 디코딩해주는 것
  // const thumnailEncodingValue = decodeURIComponent(
  //   getCookieValue("postThumnail")
  // );
  console.log(props.location.search.split("&"));
  console.log("---------------------------");
  // console.log(props.location.search.split("&")[0].split("=")[1]);
  // console.log(props.location.search.split("&")[1].split("=")[1]);
  // console.log(props.location.search.split("&")[2].split("=")[1]);
  // console.log(props.location.search.split("&")[3].split("=")[1]);
  
  const beforePostThumnail = props.location.search.split("&")[0];
  const postThumnail = beforePostThumnail.split("=")[1];
  console.log("postThumnail",postThumnail);

  // const backgroundImgEncodingValue = decodeURIComponent(
  //   getCookieValue("postBackgroundImg")
  // );
  const beforePostBackgroundImg = props.location.search.split("&")[1];
  const postBackgroundImg = beforePostBackgroundImg.split("=")[1];
  console.log("postBackgroundImg",postBackgroundImg);
  
  // const s3PostThumnailIdEncodingValue = decodeURIComponent(
  //   getCookieValue("s3PostThumnailId")
  //   );
  const beforeS3PostThumnaildId = props.location.search.split("&")[2];
  const s3PostThumnailId = beforeS3PostThumnaildId.split("=")[1];
  console.log("s3PostThumnailId",s3PostThumnailId);

  // const s3PostBackgroundImgIdEncodingValue = decodeURIComponent(
  //   getCookieValue("s3PostBackgroundImgId")
  // );
  const beforeS3PostBackgroundImgId = props.location.search.split("&")[3];
  const s3PostBackgroundImgId = beforeS3PostBackgroundImgId.split("=")[1];
  console.log("s3PostBackgroundImgId",s3PostBackgroundImgId);

  const [uploadPostMutation] = useMutation(UPLOAD_POST, {
    variables: {
      title: getCookieValue("postTitle"),
      description: getCookieValue("postDescription"),
      thumbnail: postThumnail,
      backgroundImage: postBackgroundImg,
      s3ThumbnailId: s3PostThumnailId,
      s3BackgroundImageId: s3PostBackgroundImgId,
      category: getCookieValue("postGenre"),
      broadcast: getCookieValue("postBroadcast") === "true",
      uploadDay: getCookieValue("postUpload").split(",")
    }
  });

  //쿠키를 지움
  useEffect(() => {
    document.cookie = `postTitle=0;max-age=1`;
    document.cookie = `postDescription=0;max-age=1`;
    document.cookie = `postGenre=0;max-age=1`;
    document.cookie = `postBroadcast=0;max-age=1`;
    document.cookie = `postUpload=0;max-age=1`;
    document.cookie = `postThumnail=0;max-age=1`;
    document.cookie = `postBackgroundImg=0;max-age=1`;
    document.cookie = `s3PostThumnailId=0;max-age=1`;
    document.cookie = `s3PostBackgroundImgId=0;max-age=1`;
  }, [filter]);
  //localHost:5000에 갔다가 돌아와서 해당 쿠키들이 다 있는지 확인하고 있다면  uploadPostMutation을 실행하는 조건의 코드
  if (
    getCookieValue("postTitle") &&
    getCookieValue("postDescription") &&
    getCookieValue("filterCookie") === "true" &&
    props.location.search.split("=")[1] !== undefined 
  ) {
    //무한 렌더를 막기위해
    props.location.search = "";
    document.cookie = `filterCookie=${false};max-age=1`;
    uploadPostMutation();
  }
  deleteAllCookies();

  return loading ? (
    <Loader />
  ) : (
    <MyPostListPresenter postData={data} error={error} refetch={refetch} />
  );
});

import React, { useEffect, useState } from "react";
import EpisodeOfPostPresenter from "./EpisodeOfPostPresenter";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ONE_OF_POST } from "./EpisodeOfPostQuery";
import { EDIT_POST } from "../MyPostListUpdate/MyPostListUpdateQuery";
import { UPLOAD_EPISODE } from "../EpisodeUpload/EpisodeUploadQuery";
import Loader from "../../../../../Components/Loader";
import { toast } from "react-toastify";

export default withRouter((props) => {
  const postId = props.match.params.id;
  const [filter, setFilter] = useState("");
  const [render, setRender] = useState("");

  const { data, loading, error, refetch } = useQuery(ONE_OF_POST, {
    variables: {
      id: postId
    }
  });

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
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/myPostUpdate";
    }
  }

  //url의 형태에 따라 변화하는 값 만들기
  const isPostThumnailFirst = props.location.search.split("=")[0];
  let postThumnail = "";
  let s3PostThumnailId = "";
  let postBackgroundImg = "";
  let s3PostBackgroundImgId = "";

  //인코딩이 깨져서 디코딩해주는 것
  //작품 페이지를 update하는 문
  const thumbnailImgEncodingValue = () => {
    if (postThumnail === "") {
      return decodeURIComponent(getCookieValue("dbPostThumbnail"));
    } else {
      return postThumnail;
    }
  };

  const backgroundImgFileEncodingValue = () => {
    if (postBackgroundImg === "") {
      return decodeURIComponent(getCookieValue("dbPostBackgroundImage"));
    } else {
      return postBackgroundImg;
    }
  };

  const s3PostThumnailIdEncodingValue = () => {
    if (
      //여기 if문 안에 있는 것은, localhost5000에서 넘어온 쿠키에 들어있는 정보를 말한다.
      s3PostThumnailId === ""
    ) {
      //만약 localhost5000 넘어온 값이 없다면 해당 prisma db에 들어있는 내용을 다시 새로운 쿠키에 넣음
      return getCookieValue("s3DbThumbnail");
    } else {
      // localhost5000에서 얻어온 새로운 값이 있다면 그 값을 return 함
      return s3PostThumnailId;
    }
  };

  const s3PostBackgroundImgIdEncodingValue = () => {
    if (
      //여기 if문 안에 있는 것은, localhost5000에서 넘어온 쿠키에 들어있는 정보를 말한다.
      s3PostBackgroundImgId === ""
    ) {
      return getCookieValue("s3DbBackgroundImage");
    } else {
      return s3PostBackgroundImgId;
    }
  };


  //배경이미지 또는 썸네일 둘중 하나만 바꿀 경우의 if문
  if (props.location.search.split("&").length === 2) {
    if (isPostThumnailFirst === "?postThumnail") {
      if (props.location.search.split("&")[0] !== undefined && props.location.search.split("&")[0].split("=")[1] !== undefined) {
        postThumnail = props.location.search.split("&")[0].split("=")[1];
        s3PostThumnailId = props.location.search.split("&")[1].split("=")[1];
      }
    } else {
      if (props.location.search.split("&")[0] !== undefined && props.location.search.split("&")[0].split("=")[1] !== undefined) {
        postBackgroundImg = props.location.search.split("&")[0].split("=")[1];
        s3PostBackgroundImgId = props.location.search.split("&")[1].split("=")[1];
      }
    }
    //url과 썸네일을 둘다 바꿀 경우
  } else {
    if (props.location.search.split("&")[0] !== undefined && props.location.search.split("&")[0].split("=")[1] !== undefined) {
      postThumnail = props.location.search.split("&")[0].split("=")[1];
      postBackgroundImg = props.location.search.split("&")[1].split("=")[1];
      if (props.location.search.split("&")[2] !== undefined && props.location.search.split("&")[2].split("=")[1]) {
        s3PostThumnailId = props.location.search.split("&")[2].split("=")[1];
      }
      if (props.location.search.split("&")[3] !== undefined && props.location.search.split("&")[3].split("=")[1]) {
        s3PostBackgroundImgId = props.location.search.split("&")[3].split("=")[1];
      }
    }
  }



  const isEpisodeImgFile = props.location.search.split("=")[0];
  let episodeImgFile = "";
  let videoFile = "";
  let s3EpisodeImgFile = "";
  let s3VideoFile = "";

  console.log("isEpisodeImgFile", isEpisodeImgFile);
  console.log(props.location.search.split("&"));
  console.log(props.location.search.split("&").length);

  //배경이미지 또는 썸네일 둘중 하나만 바꿀 경우의 if문
  if (props.location.search.split("&").length === 4) {
    if (isEpisodeImgFile === "?episodeImgFile") {
      if (props.location.search.split("&")[0].split("=")[1] !== undefined && props.location.search.split("&")[1].split("=")[1] !== undefined && props.location.search.split("&")[2].split("=")[1] !== undefined && props.location.search.split("&")[3].split("=")[1] !== undefined) {
        episodeImgFile = props.location.search.split("&")[0].split("=")[1];
        videoFile = props.location.search.split("&")[1].split("=")[1];
        s3EpisodeImgFile = props.location.search.split("&")[2].split("=")[1];
        s3VideoFile = props.location.search.split("&")[2].split("=")[1];
      }
    }
  }

  //에피소드를 upload하는 문
  const episodeImgEncodingValue = () => {
    if (episodeImgFile === "") {
      return decodeURIComponent(
        getCookieValue("episodeImgFile")
      );
    } else {
      return episodeImgFile;
    }
  };

  const videoFileEncodingValue = () => {
    if (videoFile === "") {
      return decodeURIComponent(
        getCookieValue("videoFile")
      );
    } else {
      return videoFile;
    }

  }
  //이부분은 s3에서 생성된 정보를 가지고 와서,
  const s3EpisodeImgEncodingValue = () => {
    if (s3EpisodeImgFile === "") {
      return decodeURIComponent(
        getCookieValue("s3EpisodeImgFile")
      );
    } else {
      return s3EpisodeImgFile
    }
  }


  const s3VideoFileEncodingValue = () => {
    if (s3VideoFile === "") {
      return decodeURIComponent(
        getCookieValue("s3VideoFile")
      );
    } else {
      return s3VideoFile
    }
  }





  //MyPostListUpdateContainer.js와 연결된 코드
  //s3로 내용들을 보내 업데이트 해야하는 경우
  const [updatePostMutation] = useMutation(EDIT_POST, {
    variables: {
      id: getCookieValue("postId"),
      title: getCookieValue("postTitle"),
      description: getCookieValue("postDescription"),
      thumbnail: thumbnailImgEncodingValue(),
      backgroundImage: backgroundImgFileEncodingValue(),
      s3ThumbnailId: s3PostThumnailIdEncodingValue(),
      s3BackgroundImageId: s3PostBackgroundImgIdEncodingValue(),
      category: getCookieValue("postGenre"),
      broadcast: getCookieValue("postBroadcast") === "true",
      uploadDay: getCookieValue("postUpload").split(","),
      action: "EDIT"
    }
  });

  //episode create 할때 발생하는 mutation문
  const [episodeUploadMutation] = useMutation(UPLOAD_EPISODE, {
    variables: {
      postId: getCookieValue("postId"),
      title: getCookieValue("EpisodeTitle"),
      description: getCookieValue("EpisodeDescription"),
      thumbnail: episodeImgEncodingValue(),
      file: videoFileEncodingValue(),
      s3ThumbnailId: s3EpisodeImgEncodingValue(),
      s3FileId: s3VideoFileEncodingValue()
    }
  });

  //localHost:5000에 갔다가 돌아와서 해당 쿠키들이 다 있는지 확인하고 있다면  uploadPostMutation을 실행하는 조건의 코드
  if (
    getCookieValue("postId") &&
    getCookieValue("postTitle") &&
    getCookieValue("postDescription") &&
    getCookieValue("postBroadcast") &&
    getCookieValue("filterCookie") === "true"
  ) {
    document.cookie = `filterCookie=${false};max-age=1`;
    try {
      updatePostMutation();
    } catch (e) {
      toast.error(
        "해당 실행의 문제로 인해서 메인 화면으로 이동합니다 문의 부탁드립니다. 👩‍💻"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    setRender("render");
    setFilter("");
  }

  if (
    getCookieValue("postId") &&
    getCookieValue("EpisodeTitle") &&
    getCookieValue("EpisodeDescription") &&
    getCookieValue("filterCookie") === "true"
  ) {
    document.cookie = `filterCookie=${false};max-age=1`;
    try {
      episodeUploadMutation();
    } catch (e) {
      toast.error(
        "해당 실행의 문제로 인해서 메인 화면으로 이동합니다 문의 부탁드립니다. 👩‍💻"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  }

  useEffect(() => {
    document.cookie = `postId=0;max-age=1`;
    document.cookie = `postTitle=0;max-age=1`;
    document.cookie = `postDescription=0;max-age=1`;
    document.cookie = `postGenre=0;max-age=1`;
    document.cookie = `postBroadcast=0;max-age=1`;
    document.cookie = `postUpload=0;max-age=1`;
    document.cookie = `filterCookie=0;max-age=1`;
    document.cookie = `reloadCookie=0;max-age=1`;
    document.cookie = `videoFile=0;max-age=1`;
    document.cookie = `episodeImgFile=0;max-age=1`;
    document.cookie = `EpisodeDescription=0;max-age=1`;
    document.cookie = `EpisodeTitle=0;max-age=1`;
    document.cookie = `s3DbThumbnail=0;max-age=1`;
    document.cookie = `s3DbBackgroundImage=0;max-age=1`;
    document.cookie = `dbPostBackgroundImage=0;max-age=1`;
    document.cookie = `dbPostThumbnail=0;max-age=1`;

    deleteAllCookies();
  }, [filter]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
          <EpisodeOfPostPresenter
            oneOfPost={data}
            loading={loading}
            render={render}
            setRender={setRender}
            refetch={refetch}
          />
        )}
    </>
  );
});


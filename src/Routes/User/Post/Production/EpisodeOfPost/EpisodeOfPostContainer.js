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

  //인코딩이 깨져서 디코딩해주는 것
  //작품 페이지를 update하는 문
  const thumbnailImgEncodingValue = () => {
    if (getCookieValue("postThumnail") === "") {
      return decodeURIComponent(getCookieValue("dbPostThumbnail"));
    } else {
      return decodeURIComponent(getCookieValue("postThumnail"));
    }
  };

  const backgroundImgFileEncodingValue = () => {
    if (getCookieValue("postBackgroundImg") === "") {
      return decodeURIComponent(getCookieValue("dbPostBackgroundImage"));
    } else {
      return decodeURIComponent(getCookieValue("postBackgroundImg"));
    }
  };

  const s3PostThumnailIdEncodingValue = () => {
    if (
      //여기 if문 안에 있는 것은, localhost5000에서 넘어온 쿠키에 들어있는 정보를 말한다.
      getCookieValue("s3PostThumnailId") === ""
    ) {
      //만약 localhost5000 넘어온 값이 없다면 해당 prisma db에 들어있는 내용을 다시 새로운 쿠키에 넣음
      return getCookieValue("s3DbThumbnail");
    } else {
      // localhost5000에서 얻어온 새로운 값이 있다면 그 값을 return 함
      return decodeURIComponent(getCookieValue("s3PostThumnailId"));
    }
  };

  const s3PostBackgroundImgIdEncodingValue = () => {
    if (
      //여기 if문 안에 있는 것은, localhost5000에서 넘어온 쿠키에 들어있는 정보를 말한다.
      getCookieValue("s3PostBackgroundImgId") === ""
    ) {
      return getCookieValue("s3DbBackgroundImage");
    } else {
      return decodeURIComponent(getCookieValue("s3PostBackgroundImgId"));
    }
  };

  //에피소드를 upload하는 문
  const episodeImgEncodingValue = decodeURIComponent(
    getCookieValue("episodeImgFile")
  );

  const videoFileEncodingValue = decodeURIComponent(
    getCookieValue("videoFile")
  );
  //이부분은 s3에서 생성된 정보를 가지고 와서,
  const s3EpisodeImgEncodingValue = decodeURIComponent(
    getCookieValue("s3EpisodeImgFile")
  );

  const s3VideoFileEncodingValue = decodeURIComponent(
    getCookieValue("s3VideoFile")
  );

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
      thumbnail: episodeImgEncodingValue,
      file: videoFileEncodingValue,
      s3ThumbnailId: s3EpisodeImgEncodingValue,
      s3FileId: s3VideoFileEncodingValue
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

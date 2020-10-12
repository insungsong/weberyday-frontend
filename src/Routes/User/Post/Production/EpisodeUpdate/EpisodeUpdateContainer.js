import React, { useState, useEffect } from "react";
import EpisodeUpdatePresenter from "./EpisodeUpdatePresenter";
import { withRouter, Redirect } from "react-router-dom";
import { SEARCH_EPISODE, EDIT_EPISODE } from "./EpisodeUpdateQuery";
import { useQuery, useMutation } from "react-apollo-hooks";
import Loader from "../../../../../Components/Loader";
import useInput from "../../../../../Hooks/useInput";

export default withRouter((props) => {
  const [imgBase64, setImgBase64] = useState("");
  const [videoBase64, setVideoBase64] = useState("");
  const episodeId = props.match.params.id;
  const episodeTitle = useInput("");
  const episodeDescription = useInput("");
  const episodeThumbnail = useInput("");
  const episodeVideoFile = useInput("");

  const { data, loading, error, refetch } = useQuery(SEARCH_EPISODE, {
    variables: {
      episodeId
    }
  });

  let postId = "";
  if (loading === false) {
    postId = data.searchEpisode.post.id;
  }

  const [editEpisodeMutation] = useMutation(EDIT_EPISODE);

  let dbS3ThumbnailId = "";
  let dbS3FileId = "";

  if (loading === false) {
    if (episodeTitle.filter === "Yes") {
      episodeTitle.setValue(data.searchEpisode.title);
      episodeTitle.setFilter("No");
    }
    if (episodeDescription.filter === "Yes") {
      episodeDescription.setValue(data.searchEpisode.description);
      episodeDescription.setFilter("No");
    }
    if (episodeThumbnail.filter === "Yes") {
      episodeThumbnail.setValue(data.searchEpisode.thumbnail);
      episodeThumbnail.setFilter("No");
    }
    if (episodeVideoFile.filter === "Yes") {
      episodeVideoFile.setValue(data.searchEpisode.file);
      episodeVideoFile.setFilter("No");
    }
    dbS3ThumbnailId = data.searchEpisode.s3ThumbnailId;
    dbS3FileId = data.searchEpisode.s3FileId;
  }

  const onSubmit = async (e) => {
    if (e === "noChangeBoth") {
      await editEpisodeMutation({
        variables: {
          episodeId,
          title: episodeTitle.value,
          description: episodeDescription.value,
          thumbnail: episodeThumbnail.value,
          file: episodeVideoFile.value,
          s3ThumbnailId: dbS3ThumbnailId,
          s3FileId: dbS3FileId,
          actions: "EDIT"
        }
      });
    }
    if (e === "changeBoth") {
      document.cookie = `episodeTitle=${episodeTitle.value}`;
      document.cookie = `episodeDescription=${episodeDescription.value}`;
      document.cookie = `filterCookie=${true}`;
      document.cookie = `dbEpisodeThumbnail=${episodeThumbnail.value}`;
      document.cookie = `dbEpisodeVideoFile=${episodeVideoFile.value}`;
      //prisma에 있는 s3정보를 담아줌
      document.cookie = `dbS3ThumbnailId=${dbS3ThumbnailId}`;
      document.cookie = `dbS3FileId=${dbS3FileId}`;
    }
    if (e === "deleteEpisode") {
      await editEpisodeMutation({
        variables: {
          episodeId,
          title: episodeTitle.value,
          description: episodeDescription.value,
          thumbnail: episodeThumbnail.value,
          file: episodeVideoFile.value,
          actions: "DELETE"
        }
      });
    }
  };

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

  const episodeImgEncodingValue = () => {
    if (getCookieValue("episodeImgFile") === "") {
      console.log("episodeImgEncodingValue", "1");
      return decodeURIComponent(getCookieValue("dbEpisodeThumbnail"));
    } else {
      console.log("episodeImgEncodingValue", "2");
      return decodeURIComponent(getCookieValue("episodeImgFile"));
    }
  };

  const videoFileEncodingValue = () => {
    if (getCookieValue("videoFile") === "") {
      console.log("videoFileEncodingValue", "1");
      return decodeURIComponent(getCookieValue("dbEpisodeVideoFile"));
    } else {
      console.log("videoFileEncodingValue", "2");
      return decodeURIComponent(getCookieValue("videoFile"));
    }
  };

  const s3EpisodeImgEncodingValue = () => {
    if (getCookieValue("s3ThumbnailId") === "") {
      return getCookieValue("dbS3ThumbnailId");
    } else {
      return decodeURIComponent(getCookieValue("s3ThumbnailId"));
    }
  };

  const s3VideoFileEncodingValue = () => {
    if (getCookieValue("s3FileId") === "") {
      return getCookieValue("dbS3FileId");
    } else {
      return decodeURIComponent(getCookieValue("s3FileId"));
    }
  };

  const asynAction = async (e) => {
    if (
      getCookieValue("episodeTitle") &&
      getCookieValue("episodeDescription") &&
      getCookieValue("filterCookie") === "true" &&
      episodeImgEncodingValue() !== null &&
      videoFileEncodingValue() !== null &&
      s3EpisodeImgEncodingValue() !== null &&
      s3VideoFileEncodingValue() !== null
    ) {
      document.cookie = `filterCookie=${false};max-age=1`;

      //이 부분을 만든이유는 localhost:5000에 갔다가 다시 돌아와서 이미지가 보여지다가 동영상만 바꿔치기 하는 수정을 했을때 뮤테이션을 할때 정보값이 망가진다.
      let s3EpisodeImgEncodingValueFunValue = s3EpisodeImgEncodingValue();
      let s3ThumbNailUrl = `https://weberyday-test.s3.ap-northeast-2.amazonaws.com/${s3EpisodeImgEncodingValueFunValue}`;

      let s3VideoFileEncodingValueFunValue = s3VideoFileEncodingValue();
      let s3VideoFileUrl = `https://weberyday-test.s3.ap-northeast-2.amazonaws.com/${s3VideoFileEncodingValueFunValue}`;

      await editEpisodeMutation({
        variables: {
          episodeId,
          title: getCookieValue("episodeTitle"),
          description: getCookieValue("episodeDescription"),

          //thumbnail: episodeImgEncodingValue() 해당 부분을 쓰면 에러가 안날때도 있지만 이전의 url값이 thumbnail필드에 저장되어서 데이터를 잃게된다. 즉, s3측에서 가져온 key값(필드로 치면 s3ThumbnailId에 담기는)은 제대로 mutation이 일어나는데 그에반해 thumbNail은 이상한 값을 가지고 있어서 이렇게 하드하게 넣어줌
          thumbnail: s3ThumbNailUrl,

          //file: videoFileEncodingValue() 해당 부분을 쓰면 에러가 안날떄도 있지만 이전의 url값이 저장된다.
          file: s3VideoFileUrl,
          s3ThumbnailId: s3EpisodeImgEncodingValue(),
          s3FileId: s3VideoFileEncodingValue(),
          actions: "EDIT"
        }
      });
    }
  };
  asynAction();
  deleteAllCookies();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <EpisodeUpdatePresenter
          episodeId={episodeId}
          postId={postId}
          episodeTitle={episodeTitle}
          episodeDescription={episodeDescription}
          imgBase64={imgBase64}
          setImgBase64={setImgBase64}
          episodeThumbnail={episodeThumbnail}
          videoBase64={videoBase64}
          setVideoBase64={setVideoBase64}
          episodeVideoFile={episodeVideoFile}
          data={data}
          loading={loading}
          refetch={refetch}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
});

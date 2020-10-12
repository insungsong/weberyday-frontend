import React, { useState, useEffect } from "react";
import MyPostListUpdatePresenter from "./MyPostListUpdatePresenter";
import { withRouter, Redirect } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ONE_OF_POST } from "../EpisodeOfPost/EpisodeOfPostQuery";
import useInput from "../../../../../Hooks/useInput";
import useRadioInput from "../../../../../Hooks/useRadioInput";
import useRadioBroadcast from "../../../../../Hooks/useRadioBroadcast";
import useInputDuplicateCheck from "../../../../../Hooks/useInputDuplicateCheck";
import { FIND_CATEGORY } from "../PostUpload/PostUploadQuery";
import Loader from "../../../../../Components/Loader";
import { EDIT_POST } from "./MyPostListUpdateQuery";
import { FIND_USER_INFO } from "../../../Me/MeQuery";

export default withRouter((props) => {
  const postId = props.match.params.id;
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [backgroundImgBase64, setBackgroundImgBase64] = useState(""); // 파일 base64

  const postTitle = useInput("");
  const postThumbnail = useInput("");
  const postBackgroundImage = useInput("");
  const postDescription = useInput("");
  const postGenre = useRadioInput("");
  const postBroadcast = useRadioBroadcast("");
  const postUploadDay = useInputDuplicateCheck("");

  // //해당 s3에 따른 thunbnail정보와 backgroundImg를 담는 hooks
  const [s3Thumbnail, setS3Thumbnail] = useState("");
  const [s3BackgroundImage, setS3BackgroundImage] = useState("");

  const {
    data: categoryData,
    loading: catecoryLoading,
    error: categoryError
  } = useQuery(FIND_CATEGORY);

  const {
    data: findUserData,
    loading: findUserLoading,
    error: findUserError
  } = useQuery(FIND_USER_INFO);

  const { data, loading, error, refetch } = useQuery(ONE_OF_POST, {
    variables: { id: postId }
  });
  if (error) {
    window.location.href = "/";
  }

  //thumnail을 변경하지 않을경우 선택된 이미지가 없다고 나옴으로 db찍히는 저장된 post를 담아줄 변수
  let dbThumbnail = "";
  if (data !== undefined) {
    dbThumbnail = data.oneOfPost.thumbnail;
  }
  let dbBackgroundImage = "";
  if (data !== undefined) {
    dbBackgroundImage = data.oneOfPost.backgroundImage;
  }

  //s3에 key값과 versionId를 쿠키에 넣기위해 변수에 집어넣음
  let s3DbThumbnail = "";
  if (data !== undefined) {
    s3DbThumbnail = data.oneOfPost.s3ThumbnailId;
  }
  let s3DbBackgroundImage = "";
  if (data !== undefined) {
    s3DbBackgroundImage = data.oneOfPost.s3BackgroundImageId;
  }

  //방영 여부를 설정할 경우에 boolean으로 값이 get에 들어가는게 아니라 string형태로 들어가서 그것을 다시 boolean으로 바꿔서 db에 넣어주기위한 작업
  if (typeof postBroadcast.get === typeof "") {
    if (postBroadcast.get === "true") {
      postBroadcast.setGet(true);
    }
    if (postBroadcast.get === "false") {
      postBroadcast.setGet(false);
    }
  }

  //s3를 거치지 않고 즉, 썸네일을 바꾸지 않고 다른 내용들만 바뀔경우 일어나는 EDIT_POST
  const [updatePostMutation] = useMutation(EDIT_POST, {
    variables: {
      id: postId,
      title: postTitle.value,
      description: postDescription.value,
      uploadDay: postUploadDay.arr,
      thumbnail: dbThumbnail,
      backgroundImage: dbBackgroundImage,
      s3ThumbnailId: s3DbThumbnail,
      s3BackgroundImageId: s3DbBackgroundImage,
      category: postGenre.get,
      broadcast: postBroadcast.get,
      action: "EDIT"
    }
  });

  const [deletePostMutation] = useMutation(EDIT_POST, {
    variables: {
      id: postId,
      title: postTitle.value,
      description: postDescription.value,
      uploadDay: postUploadDay.arr,
      thumbnail: dbThumbnail,
      backgroundImage: dbBackgroundImage,
      category: postGenre.get,
      broadcast: postBroadcast.get,
      action: "DELETE"
    }
  });

  if (loading === false) {
    if (postTitle.filter === "Yes") {
      postTitle.setValue(data.oneOfPost.title);
      postTitle.setFilter("No");
    }
    if (postThumbnail.value === "") {
      postThumbnail.setValue(data.oneOfPost.thumbnail);
    }
    if (postBackgroundImage.value === "") {
      postBackgroundImage.setValue(data.oneOfPost.backgroundImage);
    }
    if (postDescription.filter === "Yes") {
      postDescription.setValue(data.oneOfPost.description);
      postDescription.setFilter("No");
    }

    if (postGenre.get === "0") {
      postGenre.setGet(data.oneOfPost.category.id);
    }

    if (postUploadDay.filter === "Yes") {
      postUploadDay.setValue(data.oneOfPost.uploadDay);

      if (data.oneOfPost.uploadDay !== null) {
        postUploadDay.setArr(data.oneOfPost.uploadDay);
      }
      postUploadDay.setFilter("No");
    }
    if (postBroadcast.filter === "Yes") {
      postBroadcast.setGet(data.oneOfPost.broadcast);
      postBroadcast.setFilter("No");
    }
    if (s3Thumbnail === "") {
      setS3Thumbnail(data.oneOfPost.s3ThumbnailId);
    }
    if (s3BackgroundImage === "") {
      setS3BackgroundImage(data.oneOfPost.s3BackgroundImageId);
    }
  }

  const onSubmit = async (e) => {
    if (e === "noChangeThumbnail") {
      try {
        await updatePostMutation();

        setTimeout(() => {
          window.location.reload();
        });
      } catch (e) {
        localStorage.removeItem("userEmailToken");
        localStorage.removeItem("token");

        setTimeout(() => {
          window.location.href = "/";
        }, [1500]);
      }
    } else if (e === "changeThumbnail") {
      document.cookie = `postId=${postId}`;
      document.cookie = `postTitle=${postTitle.value}`;
      document.cookie = `postDescription=${postDescription.value}`;
      document.cookie = `postGenre=${postGenre.get}`;
      document.cookie = `postBroadcast=${postBroadcast.get}`;
      document.cookie = `postUpload=${postUploadDay.arr}`;
      document.cookie = `dbPostThumbnail=${postThumbnail.value}`;
      document.cookie = `dbPostBackgroundImage=${postBackgroundImage.value}`;
      document.cookie = `s3DbThumbnail=${s3DbThumbnail}`;
      document.cookie = `s3DbBackgroundImage=${s3DbBackgroundImage}`;
      document.cookie = `filterCookie=${true}`;
      document.cookie = `reloadCookie=${false}`;
      //localhost:5000에 갔다가, EpisodeOfPostContainer.js와 연결된 코드
    }
  };

  return (
    <>
      {!catecoryLoading && !findUserLoading && !loading ? (
        <MyPostListUpdatePresenter
          loading={loading}
          data={data}
          refetch={refetch}
          postId={postId}
          categoryData={categoryData}
          postTitle={postTitle}
          postThumbnail={postThumbnail}
          postBackgroundImage={postBackgroundImage}
          postDescription={postDescription}
          postGenre={postGenre}
          postBroadcast={postBroadcast}
          postUploadDay={postUploadDay}
          imgBase64={imgBase64}
          setImgBase64={setImgBase64}
          backgroundImgBase64={backgroundImgBase64}
          setBackgroundImgBase64={setBackgroundImgBase64}
          s3Thumbnail={s3Thumbnail}
          setS3Thumbnail={setS3Thumbnail}
          s3BackgroundImage={s3BackgroundImage}
          setS3BackgroundImage={setS3BackgroundImage}
          deletePostMutation={deletePostMutation}
          findUserData={findUserData}
          onSubmit={onSubmit}
        />
      ) : (
        <Loader />
      )}
    </>
  );
});

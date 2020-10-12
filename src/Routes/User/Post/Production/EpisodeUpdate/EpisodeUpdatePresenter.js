import styled from "styled-components";
import React, { useState } from "react";
import ChoicePicture from "../MyPostListUpdate/ChoicePicture";
import ChangeVideoFile from "./ChangeVideoFile";
import { Link } from "react-router-dom";
import Loader from "../../../../../Components/Loader";
import { useEffect } from "react";
import * as jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 80%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  padding: 10px 20px;
  height: 100%;
  border: none;
  border-radius: 3px;
  color: white;
  text-align: center;
`;

const CountLength = styled.small`
  font-size: 1em;
`;

const Input = styled.input.attrs({
  type: "text",
  maxLength: "29"
})`
  width: 90%;
  padding: 10px;
  border: solid 1px #eef1f4;
  display: block;
`;

const MainTitle = styled.p`
  font-size: 2em;
  margin: 20px 0 30px 0;
`;

const Title = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const SubDescription = styled.label`
  font-size: 1em;
`;

const TitleBox = styled.div`
  margin: 30px 0;
`;

const PostUploadForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 50px 0;
`;

const UploadFileBox = styled.div`
  display: flex;
`;

const ThumbnailBox = styled.div`
  margin-right: 5vw;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 180px;
  border: 1px solid lightGrey;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const DramaBox = styled.div``;

const PostDescriptionBox = styled.div`
  margin: 80px 0;
`;

const PostDescriptionInput = styled.textarea.attrs({
  maxLength: "299"
})`
  width: 90%;
  padding: 10px;
  border: solid 1px #eef1f4;
  display: block;
  resize: none;
  height: 60px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Button = styled.button`
  width: 15%;
  height: 50px;
  border: none;
  font-size: 1.2em;
`;

const SubmitButton = styled.button`
  width: 15%;
  height: 50px;
  border: none;
  font-size: 1.2em;
  background: #4996c4;
  color: white;
  &:disabled {
    background: #efefef;
    color: rgba(0, 0, 0, 0.5);
  }
`;

const OpenSendLoading = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

const OpendSendBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default ({
  postId,
  episodeId,
  episodeTitle,
  episodeDescription,
  imgBase64,
  setImgBase64,
  episodeThumbnail,
  videoBase64,
  setVideoBase64,
  episodeVideoFile,
  data,
  loading,
  refetch,
  onSubmit
}) => {
  //localhost:5000을 제외한 나머지 예를 들어 제목수정을 하려할때 실행될 코드
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }
  //localhost:5000으로 보내질때 해당 User의 토큰이 조작되었는지 확인해주는코드
  const jwtTokenIsUser = () => {
    try {
      jwtDecode(localStorage.getItem("token"));
      return true;
    } catch (e) {
      localStorage.removeItem("userEmailToken");
      localStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/";
      }, [1500]);
    }
  };

  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }
  //썸네일에 들어가는 사진이 올바른 사진인지 아닌지를 확인하는 hooks
  const [pictureFilter, setPictureFilter] = useState("0");

  //해당 s3까지 다녀오고 수정되는데 걸리는 시간을 시각화 하기 위한 hooks
  const [upload, setUpload] = useState("");

  //쌈네일을 업로드 했을경우 대체되는 사진을 보여주기 위함
  const [changeThumbnail, setChangeThumbnail] = useState("");

  const [changeFile, setChangeFile] = useState("");

  //해당 작품을 local5000으로 다녀오고 나서 해당 페이지로 다시 redirect되기때문에 해당 작품들이 나오지 않는 오류를 잡기 위한 fake hooks
  useEffect(() => {
    refetch();
    if (episodeTitle.value !== data.searchEpisode.title) {
      episodeTitle.setValue(data.searchEpisode.title);
    }
    if (episodeThumbnail.value !== data.searchEpisode.thumbnail) {
      setChangeThumbnail(data.searchEpisode.thumbnail);
    }
    if (episodeVideoFile.value !== data.searchEpisode.file) {
      setChangeFile(data.searchEpisode.file);
    }
    if (episodeDescription.value !== data.searchEpisode.description) {
      episodeDescription.setValue(data.searchEpisode.description);
    }
  }, [data]);

  let isTrue = true;
  if (
    episodeTitle.value !== "" &&
    episodeDescription.value !== "" &&
    pictureFilter === "0"
  ) {
    isTrue = false;
  } else if (
    episodeTitle.value === "" ||
    episodeDescription.value === "" ||
    pictureFilter === ""
  ) {
    isTrue = true;
  }

  const actionUrl = `http://localhost:5000/updateEpisode/${episodeId}?s3ThumbnailId=${data.searchEpisode.s3ThumbnailId}&s3FileId=${data.searchEpisode.s3FileId}`;
  const deleteEpisodeActionUrl = `http://localhost:5000/deleteEpisode/${episodeId}?s3ThumbnailId=${data.searchEpisode.s3ThumbnailId}&s3FileId=${data.searchEpisode.s3FileId}&postId=${postId}`;
  return (
    <Container>
      {upload === "loading" ? (
        <OpenSendLoading>
          <OpendSendBox>
            <Loader />
          </OpendSendBox>
        </OpenSendLoading>
      ) : (
        ""
      )}
      <HeaderBox>
        <MainTitle>회차수정</MainTitle>
        <PostUploadForm
          action={
            jwtTokenIsUser() ? deleteEpisodeActionUrl : "http://localhost:5000/"
          }
          method="post"
        >
          <DeleteButton
            onClick={() => {
              if (window.confirm("정말로 해당 회차를 삭제하시겠습니까?")) {
                onSubmit("deleteEpisode");
              }
            }}
          >
            삭제
          </DeleteButton>
        </PostUploadForm>
      </HeaderBox>
      <TitleBox>
        <Title>제목</Title>
        <Input {...episodeTitle} />
        <CountLength>{episodeTitle.value.length}/30</CountLength>
      </TitleBox>
      <PostUploadForm
        action={jwtTokenIsUser() ? actionUrl : "http://localhost:5000/"}
        method="post"
        encType="multipart/form-data"
      >
        <UploadFileBox>
          <ThumbnailBox>
            <Title>섬네일</Title>
            <InputBox>
              <ChoicePicture
                img={
                  changeThumbnail === ""
                    ? episodeThumbnail.value
                    : changeThumbnail
                }
                name="imgFile"
                id="fileInput"
                accept="image/jpeg, image/png"
                setPictureFilter={setPictureFilter}
                imgBase64={imgBase64}
                setImgBase64={setImgBase64}
              />
            </InputBox>
            <SubDescription>600 * 400px / jpg</SubDescription>
          </ThumbnailBox>
          <DramaBox>
            <Title>동영상</Title>
            <InputBox>
              <ChangeVideoFile
                id="videoFile"
                name="videoFile"
                accept="video/*"
                episodeVideoFile={
                  changeFile === "" ? episodeVideoFile.value : changeFile
                }
                videoBase64={videoBase64}
                setVideoBase64={setVideoBase64}
              />
            </InputBox>
          </DramaBox>
        </UploadFileBox>
        <PostDescriptionBox>
          <Title>작품설명</Title>
          <PostDescriptionInput
            id="PostDescriptionInputValue"
            {...episodeDescription}
          />
          <CountLength>{episodeDescription.value.length}/300</CountLength>
        </PostDescriptionBox>
        <ButtonBox>
          {imgBase64 === "" && videoBase64 === "" ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  window.location.href = `/myPostList/${postId}`;
                }}
              >
                취소
              </Button>
              <Link
                to={`/episodeUpdate/${episodeId}`}
                onClick={() =>
                  setTimeout(() => {
                    window.location.reload();
                  })
                }
              >
                <SubmitButton
                  style={{ width: "200px" }}
                  disabled={isTrue}
                  type="button"
                  onClick={() => {
                    onSubmit("noChangeBoth");
                  }}
                >
                  작품 수정
                </SubmitButton>
              </Link>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={() => {
                  window.location.href = `/myPostList/${postId}`;
                }}
              >
                취소
              </Button>
              <SubmitButton
                disabled={isTrue}
                onClick={async () => {
                  await onSubmit("changeBoth");
                  setUpload("loading");
                }}
              >
                작품 수정
              </SubmitButton>
            </>
          )}
        </ButtonBox>
      </PostUploadForm>
    </Container>
  );
};

import styled from "styled-components";
import React, { useState } from "react";
import ChoicePicture from "../PostUpload/ChoicePicture";
import ChoiceDrama from "./ChoiceDrama";
import Loader from "../../../../../Components/Loader";
import * as jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 80%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const SubmitButton = styled.input.attrs({
  type: "submit"
})`
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
  episodeTitle,
  episodeDescription,
  imgBase64,
  setImgBase64,
  videoBase64,
  setVideoBase64,
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

  //썸네일에 들어가는 사진이 올바른 사진인지 아닌지를 확인하는 hooks
  const [pictureFilter, setPictureFilter] = useState("");

  //해당 작품이 s3밑 prisma에 올라가고 있을때 그 상태를 확인하는 hooks
  const [upload, setUpload] = useState("");

  //disabled를 지정하기 위한 변수
  let isTrue = true;

  if (
    episodeTitle.value !== "" &&
    episodeDescription.value !== "" &&
    imgBase64 !== "" &&
    videoBase64 !== "" &&
    pictureFilter === "0"
  ) {
    isTrue = false;
  }
  if (
    episodeTitle.value === "" ||
    episodeDescription.value === "" ||
    imgBase64 === "" ||
    videoBase64 === "" ||
    pictureFilter === ""
  ) {
    isTrue = true;
  }
  const actionUrl = `http://localhost:5000/UploadEpisode/${postId}`;
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
      <MainTitle>회차등록</MainTitle>
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
              <ChoiceDrama
                id="videoFile"
                name="videoFile"
                accept="video/*"
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
          <Button>취소</Button>
          <SubmitButton
            value="회차 등록"
            disabled={isTrue}
            onClick={async () => {
              await onSubmit();
              setUpload("loading");
            }}
          />
        </ButtonBox>
      </PostUploadForm>
    </Container>
  );
};

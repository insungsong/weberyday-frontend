import styled from "styled-components";
import React, { useState, useEffect } from "react";
import InputCheckBox from "../../../../../Components/InputCheckBox";
import CheckInput from "../../../../../Components/CheckInput";
import ChoicePicture from "./ChoicePicture";
import Loader from "../../../../../Components/Loader";
import { Link } from "react-router-dom";
import ChoiceBackgroundPicture from "./ChoiceBackgroundPicture";
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

const ThumbnailBox = styled.div``;

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

const GenreBox = styled.div`
  margin-bottom: 80px;
`;

const RadioInputGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template: auto / repeat(5, 1fr);
  grid-gap: 10px;
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

const PostDeleteBtn = styled.button`
  width: 15%;
  height: 50px;
  border: none;
  font-size: 1.2em;
  background: #e74c3c;
  color: white;
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

const BrodcastBox = styled.div`
  width: 100%;
`;

const WeekSelectBox = styled.div`
  width: 100%;
  margin: 70px 0;
  height: 100px;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
`;

const Bucket = styled.div``;

const WeekBox = styled.div`
  display: grid;
  grid-template: auto / repeat(7, 1fr);
  grid-gap: 10px;
  margin-left: 15px;
`;

const ImageBox = styled.div`
  display: flex;
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
  loading,
  data,
  refetch,
  postId,
  postTitle,
  postThumbnail,
  postBackgroundImage,
  postDescription,
  postGenre,
  postBroadcast,
  postUploadDay,
  categoryData,
  imgBase64,
  setImgBase64,
  backgroundImgBase64,
  setBackgroundImgBase64,
  s3Thumbnail,
  s3BackgroundImage,
  deletePostMutation,
  onSubmit
}) => {
  // 쓰레기 데이터 값을 계속 가지고 와서 일단 주석처리함 필요하면 필요한 코드를 찾아서 써라
  // useEffect(() => {
  //   if (data !== undefined) {
  //     postTitle.setValue(data.oneOfPost.title);
  //     postDescription.setValue(data.oneOfPost.description);
  //     setS3Thumbnail(data.oneOfPost.s3ThumbnailId);
  //     setS3BackgroundImage(data.oneOfPost.s3BackgroundImageId);
  //   }
  //   refetch();
  // }, [data]);

  //해당 작품이 s3밑 prisma에 올라가고 있을때 그 상태를 확인하는 hooks
  const [upload, setUpload] = useState("");

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

  // db에서 회원이 체크한 장르를 담기위한 배열
  let genreArr = [];

  if ((categoryData && categoryData.findCategory) !== undefined) {
    genreArr = categoryData.findCategory;
  }
  let disabled = true;

  //choicePicture에 제대로된 양식의 썸네일이 들어왔는지 확인하는 코드
  const [pictureFilter, setPictureFilter] = useState("");
  const [backgroudPictureFilter, setBackgroudPictureFilter] = useState("0");

  if (pictureFilter === "") {
    setTimeout(() => {
      setPictureFilter("0");
    }, 1000);
  }

  //DB에서 가져온 Category
  const clientChoiceCategory = postGenre.get;

  //DB에서 가져온 Category 체크해주는 코드
  if (document.getElementById(clientChoiceCategory) !== null) {
    document.getElementById(clientChoiceCategory).checked = true;
  }

  //방영/종영
  const clientChoiceBroadcast = postBroadcast.get;
  if (
    (document.getElementById("live") &&
      document.getElementById("live").checked &&
      document.getElementById("live") &&
      document.getElementById("end").checked) !== null
  ) {
    if (clientChoiceBroadcast === true) {
      document.getElementById("live").checked = true;
    }
  }
  if (
    (document.getElementById("live") &&
      document.getElementById("live").checked &&
      document.getElementById("live") &&
      document.getElementById("end").checked) !== null
  ) {
    if (clientChoiceBroadcast === false) {
      document.getElementById("end").checked = true;
    }
  }

  //작품 수정 버튼 잘못된 정보에서 누르지 못하게 하는 코드
  if (
    postTitle.value !== "" &&
    postDescription.value !== "" &&
    pictureFilter === "0" &&
    backgroudPictureFilter === "0"
  ) {
    if (postBroadcast.get === false || postBroadcast.get === "false") {
      disabled = false;
    }

    if (
      (postBroadcast.get === true || postBroadcast.get === "true") &&
      postUploadDay.arr.length !== 0
    ) {
      disabled = false;
    }
  }

  //선택한 요일
  let clientChoiceUploaday = [];

  let selectedWeek = [];
  if (postUploadDay && postUploadDay.value !== "") {
    clientChoiceUploaday = postUploadDay.arr;

    if (clientChoiceUploaday.length !== 0) {
      selectedWeek = clientChoiceUploaday;
      selectedWeek.map((week) => {
        if (document.getElementById(week) !== null) {
          document.getElementById(week).checked = true;
        }
      });
    }
  }

  const week = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일"
  ];

  const actionUrl = `http://localhost:5000/myPostUpdate/${postId}?s3Thumbnail=${s3Thumbnail}&s3BackgroundImage=${s3BackgroundImage}`;

  const broadcastLive = document.getElementById("live");
  const broadcastEnd = document.getElementById("end");

  let filterWeekBox = false;

  if (broadcastEnd !== null && broadcastLive !== null) {
    if (document.getElementById("live").checked === true) {
      filterWeekBox = false;
    }
    if (document.getElementById("end").checked === true) {
      filterWeekBox = true;
    }
  }

  return (
    <>
      {loading && data === undefined ? (
        <Loader />
      ) : (
        <>
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
            <MainTitle>작품 수정</MainTitle>

            <TitleBox>
              <Title>제목</Title>
              <Input {...postTitle} />
              <CountLength>{postTitle.value.length}/30</CountLength>
            </TitleBox>
            <PostUploadForm
              action={
                jwtTokenIsUser()
                  ? `http://localhost:5000/myPostUpdate/${postId}?s3Thumbnail=${s3Thumbnail}&s3BackgroundImage=${s3BackgroundImage}`
                  : "http://localhost:5000/"
              }
              method="post"
              encType="multipart/form-data"
            >
              <ImageBox>
                <ThumbnailBox>
                  <Title>섬네일</Title>
                  <InputBox>
                    <ChoicePicture
                      img={postThumbnail.value}
                      name="postThumnail"
                      id="fileInput"
                      accept="image/jpeg, image/png"
                      setPictureFilter={setPictureFilter}
                      imgBase64={imgBase64}
                      setImgBase64={setImgBase64}
                    />
                  </InputBox>
                  <SubDescription>600 * 400px / jpg</SubDescription>
                </ThumbnailBox>
                <ThumbnailBox>
                  <Title>배경이미지</Title>
                  <InputBox style={{ width: "500px" }}>
                    <ChoiceBackgroundPicture
                      name="postBackgroundImg"
                      img={postBackgroundImage.value}
                      backgroundImgBase64={backgroundImgBase64}
                      setBackgroundImgBase64={setBackgroundImgBase64}
                      backgroudPictureFilter={backgroudPictureFilter}
                      setBackgroudPictureFilter={setBackgroudPictureFilter}
                      name="backgroundImgFile"
                      accept="image/jpeg, image/png"
                    />
                  </InputBox>
                  <SubDescription>1350 * 220px / jpg</SubDescription>
                </ThumbnailBox>
              </ImageBox>
              <PostDescriptionBox>
                <Title>작품설명</Title>
                <PostDescriptionInput
                  id="PostDescriptionInputValue"
                  {...postDescription}
                />
                <CountLength>{postDescription.value.length}/300</CountLength>
              </PostDescriptionBox>
              <GenreBox>
                <Title>장르선택</Title>
                <RadioInputGroup>
                  {genreArr.map((category, index) => (
                    <Bucket key={category.id}>
                      <CheckInput
                        {...postGenre}
                        onClick={async (e) => {
                          await postGenre.setGet(e.target.id);
                        }}
                        id={category.id}
                        name="genre"
                        value={category.id}
                        key={category.id}
                        style={{ height: "15px", padding: "0 10px" }}
                      />
                      <SubDescription key={category.id + index}>
                        {category.genre}
                      </SubDescription>
                    </Bucket>
                  ))}
                </RadioInputGroup>
              </GenreBox>
              <BrodcastBox>
                <Title>방영여부</Title>
                <RadioInputGroup>
                  <Bucket>
                    <CheckInput
                      {...postBroadcast}
                      onClick={async (e) => {
                        await postBroadcast.setGet(true);
                        await postUploadDay.setValue("");
                      }}
                      value={true}
                      name="broadcast"
                      id="live"
                    />
                    <SubDescription>방영</SubDescription>
                  </Bucket>
                  <Bucket>
                    <CheckInput
                      {...postBroadcast}
                      onClick={async (e) => {
                        await postBroadcast.setGet(false);
                        await postUploadDay.setValue("");
                        await postUploadDay.setArr([]);
                      }}
                      value={false}
                      name="broadcast"
                      id="end"
                    />
                    <SubDescription>종영</SubDescription>
                  </Bucket>
                </RadioInputGroup>
              </BrodcastBox>
              {filterWeekBox ? (
                <WeekSelectBox style={{ backgroundColor: "#EFEFEF" }}>
                  <Title>연재요일(선택)</Title>
                  <WeekBox>
                    {week.map((day, index) => (
                      <Bucket key={day + index}>
                        <InputCheckBox
                          id={day}
                          checked={false}
                          disabled
                          value={day}
                          key={index}
                        />
                        <SubDescription>{day}</SubDescription>
                      </Bucket>
                    ))}
                  </WeekBox>
                </WeekSelectBox>
              ) : (
                <WeekSelectBox>
                  <Title>연재요일(선택)</Title>
                  <WeekBox>
                    {week.map((day, index) => (
                      <Bucket key={day + index}>
                        <InputCheckBox
                          {...postUploadDay}
                          id={index}
                          value={day}
                          key={index}
                          onClick={(e) => {
                            if (!e.target.checked) {
                              postUploadDay.setValue("");
                            } else {
                              postUploadDay.setValue(e.target.id);
                            }
                          }}
                        />
                        <SubDescription>{day}</SubDescription>
                      </Bucket>
                    ))}
                  </WeekBox>
                </WeekSelectBox>
              )}
              <ButtonBox>
                <form
                  method="post"
                  action={
                    jwtTokenIsUser()
                      ? `http://localhost:5000/myPostDelete?s3Thumbnail=${s3Thumbnail}&s3BackgroundImage=${s3BackgroundImage}`
                      : "http://localhost:5000/"
                  }
                >
                  <PostDeleteBtn
                    style={{ width: "30vh", cursor: "pointer" }}
                    onClick={async () => {
                      await deletePostMutation();
                      window.location.href = "/myPostList";
                    }}
                  >
                    작품 삭제
                  </PostDeleteBtn>
                </form>
                <Button>취소</Button>
                {imgBase64 === "" && backgroundImgBase64 === "" ? (
                  <>
                    <Link to={`/myPostList/${postId}`}>
                      <SubmitButton
                        style={{ width: "200px" }}
                        disabled={disabled}
                        type="button"
                        onClick={() => {
                          onSubmit("noChangeThumbnail");
                        }}
                      >
                        작품 수정
                      </SubmitButton>
                    </Link>
                  </>
                ) : (
                  <SubmitButton
                    disabled={disabled}
                    onClick={() => {
                      onSubmit("changeThumbnail");
                      setUpload("loading");
                    }}
                  >
                    작품 수정
                  </SubmitButton>
                )}
              </ButtonBox>
            </PostUploadForm>
          </Container>
        </>
      )}
    </>
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import CheckInput from "../../../../../Components/CheckInput";
import ChoicePicture from "./ChoicePicture";
import ChoiceBackgroundPicture from "./ChoiceBackgroundPicture";
import InputCheckBox from "../../../../../Components/InputCheckBox";
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

const ImageBox = styled.div`
  display: flex;
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
  margin-right: 50px;
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
  postTitle,
  postDescription,
  postGenre,
  data,
  postBroadcast,
  postUploadDay,
  imgBase64,
  setImgBase64,
  backgroundImgBase64,
  setBackgroundImgBase64,
  onSubmit
}) => {
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }
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

  let disabled = true;

  //choicePicture에 제대로된 양식의 썸네일이 들어왔는지 확인하는 코드
  const [pictureFilter, setPictureFilter] = useState("");
  const [backgroudPictureFilter, setBackgroudPictureFilter] = useState("");

  //해당 작품이 s3밑 prisma에 올라가고 있을때 그 상태를 확인하는 hooks
  const [upload, setUpload] = useState("");

  if (
    postTitle.value !== "" &&
    postDescription.value !== "" &&
    backgroudPictureFilter === "0" &&
    postGenre.get !== "0" &&
    pictureFilter === "0"
  ) {
    if (postBroadcast.get === false) {
      disabled = false;
    }
    if (postBroadcast.get === true && postUploadDay.arr.length !== 0) {
      disabled = false;
    }
  }

  let genreArr = [];
  if ((data && data.findCategory) !== undefined) {
    genreArr = data.findCategory;
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

  const broadcastLive = document.getElementById("broadcastLive");
  const broadcastEnd = document.getElementById("broadcastEnd");
  let filterWeekBox = true;
  const [value, setValue] = useState(true);

  if (broadcastEnd !== null) {
    broadcastEnd.checked = value;
    if (broadcastEnd.checked === false) {
      filterWeekBox = false;
    }
  }
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
      <MainTitle>작품등록</MainTitle>
      <TitleBox>
        <Title>제목</Title>
        <Input {...postTitle} />
        <CountLength>{postTitle.value.length}/30</CountLength>
      </TitleBox>
      <PostUploadForm
        action={
          jwtTokenIsUser()
            ? "http://localhost:5000/uploadPost"
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
                imgBase64={imgBase64}
                setImgBase64={setImgBase64}
                pictureFilter={pictureFilter}
                setPictureFilter={setPictureFilter}
                name="imgFile"
                accept="image/jpeg, image/png"
              />
            </InputBox>
            <SubDescription>600 * 400px / jpg</SubDescription>
          </ThumbnailBox>
          <ThumbnailBox>
            <Title>배경이미지</Title>
            <InputBox style={{ width: "500px" }}>
              <ChoiceBackgroundPicture
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
          <Title>장르</Title>
          <RadioInputGroup>
            {genreArr.map((category, index) => (
              <Bucket key={category.id}>
                <CheckInput
                  {...postGenre}
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
                id="broadcastLive"
                name="broadcast"
                onClick={async (e) => {
                  await setValue(false);
                  await postBroadcast.setGet(true);
                  await postUploadDay.setValue("");
                }}
              />
              <SubDescription>방영</SubDescription>
            </Bucket>
            <Bucket>
              <CheckInput
                {...postBroadcast}
                id="broadcastEnd"
                name="broadcast"
                onClick={async (e) => {
                  await setValue(true);
                  await postBroadcast.setGet(false);
                  await postUploadDay.setValue("");
                  await postUploadDay.setArr([]);
                }}
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
          <Button>취소</Button>
          <SubmitButton
            type="submit"
            disabled={disabled}
            onClick={() => {
              setUpload("loading");
              onSubmit();
            }}
            value="작품등록"
          />
        </ButtonBox>
      </PostUploadForm>
    </Container>
  );
};

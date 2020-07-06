import React from "react";
import styled from "styled-components";
import CheckInput from "../../../../Components/CheckInput";
import { ThumbnailUpload } from "../../../../Components/Icons";

const Container = styled.div`
  width: 80%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80em;
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

const SubDescription = styled.span`
  font-size: 1em;
`;

const TitleBox = styled.div``;

const ThumbnailBox = styled.div`
  display: flex;
  flex-direction: column;
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

const InputFile = styled.input.attrs(() => ({
  type: "file"
}))`
  position: absolute;
  opacity: 0;
  background: blue;
  width: 280px;
  height: 180px;
  left: 0px;
`;

const PostDescriptionBox = styled.div``;

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

const GenreBox = styled.div``;

const GenreInputGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template: auto / repeat(5, 1fr);
  grid-gap: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

const Button = styled.button`
  width: 15%;
  height: 50px;
  border: none;
  font-size: 1.2em;
`;

export default ({ postTitle, postDescription }) => {
  // const resize = (e) => {
  //   e.target.style.height = "60px";
  //   console.log(e.target.style.height);
  //   e.target.style.height = e.target.style.height + 60 + "px";
  //   console.log(e.target.style.scrollHeight);
  //   e.target.style.height = 12 + e.target.style.scrollHeight + "px";
  // };

  const categoryList = ["공포", "로맨스", "멜로", "코믹", "액션"];

  return (
    <Container>
      <MainTitle>작품등록</MainTitle>
      <TitleBox>
        <Title>제목</Title>
        <Input {...postTitle} />
        <CountLength>{postTitle.value.length}/30</CountLength>
      </TitleBox>
      <ThumbnailBox>
        <Title>섬네일</Title>
        <InputBox>
          <ThumbnailUpload />
          <InputFile />
        </InputBox>
        <SubDescription>600 * 400px / jpg</SubDescription>
      </ThumbnailBox>
      <PostDescriptionBox>
        <Title>작품설명</Title>
        <PostDescriptionInput
          id="PostDescriptionInputValue"
          {...postDescription}
          // onKeyUp={resize}
        />
        <CountLength>{postDescription.value.length}/300</CountLength>
      </PostDescriptionBox>
      <GenreBox>
        <Title>장르선택</Title>
        <GenreInputGroup>
          {categoryList.map((category) => (
            <div>
              <CheckInput
                key={category}
                style={{ height: "15px", padding: "0 10px" }}
              />
              <SubDescription style={{ fontSize: "1.2em" }}>
                {category}
              </SubDescription>
            </div>
          ))}
        </GenreInputGroup>
      </GenreBox>
      <ButtonBox>
        <Button>취소</Button>
        <Button style={{ background: "#4996C4", color: "white" }}>확인</Button>
      </ButtonBox>
    </Container>
  );
};

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CameraIcon } from "../../../../../Components/Icons";

const Container = styled.div`
  width: 80%;
  height: 80vh;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-row-gap: 80px;
  grid-column-gap: 30px;
`;

const BigCategoryBox = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CategoryBox = styled.div`
  display: flex;
  cursor: pointer;
  margin: 0 20px 20px 20px;
  justify-content: center;
`;

const SelectCategoryBox = styled.div`
  display: flex;
  cursor: pointer;
  border-bottom: solid 3px #4996c4;
  margin: 0 20px 20px 20px;
  justify-content: center;
`;

const CategoryValue = styled.p``;

const CategoryTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0 30px 0;
`;

const CategoryTitle = styled.p`
  font-size: 20px;
`;

const OnePostBox = styled.div`
  width: 100%;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.1);
`;

const PostThumbnail = styled.img`
  display: flex;
  width: 100%;
  height: 180px;
`;

const PostTitle = styled.p`
  font-size: 120%;
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 5px;
  padding-bottom: 20px;
`;

export default ({
  data,
  allPostData,
  currentCategoryId,
  value,
  setValue,
  change,
  setChange
}) => {
  let allPostArr = [];
  if (allPostData && allPostData.allPost !== undefined) {
    allPostArr = allPostData.allPost;
  }
  return (
    <Container>
      <CategoryTitleBox>
        <CameraIcon />
        <CategoryTitle style={{ paddingTop: "5px", paddingLeft: "10px" }}>
          작품리스트
        </CategoryTitle>
      </CategoryTitleBox>
      <BigCategoryBox>
        {change === "allPost" ? (
          <SelectCategoryBox
            onClick={() => {
              setChange("allPost");
            }}
          >
            <CategoryValue>전체</CategoryValue>
          </SelectCategoryBox>
        ) : (
          <CategoryBox
            onClick={() => {
              setChange("allPost");
            }}
          >
            <CategoryValue>전체</CategoryValue>
          </CategoryBox>
        )}

        {data.findCategory.map((value, index) => {
          //value.id = 카테고리 id를 말함
          if (value.id === change) {
            return (
              <SelectCategoryBox
                onClick={() => {
                  setChange(value.id);
                  setValue("No");
                }}
              >
                <CategoryValue key={value.id + index}>
                  {value.genre}
                </CategoryValue>
              </SelectCategoryBox>
            );
          } else {
            return (
              <CategoryBox
                onClick={() => {
                  setChange(value.id);
                  setValue("No");
                }}
              >
                <CategoryValue key={value.id + index}>
                  {value.genre}
                </CategoryValue>
              </CategoryBox>
            );
          }
        })}
      </BigCategoryBox>
      <CategoryContainer>
        {allPostArr.map((postValue, index) => {
          let countTitle = postValue.title.length;
          if (change === postValue.category.id) {
            setValue("Yes");
            return (
              <Link
                to={`/episodeList/${postValue.id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <CategoryBox>
                  <OnePostBox>
                    <PostThumbnail src={postValue.thumbnail} />
                    {countTitle > 11 ? (
                      <PostTitle>
                        {postValue.title.substring(0, 12)}...
                      </PostTitle>
                    ) : (
                      <PostTitle>{postValue.title}</PostTitle>
                    )}
                  </OnePostBox>
                </CategoryBox>
              </Link>
            );
          } else if (change === "allPost") {
            setValue("Yes");
            return (
              <Link
                to={`/episodeList/${postValue.id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <CategoryBox>
                  <OnePostBox>
                    <PostThumbnail src={postValue.thumbnail} />
                    {countTitle > 11 ? (
                      <PostTitle>
                        {postValue.title.substring(0, 12)}...
                      </PostTitle>
                    ) : (
                      <PostTitle>{postValue.title}</PostTitle>
                    )}
                  </OnePostBox>
                </CategoryBox>
              </Link>
            );
          }
        })}
      </CategoryContainer>
      {value === "No" ? (
        <p style={{ paddingLeft: "20px" }}>
          해당 카테고리로 등록된 작품이 없습니다. 👉
          <Link to="/" style={{ paddingLeft: "10px" }}>
            다른 작품 보러가기
          </Link>
        </p>
      ) : (
        ""
      )}
    </Container>
  );
};

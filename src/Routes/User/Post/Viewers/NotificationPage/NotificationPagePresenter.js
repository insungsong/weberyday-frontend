import React from "react";
import styled from "styled-components";
import {
  PointMenu,
  ReversArrow,
  NextArrow,
  Bell
} from "../../../../../Components/Icons";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  height: 80vh;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
`;

const Title = styled.p`
  font-size: 2em;
`;

const ContentBox = styled.div``;

const OneContent = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid lightgrey;
  padding-bottom: 20px;
  :last-child {
    border-bottom: 1px solid lightgrey;
  }
  :hover {
    .menuButton {
      display: block;
    }
  }
`;

const ContentTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  display: none;
`;

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  border: none;
  left: 90%;
  width: 80px;
  height: 30px;
`;

const ContentTitle = styled.span`
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 1.2em;
`;

const Content = styled.span`
  display: block;
  margin-bottom: 10px;
  color: grey;
`;

const NotificationTime = styled.span`
  display: block;
`;

const ClickZon = styled.div`
  width: 97%;
  cursor: pointer;
`;

const MainContent = styled.div`
  display: none;
  width: 75%;
  margin-left: 5%;
  margin-top: 5%;
`;

const PageingNumberBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const NumbersBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2em;
  width: 25%;
`;

const NullPageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  margin: 30vh 0;
`;

const PageingNumber = styled.span`
  display: block;
  padding: 0 15px;
  cursor: pointer;
`;

const CurrentPage = styled.p`
  font-weight: bold;
  color: #4996c4;
`;

const ReversArrowBox = styled.div`
  cursor: pointer;
`;

const NextArrowBox = styled.div`
  cursor: pointer;
`;

export default ({
  data,
  deleteEvent,
  pageNum,
  setPageNum,
  paging,
  setPaging
}) => {
  if (!localStorage.getItem("userEmailToken")) {
    window.location.href = "/";
  }

  const event = (num) => {
    let deleteButton = document
      .getElementsByClassName("deleteButton")
      .item(num - pageNum + 5);
    if (
      deleteButton.style.display === "" ||
      deleteButton.style.display === "none"
    ) {
      deleteButton.style.display = "block";
    } else {
      deleteButton.style.display = "none";
    }
  };

  const onPage = (num) => {
    let number = num - pageNum + 5;
    let onPage = document.getElementsByClassName("mainContent").item(number);
    if (onPage.style.display === "" || onPage.style.display === "none") {
      onPage.style.display = "block";
    } else {
      onPage.style.display = "none";
    }
  };
  return (
    <Container>
      <TitleBox>
        <Title>
          <Bell />
          &nbsp; 알림함
        </Title>
      </TitleBox>
      <ContentBox>
        {/* map돌리는 부분 (5개까지만) */}
        {data.searchNotification.map((value, index) => {
          if (pageNum - 5 <= index && index < pageNum) {
            return (
              <OneContent key={index}>
                <ClickZon
                  onClick={() => {
                    onPage(index);
                  }}
                >
                  <ContentTitleBox>
                    <ContentTitle>{value.title}</ContentTitle>
                  </ContentTitleBox>
                  <Content>{value.text}</Content>
                  <NotificationTime>{value.timeCreate}</NotificationTime>

                  <MainContent className="mainContent">
                    <ContentTitle>{value.title}</ContentTitle>
                    <Content>{value.text}</Content>
                  </MainContent>
                </ClickZon>
                <MenuButton
                  className="menuButton"
                  onClick={() => {
                    event(index);
                  }}
                >
                  <PointMenu />
                </MenuButton>
                <DeleteButton
                  className="deleteButton"
                  onClick={() => {
                    deleteEvent(value.id);
                  }}
                >
                  알림 삭제
                </DeleteButton>
              </OneContent>
            );
          }
        })}
        {data.searchNotification.length === 0 ? (
          <NullPageBox> 🤔 알림이 없습니다 🤔</NullPageBox>
        ) : (
          ""
        )}
        {/* 위에까지 예시*/}
      </ContentBox>
      {data.searchNotification.length < 5 ? (
        ""
      ) : (
        <PageingNumberBox>
          <NumbersBox>
            <ReversArrowBox
              onClick={() => {
                if (paging !== 5) {
                  setPaging(paging - 5);
                } else {
                  alert("첫번째 페이지입니다.");
                }
              }}
            >
              <ReversArrow />
            </ReversArrowBox>

            {/* map으로 돌릴 부분 */}
            {data.searchNotification.map((value, index) => {
              if (
                index % 5 === 0 &&
                paging - 5 <= index / 5 &&
                index / 5 < paging
              ) {
                return (
                  <PageingNumber
                    key={index}
                    onClick={() => {
                      setPageNum(index + 5);
                    }}
                  >
                    {pageNum - 5 === index ? (
                      <CurrentPage>{index / 5 + 1}</CurrentPage>
                    ) : (
                      index / 5 + 1
                    )}
                  </PageingNumber>
                );
              }
            })}
            {/* map으로 돌릴 부분 */}
            <NextArrowBox
              onClick={() => {
                if (data.searchNotification.length / 5 < paging) {
                  alert("마지막 페이지 입니다.");
                } else {
                  setPaging(paging + 5);
                }
              }}
            >
              <NextArrow />
            </NextArrowBox>
          </NumbersBox>
        </PageingNumberBox>
      )}
    </Container>
  );
};

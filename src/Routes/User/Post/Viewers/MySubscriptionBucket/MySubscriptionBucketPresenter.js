import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Bucket, Exit } from "../../../../../Components/Icons";
import * as jwtDecode from "jwt-decode";

const Container = styled.div`
  width: 80%;
  height: 65vh;
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-row-gap: 80px;
  grid-column-gap: 30px;
`;

const OnePostBox = styled.div`
  width: 100%;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.1);
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const PostTitle = styled.p`
  font-size: 120%;
  width: 100%;
  margin: 25px;
  padding-bottom: 10px;
`;

const Text = styled.p``;

const SubscriptionBox = styled.div`
  display: flex;
  margin: 20px 0 30px 0;
`;

const SubscriptionTitle = styled.p`
  font-size: 20px;
`;

const SubsriptionCancleBox = styled.div`
  display: flex;
  align-items: center;
`;

const SubsriptionCancleBtn = styled.button`
  position: relative;
  border: none;
  background: #ff5f40;
  color: white;
  font-size: 0.8em;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  top: -220px;
  left: 15px;
`;

export default ({ data, onSubmit, render, setRender, refetch, error }) => {
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }

  if (error) {
    window.location.href = "/";
  }
  return (
    <Container>
      <SubscriptionBox>
        <SubscriptionTitle>
          <Bucket />
          나의 구독함
        </SubscriptionTitle>
      </SubscriptionBox>
      {data.findSubscriptionPost.length === 0 ? (
        <>
          <SubscriptionBox>
            <Exit />
            <Text style={{ paddingTop: "10px", paddingRight: "10px" }}>
              아직 구독해놓은 작품이 없습니다 구독해주세요 👉
            </Text>
            <Link to="/">
              <Text style={{ paddingTop: "10px" }}>작품 보러 가기</Text>
            </Link>
          </SubscriptionBox>
        </>
      ) : (
        <PostList>
          {data.findSubscriptionPost.map((post, index) => {
            let countTitle = post.title.length;

            return (
              <OnePostBox>
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={`/episodeList/${post.id}`}
                  key={post.id}
                >
                  <PostThumbnail src={post.thumbnail} />
                </Link>
                <SubsriptionCancleBox>
                  <Link
                    style={{
                      color: "inherit",
                      textDecoration: "inherit",
                      width: "100%"
                    }}
                    to={`/episodeList/${post.id}`}
                    key={post.id}
                  >
                    <PostTitle>
                      {countTitle > 11
                        ? post.title.substring(0, 12) + "..."
                        : post.title}
                    </PostTitle>
                  </Link>
                  <SubsriptionCancleBtn
                    onClick={async () => {
                      await onSubmit(post.id);
                      setRender(!render);
                    }}
                  >
                    X
                  </SubsriptionCancleBtn>
                </SubsriptionCancleBox>
              </OnePostBox>
            );
          })}
        </PostList>
      )}
    </Container>
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BannerList from "./BannerList";
import Loader from "../../Components/Loader";

const Container = styled.div`
  width: 80%;
  height: 125vh;
`;

const BannerBox = styled.div`
  width: 100%;
  height: 350px;
  margin-bottom: 5vh;
  display: flex;
  overflow: hidden;
`;

const PostList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-row-gap: 70px;
  grid-column-gap: 30px;
  margin-top: 60px;
`;

const OnePostBox = styled.div`
  width: 100%;
  box-shadow: 0 1px 11px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 50px;
`;

const PostThumbnail = styled.img`
  width: 100%;
  height: 180px;
  z-index: 1;
`;

const PostTitle = styled.p`
  font-size: 100%;
  padding: 20px;
`;

export default ({ data, bannerData, loading }) => {
  const [present, setPresent] = useState(0);

  if (loading && data && data.allPost === undefined) {
    return <Loader />;
  } else {
    return (
      <Container>
        <BannerList
          bannerData={bannerData}
          present={present}
          setPresent={setPresent}
        />

        <PostList>
          {data.allPost.map((post, index) => {
            let countTitle = post.title.length;
            return (
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to={`/episodeList/${post.id}`}
                key={post.id}
              >
                <OnePostBox>
                  <PostThumbnail src={post.thumbnail} />
                  {countTitle > 11 ? (
                    <PostTitle>{post.title.substring(0, 12)}…</PostTitle>
                  ) : (
                    <PostTitle>{post.title}</PostTitle>
                  )}
                </OnePostBox>
              </Link>
            );
          })}
        </PostList>
      </Container>
    );
  }
};

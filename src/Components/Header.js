import React, { useState } from "react";
import styled from "styled-components";
import { Logo, Search, Bell, Menu } from "./Icons";
import Auth from "../Routes/Auth";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import SmallLoader from "./SmallLoader";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #fafbfc;
  width: 80%;
  height: 120px;
`;

const NoIconBox = styled.div`
  width: 30%;
  display: flex;
  margin-left: 5%;
`;

const HeaderContentUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
`;

const HeaderContentli = styled.li`
  text-align: center;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  margin-right: 10px;
`;

const IconParent = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-around;
  align-items: center;
  margin-right: 5%;
`;

const BellPlace = styled.div``;

const SearchPlace = styled.div``;

const MenuPlace = styled.div``;

const SearchPostBox = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
`;

const MenuInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-top: 3px;
  border: solid 1px #eef1f4;
  margin-top: 8.2vh;
`;

const SearchInfoBox = styled.div`
  width: 100%;
  height: 20vh;
`;

const SearchFindInfo = styled.div`
  border: solid 1px #eef1f4;
  position: absolute;
  background-color: white;
  width: 12.79%;
  z-index: 200;
`;

const SearchInfoTag = styled.div`
  display: flex;
`;

const SearchInfoImg = styled.img`
  width: 30%;
`;

const SearchInfoPost = styled.p`
  padding-left: 3px;
  font-size: 12px;
`;
const SearchInfoPostTitle = styled.p`
  padding-top: 18px;
  padding-left: 3px;
  font-size: 12px;
`;

const LoaderBox = styled.div``;

const SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      title
      thumbnail
      teamName {
        id
        teamName
      }
    }
  }
`;

export default ({ isLoggedIn, searchPoint, menuPoint, setIsLogIn }) => {
  const [value, setValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data, loading, error } = useQuery(SEARCH_POST, {
    variables: {
      term: searchValue
    }
  });

  let searchInfoBox = [];
  if (data && data.searchPost !== undefined) {
    searchInfoBox = data.searchPost;
  }

  return (
    <Header>
      <NoIconBox>
        <HeaderContentUl>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/postRanking">
            <HeaderContentli>랭킹</HeaderContentli>
          </Link>
          <Link to="/categoryOfPostList">
            <HeaderContentli>작품</HeaderContentli>
          </Link>
        </HeaderContentUl>
      </NoIconBox>
      <IconParent>
        {searchPoint ? (
          <SearchInfoBox>
            <SearchPostBox id="SearchPostBox">
              <form autoComplete="off" style={{ width: "100%" }}>
                <MenuInput
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ width: "100%" }}
                  id="SearchPostBox"
                  focus={true}
                  placeholder="🔎작품/제작팀명을 검색해주세요."
                />
              </form>
            </SearchPostBox>

            <SearchFindInfo>
              {searchInfoBox === null ? (
                <>
                  <SearchInfoPost>
                    작품명💿 또는 작가👨🏻‍💻를 입력해주세요
                  </SearchInfoPost>
                </>
              ) : loading ? (
                <LoaderBox>
                  <SearchInfoPost>
                    해당 작품/제작팀을 검색중입니다...🔍
                  </SearchInfoPost>
                  <SmallLoader />
                </LoaderBox>
              ) : searchInfoBox.length === 0 ? (
                <>
                  <SearchInfoPost>
                    해당 작가 및 작품이 존재하지 않습니다😢
                  </SearchInfoPost>
                </>
              ) : (
                searchInfoBox.map((value) => {
                  return (
                    <>
                      <Link
                        to={`/episodeList/${value.id}`}
                        style={{
                          color: "inherit",
                          textDecoration: "inherit"
                        }}
                      >
                        <SearchInfoTag>
                          <SearchInfoImg src={value.thumbnail} />
                          <SearchInfoPostTitle>
                            {value.title.length > 5
                              ? value.title.substr(0, 4) + "..."
                              : value.title}
                          </SearchInfoPostTitle>
                          <SearchInfoPostTitle>/</SearchInfoPostTitle>
                          <SearchInfoPostTitle>
                            {value.teamName.teamName.length > 5
                              ? value.teamName.teamName.substr(0, 3) + "..."
                              : value.teamName.teamName}
                          </SearchInfoPostTitle>
                        </SearchInfoTag>
                      </Link>
                    </>
                  );
                })
              )}
            </SearchFindInfo>
          </SearchInfoBox>
        ) : (
          <>
            <SearchPlace>
              <Search />
            </SearchPlace>
            {menuPoint ? (
              <Auth isLoggedIn={isLoggedIn} setIsLogIn={setIsLogIn} />
            ) : (
              <Auth isLoggedIn={isLoggedIn} style={{ display: "none" }} />
            )}
            {isLoggedIn ? (
              <BellPlace>
                <Link to="/myNotificationBucket">
                  <Bell />
                </Link>
              </BellPlace>
            ) : (
              ""
            )}

            <MenuPlace onClick={() => setValue(!value)}>
              <Menu />
            </MenuPlace>
          </>
        )}
      </IconParent>
    </Header>
  );
};

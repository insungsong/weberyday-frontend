import React, { useState } from "react";
import styled from "styled-components";
import { Logo, Search, Bell, Menu } from "./Icons";
import Auth from "../Routes/Auth";

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
  margin-bottom: 20px;
  border: solid 1px #eef1f4;
`;

export default ({ isLoggedIn, searchPoint, menuPoint }) => {
  const [value, setValue] = useState(false);

  return (
    <Header>
      <NoIconBox>
        <HeaderContentUl>
          <Logo />
          <HeaderContentli>랭킹</HeaderContentli>
          <HeaderContentli>작품</HeaderContentli>
        </HeaderContentUl>
      </NoIconBox>
      <IconParent>
        {searchPoint ? (
          <SearchPostBox id="SearchPostBox">
            <MenuInput
              style={{ width: "100%" }}
              id="SearchPostBox"
              focus={true}
              placeholder="🔎작품/제작팀명을 검색해주세요."
            />
          </SearchPostBox>
        ) : (
          <>
            <SearchPlace>
              <Search />
            </SearchPlace>
            {menuPoint ? <Auth isLoggedIn={isLoggedIn} /> : ""}
            {isLoggedIn ? (
              <BellPlace>
                <Bell />
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

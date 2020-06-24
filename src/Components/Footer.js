import React from "react";
import styled from "styled-components";
import { WeberydayTextLogo } from "./Icons";

const Container = styled.div`
  background-color: #fafbfc;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  font-weight: 600;
  font-size: 12px;
`;

const List = styled.ul`
  display: flex;
  align-items: flex-start;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 18px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => (
  <Container>
    <Footer>
      <WeberydayTextLogo />
      <List>
        <ListItem>
          <Link href="#">회사 소개</Link>
        </ListItem>
        <ListItem>
          <Link href="#">사업자 정보확인</Link>
        </ListItem>
        <ListItem>
          <Link href="#">이용 약관</Link>
        </ListItem>
        <ListItem>
          <Link href="#">개인정보처리방침</Link>
        </ListItem>
        <ListItem>
          <Link href="#">고객지원/공지사항</Link>
        </ListItem>
        <ListItem>
          <Link href="#">블로그</Link>
        </ListItem>
        <ListItem>
          <Link href="#">페이스북</Link>
        </ListItem>
        <ListItem>
          <Link href="#">트워터</Link>
        </ListItem>
        <ListItem>
          <Link href="#">인스타그램</Link>
        </ListItem>
        <ListItem>
          <Link href="#">채용공고</Link>
        </ListItem>
        <ListItem>
          <Link href="#">광고문의</Link>
        </ListItem>
      </List>
      <Copyright>weberyday {new Date().getFullYear()} &copy;</Copyright>
    </Footer>
  </Container>
);

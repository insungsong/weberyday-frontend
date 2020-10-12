import React from "react";
import styled, { keyframes } from "styled-components";
import { LoadingImg } from "./Icons";

const Animation = keyframes`
    0%{
        opacity:0;
        transform: rotate(0deg);
        
    }
    50%{
        opacity:1;
    }

    100%{
        opacity:0;
        transform: rotate(360deg);
        
    }
`;

const LoaderBox = styled.div`
  width: 100%;
  height: 80vh;
`;

const Loader = styled.div`
  animation: ${Animation} 5s linear infinite;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 1s;
`;

export default () => (
  <LoaderBox>
    <Loader>
      <LoadingImg size={100} />
    </Loader>
  </LoaderBox>
);

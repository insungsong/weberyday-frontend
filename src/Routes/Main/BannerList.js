import React from "react";
import styled from "styled-components";
import { RightArrow, LeftArrow } from "../../Components/Icons";
import Loader from "../../Components/Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BannerSlideBox = styled.div`
  width: 95%;
  overflow: hidden;
`;

const BannerImageBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 100%);
  width: 100%;
  position: relative;
  transition: transform 300ms;
`;

const BannerImagePack = styled.div`
  width: 100%;
`;

const BannerImage = styled.img`
  width: 100%;
  transition-property: opacity;
  transition-duration: 5s;
  cursor: pointer;
`;

const ArrowBox = styled.div`
  display: flex;
  max-width: 80%;
  width: 100%;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const LeftArrowBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CountPoint = styled.div`
  display: flex;
  align-items: center;
`;

const PointBox = styled.div`
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Point = styled.div`
  width: 10px;
  height: 0;
  border: 3px solid #4996c4;
  border-radius: 50%;
  margin: 0 10px;
`;

const SeletePoint = styled.div`
  width: 10px;
  border: 6px solid #4996c4;
  border-radius: 50%;
  margin: 0 10px;
`;

const RightArrowBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

//bannerData:
export default ({ bannerData, present, setPresent }) => {
  let value = 0;

  if (bannerData !== undefined && bannerData.allBanner !== undefined) {
    return (
      <Container>
        <BannerSlideBox>
          {/* 배너의 이미지를 길게 쭉 빼놓고 overflow:hidden을 주어 밖으로 삐져나온 부분을 안보이게 만든다. */}
          {/* 액자처럼 사이즈를 정해놓고 해당 범위만 보여주고 뒤에선 이미지를 옆으로 이동시키면서 슬라이드 형식으로 만든것 */}
          <BannerImageBox id="imgBox">
            {bannerData.allBanner.map((banner, index) => {
              value++;
              return (
                //이미지를 쭉 늘어놓는곳
                <BannerImagePack key={index}>
                  <BannerImage
                    id={index * 100}
                    //해당 배너를 클릭시 배너가 가지고 있는 url로 이동
                    onClick={() => {
                      window.location.href = `${bannerData.allBanner[index].url}`;
                    }}
                    className="slideValue"
                    key={banner + index}
                    src={bannerData.allBanner[index].image}
                  />
                </BannerImagePack>
              );
            })}
          </BannerImageBox>
        </BannerSlideBox>
        <ArrowBox>
          <LeftArrowBox
            //왼쪽 화살표 이전의 배너 이미지를 보여준다.
            onClick={() => {
              //길게 되어있는 배너이미지를 선택하여
              let movingBox = document.getElementById("imgBox");
              setPresent((present -= 100));
              //애니매이션과 함께 위치를 조정해준다.
              //만약 첫번째 페이지라면 마지막페이지로 위치를 변경시켜준다.
              if (present / 100 < 0) {
                setPresent((value - 1) * 100);
                present = (value - 1) * 100;
                movingBox.style.transform = `translateX(-${present}%)`;
              } else {
                movingBox.style.transform = `translateX(-${present}%)`;
              }
            }}
          >
            <LeftArrow />
          </LeftArrowBox>
          <CountPoint>
            {/* 배너의 갯수를 보여주는 부분  */}
            {bannerData.allBanner.map((item, index) => {
              if (index !== present / 100) {
                return (
                  <PointBox
                    key={index + item}
                    onClick={() => {
                      /// 해당 위치를 클릭해도 위치한 배너로 이동한다.
                      let movingBox = document.getElementById("imgBox");
                      if (present === 0) {
                        //이동 기준이 100%를 기준으로 잡아 숫자 100을 강제로 박아준것. ex)100 * 1 ,2 ,3 ...
                        setPresent(100 * index);
                        movingBox.style.transform = `translateX(-100%)`;
                      } else {
                        setPresent(100 * index);
                        movingBox.style.transform = `translateX(-${
                          100 * index
                        }%)`;
                      }
                    }}
                  >
                    <Point />
                  </PointBox>
                );
              } else {
                return (
                  <PointBox key={index}>
                    <SeletePoint />
                  </PointBox>
                );
              }
            })}
          </CountPoint>
          <RightArrowBox
            onClick={async () => {
              //위에 화살표의 반대 방향으로 이벤트까지 다 준것
              setPresent((present += 100));
              let movingBox = document.getElementById("imgBox");
              if (present / 100 >= value) {
                await setPresent(0);
                present = 0;
                movingBox.style.transform = `translateX(-${present}%)`;
              } else {
                movingBox.style.transform = `translateX(-${present}%)`;
              }
            }}
          >
            <RightArrow />
          </RightArrowBox>
        </ArrowBox>
      </Container>
    );
  } else {
    return <Loader />;
  }
};

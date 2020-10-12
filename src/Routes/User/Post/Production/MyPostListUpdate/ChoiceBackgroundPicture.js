import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ThumbnailUpload } from "../../../../../Components/Icons";
import * as jwtDecode from "jwt-decode";

export default ({
  backgroudPictureFilter,
  setBackgroudPictureFilter,
  img,
  backgroundImgBase64,
  setBackgroundImgBase64
}) => {
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }

  const [number, setNumber] = useState(2);
  const [isTrue, setIsTrue] = useState(true);

  useEffect(() => {
    if (number === 0) {
      setBackgroudPictureFilter("0");
      toast.success("사용가능한 썸네일입니다. 😄");
    } else if (number === -1 || number === -2) {
      setBackgroudPictureFilter("no");
      toast.error("썸네일의 규격을 맞춰주시길 바랍니다.");
      setIsTrue(false);
    }
    setNumber("");
  }, [number]);

  useEffect(() => {
    setNumber("");
  }, [backgroundImgBase64]);

  const handleChangeFile = async (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;

      if (base64) {
        setBackgroundImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      //setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
    setIsTrue(true);
  };
  let width = 0;
  let height = 0;

  const imageOnLoad = () => {
    setTimeout(() => {
      let choiceBackgroundImage = document.getElementById(
        "choiceBackgroundImage"
      );
      //해당 사진의 실제 크기를 구하기 위해 width, height를 null로 준다.
      if (document.getElementById("choiceBackgroundImage") !== null) {
        document.getElementById("choiceBackgroundImage").style.width = null;
        document.getElementById("choiceBackgroundImage").style.height = null;
      }
      if (backgroundImgBase64 !== null && choiceBackgroundImage !== null) {
        // 사진의 실제 사이즈를 clientWidth, clientHeight로 구한다.
        width = choiceBackgroundImage.clientWidth;
        height = choiceBackgroundImage.clientHeight;

        //실제 사이즈를 가지고 해당 사이즈가 우리의 조건과 맞는지 확인한다.
        if (width === 1350 && height === 220) {
          //해당 조건에 맞는 사진이 예쁘게 보여지도록 사이즈를 조절해준다.
          document.getElementById("choiceBackgroundImage").style.width = "100%";
          document.getElementById("choiceBackgroundImage").style.height =
            "100px";

          if (choiceBackgroundImage.src.indexOf("weberyday") !== -1) {
            setNumber(choiceBackgroundImage.src.indexOf("weberyday")); //0
          } else {
            setNumber(choiceBackgroundImage.src.indexOf("data:"));
          }
        } else {
          choiceBackgroundImage.src = "";
          setNumber(choiceBackgroundImage.src.indexOf("data:")); //-1
          document.getElementById("choiceBackgroundImage").style.width =
            "280px";
          document.getElementById("choiceBackgroundImage").style.height =
            "180px";
        }
      }
    });
  };
  return (
    <div className="App">
      {backgroundImgBase64 !== "" ? (
        <>
          {isTrue === true ? (
            <img
              id="choiceBackgroundImage"
              src={backgroundImgBase64}
              onLoad={imageOnLoad}
            />
          ) : (
            <ThumbnailUpload />
          )}
        </>
      ) : (
        <>
          {img ? (
            <>
              <img id="choiceBackgroundImage" src={img} onLoad={imageOnLoad} />
            </>
          ) : (
            <ThumbnailUpload />
          )}
        </>
      )}
      <div>
        <input
          type="file"
          name="postBackgroundImg"
          id="postBackgroundImg"
          accept="image/png"
          style={{
            opacity: "0",
            width: "280px",
            height: "180px",
            position: "absolute",
            top: "0",
            left: "0"
          }}
          onChange={handleChangeFile}
        />
      </div>
    </div>
  );
};

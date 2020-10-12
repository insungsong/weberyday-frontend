import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ThumbnailUpload } from "../../../../../Components/Icons";
import * as jwtDecode from "jwt-decode";

export default ({
  pictureFilter,
  setPictureFilter,
  img,
  imgBase64,
  setImgBase64
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
      setPictureFilter("0");
      toast.success("사용가능한 썸네일입니다. 😄");
    } else if (number === -1 || number === -2) {
      setPictureFilter("no");
      toast.error("썸네일의 규격을 맞춰주시길 바랍니다.");
      setIsTrue(false);
    }
    setNumber("");
  }, [number]);

  const handleChangeFile = async (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;

      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
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
      let choicePicture = document.getElementById("choicePicture");

      //해당 사진의 실제 크기를 구하기 위해 width, height를 null로 준다.
      if (document.getElementById("choicePicture") !== null) {
        document.getElementById("choicePicture").style.width = null;
        document.getElementById("choicePicture").style.height = null;
      }
      if (imgBase64 !== null && choicePicture !== null) {
        // 사진의 실제 사이즈를 clientWidth, clientHeight로 구한다.
        width = choicePicture.clientWidth;
        height = choicePicture.clientHeight;

        //실제 사이즈를 가지고 해당 사이즈가 우리의 조건과 맞는지 확인한다.
        if (width === 600 && height === 400) {
          //해당 조건에 맞는 사진이 예쁘게 보여지도록 사이즈를 조절해준다.
          document.getElementById("choicePicture").style.width = "280px";
          document.getElementById("choicePicture").style.height = "180px";

          if (choicePicture.src.indexOf("weberyday") !== -1) {
            //db에 저장해놨던 사진
            setNumber(choicePicture.src.indexOf("weberyday"));
          } else {
            //규격에 맞는 사진을 넣었을때
            setNumber(choicePicture.src.indexOf("data:")); //0
          }
        } else {
          //규격에 맞지 않는 사진을 넣었을떄
          choicePicture.src = "";
          setNumber(choicePicture.src.indexOf("data:")); //-1
          if (document.getElementById("choicePicture") !== null) {
            document.getElementById("choicePicture").style.width = "280px";
            document.getElementById("choicePicture").style.height = "180px";
          }
        }
      }
    });
  };
  return (
    <div className="App">
      {imgBase64 !== "" ? (
        <>
          {isTrue === true ? (
            <img id="choicePicture" src={imgBase64} onLoad={imageOnLoad} />
          ) : (
            <ThumbnailUpload />
          )}
        </>
      ) : (
        <img id="choicePicture" src={img} onLoad={imageOnLoad} />
      )}
      <div>
        <input
          type="file"
          name="postThumnail"
          id="postThumnail"
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

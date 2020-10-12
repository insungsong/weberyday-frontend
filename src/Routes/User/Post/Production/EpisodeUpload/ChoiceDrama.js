import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { UploadVideoIcon } from "../../../../../Components/Icons";
import * as jwtDecode from "jwt-decode";

export default ({ videoBase64, setVideoBase64, setPictureFilter }) => {
  //실시간으로 영상을 업로드할때 해당 토큰이 본인의 토큰인지 확인하기 위함
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (number === 0) {
      setPictureFilter("0");
      toast.success("사용가능한 썸네일입니다. 😄");
    } else if (number === -1) {
      setPictureFilter("");
      toast.error("썸네일의 규격을 맞춰주시길 바랍니다.");
    }
  }, [number]);

  const handleChangeFile = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setVideoBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      //setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };

  return (
    <div className="App">
      {videoBase64 === "" ? (
        <>
          <UploadVideoIcon />
        </>
      ) : (
        <video
          controls
          id="choiceVideo"
          src={videoBase64}
          style={{ width: "100%" }}
        />
      )}
      <div>
        <input
          type="file"
          name="videoFile"
          id="videoFile"
          accept="video/*"
          style={{ display: "absolute" }}
          onChange={handleChangeFile}
        />
      </div>
    </div>
  );
};

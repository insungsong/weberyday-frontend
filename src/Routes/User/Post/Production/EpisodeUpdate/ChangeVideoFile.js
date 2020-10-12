import React, { useState, useEffect } from "react";
import * as jwtDecode from "jwt-decode";

export default ({ videoBase64, setVideoBase64, episodeVideoFile }) => {
  //토큰 조작이 있는지 없는지 감지 하기 위함
  try {
    jwtDecode(localStorage.getItem("token"));
  } catch (e) {
    localStorage.removeItem("userEmailToken");
    localStorage.removeItem("token");

    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  }

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
        <video
          controls
          id="choiceVideo"
          src={episodeVideoFile}
          style={{ width: "100%" }}
        />
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

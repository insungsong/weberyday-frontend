import React from "react";

export const Logo = () => (
  <img
    src="../Images/weberydayImageLogo.png"
    alt="weberydayLogo"
    width="64"
    height="64"
  />
);

export const Search = () => (
  <svg
    className="Search"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      className="Search"
      d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"
    />
  </svg>
);

export const Bell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z" />
  </svg>
);

export const Menu = () => (
  <svg
    className="Menu"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      className="Menu"
      d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
    />
  </svg>
);

export const WeberydayTextLogo = () => (
  <img
    src="../Images/weberydayTextLogo.png"
    alt="weberydayLogo"
    width="200"
    height="50"
  />
);

export const FacebookLogoImg = () => (
  <img
    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzIxOTZGMzsiIGQ9Ik01My4zMzMsMGg0MDUuMzMzQzQ4OC4xMjIsMCw1MTIsMjMuODc4LDUxMiw1My4zMzN2NDA1LjMzM0M1MTIsNDg4LjEyMiw0ODguMTIyLDUxMiw0NTguNjY3LDUxMg0KCUg1My4zMzNDMjMuODc4LDUxMiwwLDQ4OC4xMjIsMCw0NTguNjY3VjUzLjMzM0MwLDIzLjg3OCwyMy44NzgsMCw1My4zMzMsMHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQUZBRkE7IiBkPSJNMzk0LjY2NywxNDkuMzMzaDQyLjY2N2M1Ljg5MSwwLDEwLjY2Ny00Ljc3NiwxMC42NjctMTAuNjY3di02NEM0NDgsNjguNzc2LDQ0My4yMjQsNjQsNDM3LjMzMyw2NA0KCWgtNDIuNjY3Yy02NC44MDEsMC0xMTcuMzMzLDUyLjUzMi0xMTcuMzMzLDExNy4zMzN2NTMuMzMzSDIyNGMtNS44OTEsMC0xMC42NjcsNC43NzYtMTAuNjY3LDEwLjY2N3Y2NA0KCWMwLDUuODkxLDQuNzc2LDEwLjY2NywxMC42NjcsMTAuNjY3aDUzLjMzM3YxOTJoODUuMzMzVjMyMEg0MTZjNC41ODktMC4wMDMsOC42NjItMi45NDIsMTAuMTEyLTcuMjk2bDIxLjMzMy02NA0KCWMxLjg2Mi01LjU4OS0xLjE2LTExLjYyOS02Ljc0OS0xMy40OTFjLTEuMDg0LTAuMzYxLTIuMjItMC41NDYtMy4zNjMtMC41NDdoLTc0LjY2N3YtNTMuMzMzDQoJQzM2Mi42NjcsMTYzLjY2LDM3Ni45OTQsMTQ5LjMzMywzOTQuNjY3LDE0OS4zMzN6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
    width="35"
  />
);

export const KakaoLogoImg = () => (
  <img
    alt="resource preview"
    src="https://developers.kakao.com/tool/resource/static/img/button/kakaolink/kakaolink_btn_small.png"
    width="35"
  />
);

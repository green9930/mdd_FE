// REST API
import axios, { AxiosError } from "axios";
import { getLoc, removeLoc, setLoc } from "../utils/localStorage";

/* REQUEST WITHOUT ACCESSTOKEN                                                */
/* -------------------------------------------------------------------------- */
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/* REQUEST WITH ACCESSTOKEN                                                   */
/* -------------------------------------------------------------------------- */
export const tokenInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

/* INTERCEPTOR                                                                */
/* -------------------------------------------------------------------------- */
tokenInstance.interceptors.request.use(
  (config) => {
    const accessToken = getLoc("accessToken");
    if (accessToken && accessToken !== null) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // 만료된 엑세스 토큰 error code = 401
    if (error.response.status === 401) {
      const refreshToken = getLoc("refreshToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/members/reissue`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const newAccessToken = response.headers.accesstoken;
        const data = response.data.memberInfo;

        setLoc("accessToken", newAccessToken);
        setLoc("nickname", data.nickname);
        setLoc("memberName", data.memberName);
        setLoc("memberId", data.memberId);

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

        // 새로운 엑세스 토큰으로 새 요청 시도
        return axios(originalRequest);
      } catch (error: AxiosError | any) {
        const status = error.response.status;
        // 잘못된 리프레시 토큰 error code = 401
        if (status === 401) {
          window.alert("로그인이 만료되었습니다. 로그인을 다시 해주세요.");
          removeLoc("accessToken");
          removeLoc("memberId");
          removeLoc("nickname");
          removeLoc("refreshToken");
          removeLoc("memberName");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

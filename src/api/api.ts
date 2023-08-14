// REST API
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { clearLoc, getLoc, setLoc } from "../utils/localStorage";

const accessToken = getLoc("accessToken");

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
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

/* REQUEST WITH IMG                                                           */
/* -------------------------------------------------------------------------- */
export const formInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    responseType: "blob",
    Authorization: `Bearer ${accessToken}`,
  },
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
    console.log(response);
    return response;
  },
  async (error) => {
    const status = error.response.status;
    const removeInstance = () => {
      delete axios.defaults.headers.common.Authorization;
      delete tokenInstance.defaults.headers.common.Authorization;
    };
    // 만료된 엑세스 토큰 error code = 401
    if (status === 401) {
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

        removeInstance();
        tokenInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await tokenInstance.request(error.config);
      } catch (error: AxiosError | any) {
        const status = error.response.status;
        const errorMessage = error.response.data.errorMessage;
        // 잘못된 리프레시 토큰 error code = 401
        if (status === 401) {
          window.alert(errorMessage);
          clearLoc();
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

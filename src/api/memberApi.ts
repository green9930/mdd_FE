import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getLoc, setLoc } from "../utils/localStorage";
import { instance, tokenInstance } from "./api";

export interface AuthData {
  memberName: string;
  password: string;
}

export const postJoin = async (postData: AuthData) => {
  try {
    const { data } = await tokenInstance.post("/api/v1/members/join", postData);
    console.log(data);
    // return data;
  } catch (err: AxiosError | any) {
    console.log(err.response.data);
    throw err;
  }
};

export const postLogin = async (postData: AuthData) => {
  try {
    const res = await instance.post("/api/v1/members/login", postData);
    const accessToken = res.headers.accesstoken;
    const refreshToken = res.headers.refreshtoken;
    const data = res.data.memberInfo;
    setLoc("accessToken", accessToken);
    setLoc("refreshToken", refreshToken);
    setLoc("nickname", data.nickname);
    setLoc("memberName", data.memberName);
    setLoc("memberId", data.memberId);
    return res;
  } catch (err: AxiosError | any) {
    console.log(err);
    throw err;
  }
};

export const getMyInfo = async () => {
  try {
    const res = await tokenInstance.get("/api/v1/members/mypage");
    console.log(res);
    return res.data;
  } catch (err: AxiosError | any) {
    console.log(err);
    throw err;
  }
};

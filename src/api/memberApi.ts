import axios, { AxiosError } from "axios";
import { setLoc } from "../utils/localStorage";
import { instance, tokenInstance } from "./api";

export interface AuthData {
  memberName: string;
  password: string;
}

export const postJoin = async (postData: AuthData) => {
  try {
    const res = await instance.post("/api/v1/members/join", {
      memberName: postData.memberName,
      password: postData.password,
    });
    const accessToken = res.headers.accesstoken;
    const refreshToken = res.headers.refreshtoken;
    const data = res.data.memberInfo;
    setLoc("accessToken", accessToken);
    setLoc("refreshToken", refreshToken);
    setLoc("nickname", data.nickname);
    setLoc("memberName", data.memberName);
    setLoc("memberId", data.memberId);
    return res.data;
  } catch (err: AxiosError | any) {
    throw err;
  }
};

export const getDuplicatedId = async (memberName: string) => {
  try {
    const { data } = await instance.get(`/api/v1/members/check/${memberName}`);
    return data;
  } catch (err: AxiosError | any) {
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
    throw err;
  }
};

export const getMemberInfo = async (memberId: string) => {
  try {
    const res = await tokenInstance.get(`/api/v1/members/${memberId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchMyInfo = async (data: any) => {
  try {
    await tokenInstance.patch("/api/v1/members", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
      },
    });
  } catch (err) {
    throw err;
  }
};

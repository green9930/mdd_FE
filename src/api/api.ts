// REST API
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export interface AuthDataType {
  memberName: string;
  password: string;
}

export const postJoin = async (postData: AuthDataType) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/members/join`,
      postData
    );
    console.log(data);
    // return data;
  } catch (error: AxiosError | any) {
    console.log(error.response.data);
  }
};

export const postLogin = async (postData: AuthDataType) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/members/login`,
      postData
    );
    console.log(data);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("nickname", data.memberInfo.nickname);
    localStorage.setItem("memberName", data.memberInfo.memberName);
    localStorage.setItem("memberId", data.memberInfo.memberId);
    // return data;
  } catch (error: AxiosError | any) {
    console.log(error.response.data);
  }
};

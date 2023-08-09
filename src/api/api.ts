// REST API
import axios from "axios";

export interface SignUpDataType {
  memberName: string;
  password: string;
  nickname: string;
  introduce: string;
}
export interface LoginDataType {
  memberName: string;
  password: string;
}

export const postJoin = async (postData: SignUpDataType) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/members/join`,
      postData
    );
    console.log(data);
    // return data;
  } catch (error) {
    console.log(error);
  }
};

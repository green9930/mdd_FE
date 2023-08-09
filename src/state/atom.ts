import { atom } from "recoil";
import { SignUpDataType } from "../api/api";

// 라이트모드 | 다크모드
export const lightThemeState = atom<boolean>({
  key: "lightThemeState",
  default: true,
});

export const signUpData = atom<SignUpDataType>({
  key: "signUpData",
  default: {
    memberName: "",
    password: "",
    nickname: "",
    introduce: "",
  },
});

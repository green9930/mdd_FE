import { atom } from "recoil";
import { AuthDataType } from "../api/api";
import { NewDiskType } from "../types/diskTypes";

// 라이트모드 | 다크모드
export const lightThemeState = atom<boolean>({
  key: "lightThemeState",
  default: true,
});

export const signUpData = atom<AuthDataType>({
  key: "signUpData",
  default: {
    memberName: "",
    password: "",
  },
});

export const newDiskState = atom<NewDiskType>({
  key: "newDiskState",
  default: {
    // diskName: "",
    diskName: "상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "",
    diskColor: "PINK",
    isPrivate: false,
  },
});

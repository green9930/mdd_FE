import { atom } from "recoil";
import { AuthDataType } from "../api/api";
import { NewDiskType } from "../types/diskTypes";
import { DiskPageType } from "../types/etcTypes";

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
    diskName: "",
    content: "",
    diskColor: "PINK",
    isPrivate: false,
  },
});

export const pageState = atom<DiskPageType>({
  key: "pageState",
  default: "diskListGallery",
});

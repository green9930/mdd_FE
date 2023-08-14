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

export const pageState = atom<DiskPageType>({
  key: "pageState",
  default: "diskListGallery",
});

export const newDiskState = atom<NewDiskType>({
  key: "newDiskState",
  default: {
    diskName: "",
    content: "",
    diskColor: "PINK",
    isPrivate: false,
    isBookmark: false,
  },
});

export const deleteToastState = atom<boolean>({
  key: "deleteToastState",
  default: false,
});

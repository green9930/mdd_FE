import { atom } from "recoil";
import { AuthData } from "../api/memberApi";
import { NewDiskType } from "../types/diskTypes";
import { DiskPageType, NewDiskStepType } from "../types/etcTypes";

// 라이트모드 | 다크모드
export const lightThemeState = atom<boolean>({
  key: "lightThemeState",
  default: true,
});

// Route rerendering
export const routeState = atom<boolean>({
  key: "routeState",
  default: true,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});

export const signUpState = atom<boolean>({
  key: "signUpState",
  default: false,
});

export const signUpData = atom<AuthData>({
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

export const newDiskStepState = atom<NewDiskStepType>({
  key: "newDiskStepState",
  default: "newDisk1",
});

export const newDiskState = atom<NewDiskType>({
  key: "newDiskState",
  default: {
    diskName: "",
    content: "",
    diskColor: "PINK",
    // isPrivate: false,
    isBookmark: false,
  },
});

export const createToastState = atom<boolean>({
  key: "createToastState",
  default: false,
});

export const deleteToastState = atom<boolean>({
  key: "deleteToastState",
  default: false,
});

export const bookmarkToastState = atom<{
  open: boolean;
  text: "대표 디스크로 설정되었어요" | "대표 디스크 자리가 꽉 찼어요!";
}>({
  key: "bookmarkToastState",
  default: {
    open: false,
    text: "대표 디스크로 설정되었어요",
  },
});

export const logoutToastState = atom<boolean>({
  key: "logoutToastState",
  default: false,
});

export const unregisterToastState = atom<boolean>({
  key: "unregisterToastState",
  default: false,
});

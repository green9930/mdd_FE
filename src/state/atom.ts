import { atom } from "recoil";

// 라이트모드 | 다크모드
export const lightThemeState = atom<boolean>({
  key: "lightThemeState",
  default: true,
});

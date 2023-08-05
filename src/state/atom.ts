import { atom } from "recoil";

export const testState = atom<string>({
  key: "testSTate",
  default: "",
});

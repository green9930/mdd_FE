export type InputStatusType = "default" | "warning" | "focused" | "disabled";

export type BtnStatusType =
  | "primary01"
  | "primary02"
  | "disabled"
  | "unregister"
  | "transparent";

export type DiskPageType =
  | "diskListFeed"
  | "diskListGallery"
  | "newDisk"
  | "settings";

export type GuideText = {
  [key: number]: string[];
};

export type StepType = {
  [key: number]: string;
};

export type ValidationType = {
  text: string;
  validation: RegExp;
};

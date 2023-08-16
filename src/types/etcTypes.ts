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
  | "editDisk"
  | "newDisk"
  | "settings";

export type NewDiskStepType =
  | "newDiskSignUp1"
  | "newDiskSignUp2"
  | "newDisk1"
  | "newDisk2";

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

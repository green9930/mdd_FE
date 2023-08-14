import { StepType } from "../pages/NewDiskPage";

export const DISK_COLOR_LIST = [
  "PINK",
  "YELLOW",
  "SKYBLUE",
  "NEON_ORANGE",
  "PURPLE",
] as const;

export type DiskColorType = (typeof DISK_COLOR_LIST)[number];

export type NewDiskType = {
  diskName: string;
  content: string;
  diskColor: DiskColorType;
  isPrivate: boolean;
  isBookmark: boolean;
};

export interface newDiskProps extends React.HTMLAttributes<HTMLDivElement> {
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  titleText: string;
}

export type DiskListType = {
  content: string;
  createdAt: string;
  diskColor: DiskColorType;
  diskId: number;
  diskName: DiskColorType;
  diskOwnerId: number;
  diskOwnerNickname: string;
  isBookmark: boolean;
  isMine: boolean;
  isPrivate: boolean;
  likeCount: number;
  modifiedAt: string;
};

export const DISK_BTN_LIST = [
  "like",
  "edit",
  "delete",
  "bookmark",
  "mode",
] as const;

export type DiskBtnType = (typeof DISK_BTN_LIST)[number];

export type DiskModeType = "gallery" | "text";

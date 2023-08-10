import { StepType } from "../pages/NewDiskPage";

export const DISK_COLOR_LIST = [
  "PINK",
  "YELLOW",
  "SKYBLUE",
  "NEONORANGE",
  "PURPLE",
] as const;

export type DiskColorType = (typeof DISK_COLOR_LIST)[number];

export type NewDiskType = {
  diskName: string;
  content: string;
  diskColor: DiskColorType;
  isPrivate: boolean;
};

export interface newDiskProps extends React.HTMLAttributes<HTMLDivElement> {
  step: StepType;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
  titleText: string;
}

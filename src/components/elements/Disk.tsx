import React from "react";
import { DiskColorType } from "../../types/diskTypes";

import DiskNeonOrange from "../../assets/img/disk_neonOrange.png";
import DiskPink from "../../assets/img/disk_pink.png";
import DiskPurple from "../../assets/img/disk_purple.png";
import DiskSkyblue from "../../assets/img/disk_skyblue.png";
import DiskYellow from "../../assets/img/disk_yellow.png";
import styled from "styled-components";

interface DiskProps extends React.HTMLAttributes<HTMLImageElement> {
  diskColor: DiskColorType;
}

const Disk = ({ diskColor }: DiskProps) => {
  switch (diskColor) {
    case "NEONORANGE":
      return <StDisk src={DiskNeonOrange} alt="disk_neonOrange" />;
    case "PINK":
      return <StDisk src={DiskPink} alt="disk_pink" />;
    case "PURPLE":
      return <StDisk src={DiskPurple} alt="disk_purple" />;
    case "SKYBLUE":
      return <StDisk src={DiskSkyblue} alt="disk_skyblue" />;
    case "YELLOW":
      return <StDisk src={DiskYellow} alt="disk_yellow" />;
    default:
      return <></>;
  }
};

export default Disk;

const StDisk = styled.img`
  width: 100%;
  height: auto;
`;

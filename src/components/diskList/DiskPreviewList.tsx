import styled from "styled-components";
import { calcRem } from "../../styles/theme";

import { DISK_IMG_MAX_LENGTH } from "../../utils/validations";

const DiskPreviewList = (
  list: any[],
  handleMainImg: (target: number) => void
) => {
  const arr = [];
  for (let i = 0; i < DISK_IMG_MAX_LENGTH; i++) {
    arr.push(
      <li key={`${i}-${list[i]}`}>
        <StPreview onClick={() => handleMainImg(i)}>
          <img src={list[i]} alt={`preview-${i}`} />
        </StPreview>
      </li>
    );
  }
  return arr;
};

export default DiskPreviewList;

const StPreview = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    display: flex;
    align-items: center;
    width: ${calcRem(24)};
    position: absolute;
    top: ${calcRem(4)};
    left: ${calcRem(4)};
    z-index: 11;
  }
`;

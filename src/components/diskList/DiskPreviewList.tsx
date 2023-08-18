import styled from "styled-components";
import { calcRem } from "../../styles/theme";

import { DISK_IMG_MAX_LENGTH } from "../../utils/validations";
import { DiskImgType } from "../../types/diskTypes";

const DiskPreviewList = (
  list: DiskImgType[],
  mainImg: string,
  handleMainImg: (target: number) => void
) => {
  const arr = [];
  for (let i = 0; i < DISK_IMG_MAX_LENGTH; i++) {
    arr.push(
      <li key={`preview-${i}`}>
        {list[i] ? (
          <StPreview visibile={true} onClick={() => handleMainImg(i)}>
            {list[i].imgUrl === mainImg ? <StDim /> : <></>}
            <img src={list[i].imgUrl} alt={`preview-${list[i].imgId}`} />
          </StPreview>
        ) : (
          <StPreview visibile={false} />
        )}
      </li>
    );
  }
  return arr;
};

export default DiskPreviewList;

const StPreview = styled.div<{ visibile: boolean }>`
  opacity: ${({ visibile }) => (visibile ? 1 : 0)};
  display: flex;
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  cursor: ${({ visibile }) => (visibile ? "pointer" : "default")};

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

const StDim = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.transparent03};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

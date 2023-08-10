import { ChangeEvent } from "react";
import styled from "styled-components";
import { calcRem } from "../../styles/theme";

import { ReactComponent as GalleryAdd } from "../../assets/svg/gallery_add.svg";
import { ReactComponent as CloseCircle } from "../../assets/svg/close_circle.svg";
import { DISK_IMG_MAX_LENGTH } from "../../utils/validations";

const PreviewList = (
  list: any[],
  handleAddImg: (e: ChangeEvent<HTMLInputElement>) => Promise<void>,
  handleDeleteImg: (target: number) => void,
  handleMainImg: (target: number) => void
) => {
  const arr = [];
  for (let i = 0; i < DISK_IMG_MAX_LENGTH; i++) {
    arr.push(
      <li key={`${i}-${list[i]}`}>
        {list[i] ? (
          <StPreview onClick={() => handleMainImg(i)}>
            <button onClick={() => handleDeleteImg(i)}>
              <CloseCircle />
            </button>
            <img src={list[i]} alt={`preview-${i}`} />
          </StPreview>
        ) : (
          <StAddImage htmlFor="disk-img">
            <GalleryAdd />
            <input
              type="file"
              id="disk-img"
              accept=".png, .jpg, .jpeg"
              onChange={handleAddImg}
              multiple
            />
          </StAddImage>
        )}
      </li>
    );
  }
  return arr;
};

export default PreviewList;

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

    svg {
      width: ${calcRem(24)};
      height: ${calcRem(24)};
    }
  }
`;
const StAddImage = styled.label`
  cursor: pointer;
  input {
    display: none;
  }
  svg {
    width: ${calcRem(32)};
    height: ${calcRem(32)};
  }
`;

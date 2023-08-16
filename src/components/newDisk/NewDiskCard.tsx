import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { diskTheme, lightTheme } from "../../styles/colors";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../../styles/theme";

import { ReactComponent as EmptyRegisterDisk } from "../../assets/svg/empty_register_disk.svg";
import PreviewList from "./PreviewList";
import { DiskColorType, DiskType, NewDiskType } from "../../types/diskTypes";
import { DISK_IMG_MAX_LENGTH } from "../../utils/validations";

interface NewDiskCardProps {
  isNew: boolean;
  disk: NewDiskType | DiskType;
  files: File[];
  setFiles: (value: React.SetStateAction<File[]>) => void;
  previewList: any[];
  setPreviewList: (value: React.SetStateAction<any[]>) => void;
  mainImg: string;
  setMainImg: (value: React.SetStateAction<string>) => void;
  setDeleteImgList?: React.Dispatch<React.SetStateAction<number[]>>;
}

const NewDiskCard = ({
  isNew,
  disk,
  files,
  setFiles,
  previewList,
  setPreviewList,
  mainImg,
  setMainImg,
  setDeleteImgList,
}: NewDiskCardProps) => {
  const handleAddImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.files;

    if (target && target.length) {
      if (target.length + previewList.length > DISK_IMG_MAX_LENGTH) {
        window.alert("사진은 최대 4개까지 등록할 수 있습니다.");
      } else {
        const newFiles: File[] = Array.from(target);
        newFiles.map(async (file) => {
          try {
            setFiles([...files, ...newFiles]);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const previewImgUrl = reader.result;
              setPreviewList((prev) => [...prev, previewImgUrl]);
            };
          } catch (err) {
            window.alert("사진을 불러올 수 없습니다.");
            console.log("UPLOAD IMAGE ERROR >> ", err);
          }
        });
      }
    }
  };

  const handleDeleteImg = (e: React.MouseEvent, target: number) => {
    e.stopPropagation();
    if (isNew) {
      setFiles(files.filter((_, idx) => idx !== target));
    } else {
      if (setDeleteImgList) {
        setDeleteImgList((prev) => [
          ...prev,
          (disk as DiskType).image[target].imgId,
        ]);
      }
      if (mainImg === previewList[target]) {
        target === 0 ? setMainImg(previewList[1]) : setMainImg(previewList[0]);
      }
    }
    setPreviewList(previewList.filter((_, idx) => idx !== target));
  };

  const handleMainImg = (target: number) => {
    setMainImg(previewList[target]);
  };

  return (
    <StGallery diskColor={disk.diskColor}>
      <StDiskName diskColor={disk.diskColor}>{disk.diskName}</StDiskName>
      <StPreviewContainer>
        {previewList.length ? (
          <StMainImg src={mainImg} alt="main-preview" />
        ) : (
          <StEmptyContainer>
            <EmptyRegisterDisk />
            <span>1장 이상의 이미지를 등록해주세요</span>
          </StEmptyContainer>
        )}
      </StPreviewContainer>
      <StImgList>
        {PreviewList(previewList, handleAddImg, handleDeleteImg, handleMainImg)}
      </StImgList>
    </StGallery>
  );
};

export default NewDiskCard;

const StGallery = styled.div<{ diskColor: DiskColorType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(16)};
  width: 412px;
  height: auto;
  padding: ${calcRem(24)} ${calcRem(16)};
  background-color: ${({ diskColor }) => diskTheme[diskColor].bg};
  border: 1px solid;
  border-color: ${({ diskColor }) => diskTheme[diskColor].border};
  border-radius: ${calcRem(12)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    width: 100%;
  }
`;

const StDiskName = styled.h3<{ diskColor: DiskColorType }>`
  color: ${({ diskColor }) =>
    diskColor === "PURPLE"
      ? lightTheme.colors.white
      : lightTheme.colors.text01};
  text-align: center;
  line-height: ${fontTheme.display01.lineHeight};
  letter-spacing: ${fontTheme.display01.letterSpacing};
  font-size: ${fontTheme.display01.fontSize};
  font-weight: ${fontTheme.display01.fontWeight};
`;

const StPreviewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${lightTheme.colors.primary03};
  border-radius: ${calcRem(8)};
  overflow: hidden;
`;

const StMainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(16)};
  padding-top: ${calcRem(100)};

  span {
    color: ${({ theme }) => theme.colors.primary02};
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

const StImgList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(8)};
  width: 100%;
  height: auto;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    background-color: ${lightTheme.colors.primary03};
    border-radius: ${calcRem(8)};
    overflow: hidden;
  }
`;

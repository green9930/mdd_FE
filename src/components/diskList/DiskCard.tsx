import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";

import DiskPreviewList from "./DiskPreviewList";
import IconConverter from "./IconConverter";
import { deleteToastState } from "../../state/atom";
import {
  DISK_BTN_LIST,
  DiskBtnType,
  DiskColorType,
  DiskModeType,
} from "../../types/diskTypes";
import { diskTheme, lightTheme } from "../../styles/colors";
import { calcRem, fontTheme } from "../../styles/theme";

import { ReactComponent as Like } from "../../assets/svg/like.svg";
import { ReactComponent as Gallery } from "../../assets/svg/gallery.svg";
import { ReactComponent as Text } from "../../assets/svg/text.svg";

interface DiskCardProps {
  data: any;
  setOpen?: () => void;
}

const DiskCard = ({ data, setOpen }: DiskCardProps) => {
  const {
    diskId,
    diskName,
    content,
    diskColor,
    isPrivate,
    image,
    isMine,
    createdAt,
  } = data;
  const [mainImg, setMainImg] = useState<string>("");
  const [mode, setMode] = useState<DiskModeType>("gallery");
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    setMainImg(image[0].imgUrl);
  }, []);

  const setOpenDeleteToast = useSetRecoilState(deleteToastState);

  const handleMainImg = (target: number) => setMainImg(image[target].imgUrl);

  const clickHandler = (name: DiskBtnType) => {
    switch (name) {
      case "like":
        console.log(name);
        return;
      case "edit":
        console.log(name);
        return;
      case "delete":
        if (window.confirm("디스크를 삭제하실 건가요?")) {
          console.log("DELETE DISK");
          setOpen && setOpen();
          setOpenDeleteToast(true);
        }
        return;
      case "bookmark":
        console.log(name);
        setIsBookmark(!isBookmark);
        return;
      case "mode":
        console.log(name);
        setMode("text");
        return;
      default:
        return;
    }
  };
  return (
    <Stcontainer diskColor={diskColor as DiskColorType}>
      <StDiskName>{diskName}</StDiskName>
      <StPreviewContainer>
        <StMainImg src={mainImg} alt="main-preview" />
      </StPreviewContainer>
      <StImgList>{DiskPreviewList(image, handleMainImg)}</StImgList>
      <StSubContainer>
        {isMine ? (
          <StLikesCount isMine={true} diskColor={diskColor as DiskColorType}>
            <Like fill={lightTheme.colors.text01} />
            <span>1234</span>
          </StLikesCount>
        ) : (
          <StLikesCount
            onClick={() => clickHandler("like")}
            isMine={false}
            diskColor={diskColor as DiskColorType}
          >
            <Like fill={lightTheme.colors.text01} />
            <span>1234</span>
          </StLikesCount>
        )}
        {isMine ? (
          <StBtnList>
            {DISK_BTN_LIST.map((val, idx) => {
              return (
                <li
                  key={`${val}-${idx}`}
                  onClick={() => clickHandler(val as DiskBtnType)}
                >
                  <StIconContainer
                    diskColor={diskColor as DiskColorType}
                    isTextMode={false}
                  >
                    {IconConverter(
                      val as DiskBtnType,
                      isBookmark,
                      diskColor === "NEON_ORANGE"
                    )}
                  </StIconContainer>
                </li>
              );
            })}
          </StBtnList>
        ) : (
          <StIconContainer
            diskColor={diskColor as DiskColorType}
            isTextMode={false}
            onClick={() => clickHandler("mode")}
          >
            <Text
              fill={
                diskColor === "NEON_ORANGE"
                  ? lightTheme.colors.text01
                  : lightTheme.colors.white
              }
            />
          </StIconContainer>
        )}
      </StSubContainer>
      {mode === "text" ? (
        <StContentContainer>
          <Stcontent>
            <p>{content}</p>
            <span>첫 생성일: {createdAt}</span>
          </Stcontent>
          <StIconContainer
            diskColor={diskColor as DiskColorType}
            onClick={() => setMode("gallery")}
            isTextMode={true}
          >
            <Gallery
              fill={
                diskColor === "NEON_ORANGE"
                  ? lightTheme.colors.text01
                  : lightTheme.colors.white
              }
            />
          </StIconContainer>
        </StContentContainer>
      ) : (
        <></>
      )}
    </Stcontainer>
  );
};

export default DiskCard;

const Stcontainer = styled.div<{ diskColor: DiskColorType }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(16)};
  width: 100%;
  height: auto;
  padding: ${calcRem(24)} ${calcRem(16)};
  background-color: ${({ diskColor }) => diskTheme[`${diskColor}`].bg};
  border: 1px solid;
  border-color: ${({ diskColor }) => diskTheme[`${diskColor}`].border};
  border-radius: ${calcRem(12)};
  position: relative;
`;

const StDiskName = styled.h3`
  color: ${({ theme }) => theme.colors.text01};
  text-align: center;
  line-height: ${fontTheme.display01.lineHeight};
  letter-spacing: ${fontTheme.display01.letterSpacing};
  font-size: ${fontTheme.display01.fontSize};
  font-weight: ${fontTheme.display01.fontWeight};
  font-family: "NanumSquareNeo";
`;

const StPreviewContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.primary03};
  border-radius: ${calcRem(8)};
  overflow: hidden;
`;

const StMainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StImgList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* justify-content: space-between; */
  gap: ${calcRem(8)};
  width: 100%;
  height: auto;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
    background-color: transparent;
    border-radius: ${calcRem(8)};
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const StSubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StLikesCount = styled.div<{ isMine: boolean; diskColor: DiskColorType }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ isMine }) => (isMine ? calcRem(4) : calcRem(8))};

  ${({ isMine, diskColor }) =>
    !isMine &&
    css`
      padding: ${calcRem(8)} ${calcRem(16)};
      background-color: ${diskTheme[diskColor].border}};
      border-radius: ${calcRem(12)};
    `};

  svg {
    width: ${({ isMine }) => (isMine ? calcRem(16) : calcRem(24))};
    height: ${({ isMine }) => (isMine ? calcRem(16) : calcRem(24))};
  }

  span {
    color: ${({ theme }) => theme.colors.text01};
    ${({ isMine }) =>
      isMine
        ? css`
            line-height: ${fontTheme.body01.lineHeight};
            letter-spacing: ${fontTheme.body01.letterSpacing};
            font-size: ${fontTheme.body01.fontSize};
            font-weight: ${fontTheme.body01.fontWeight};
          `
        : css`
            line-height: ${fontTheme.button.lineHeight};
            letter-spacing: ${fontTheme.button.letterSpacing};
            font-size: ${fontTheme.button.fontSize};
            font-weight: ${fontTheme.button.fontWeight};
          `}
  }
`;

const StBtnList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${calcRem(12)};
`;

const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: ${calcRem(24)} ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.transparent01};
  border-radius: ${calcRem(12)};
  position: absolute;
  top: 0;
  left: 0;
`;

const Stcontent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(8)};
  width: 100%;

  p,
  span {
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
    font-family: "NanumSquareNeo";
  }

  p {
    height: 80%;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    word-break: keep-all;
    overflow: scroll;
  }

  span {
    color: ${({ theme }) => theme.colors.text02};
  }
`;

const StIconContainer = styled.div<{
  diskColor: DiskColorType;
  isTextMode: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${calcRem(40)};
  height: ${calcRem(40)};
  background-color: ${({ diskColor }) => diskTheme[diskColor].border};
  border-radius: ${calcRem(12)};
  cursor: pointer;
  ${({ isTextMode }) =>
    isTextMode &&
    css`
      position: absolute;
      right: ${calcRem(16)};
      bottom: ${calcRem(24)};
    `}

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
  }
`;

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { diskTheme, lightTheme } from "../../styles/colors";
import {
  DISK_BTN_LIST,
  DiskBtnType,
  DiskColorType,
  DiskModeType,
} from "../../types/diskTypes";
import { calcRem, fontTheme } from "../../styles/theme";

import DiskPreviewList from "./DiskPreviewList";
import IconConverter from "./IconConverter";

import Sample01 from "../../assets/sample_01.jpeg";
import { ReactComponent as Like } from "../../assets/svg/like.svg";
import { ReactComponent as Gallery } from "../../assets/svg/gallery.svg";

interface DiskCardProps {
  data: any;
}

const DiskCard = ({ data }: DiskCardProps) => {
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

  const handleMainImg = (target: number) => {
    console.log("CLICK");
    // setMainImg(previewList[target]);
  };

  // console.log(image);s
  const imageList = image.map((val: any) => val.imageUrl);

  const clickHandler = (name: DiskBtnType, mode: DiskModeType) => {
    switch (name) {
      case "like":
        console.log(name);
        return;
      case "edit":
        console.log(name);
        return;
      case "delete":
        console.log(name);
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

  console.log(mode);

  return (
    <Stcontainer diskColor={diskColor as DiskColorType}>
      <StDiskName>{diskName}</StDiskName>
      <StPreviewContainer>
        <StMainImg src={Sample01} alt="main-preview" />
      </StPreviewContainer>
      <StImgList>{DiskPreviewList(imageList, handleMainImg)}</StImgList>
      <StSubContainer>
        <StLikesCount>
          <Like fill={lightTheme.colors.text01} />
          <span>0</span>
        </StLikesCount>
        <StBtnList>
          {DISK_BTN_LIST.map((val, idx) => {
            return (
              <li
                key={`${val}-${idx}`}
                onClick={() => clickHandler(val as DiskBtnType, mode)}
              >
                <StIconContainer isTextMode={false}>
                  {IconConverter(val as DiskBtnType, isBookmark)}
                </StIconContainer>
              </li>
            );
          })}
        </StBtnList>
      </StSubContainer>
      {mode === "text" ? (
        <StContentContainer>
          <Stcontent>
            {/* <p>
              지금 노래 뭐들으세요? 뉴진스의 하입보이요 하아아아아입 지금 노래
              뭐들으세요? 뉴진스의 하입보이요 하아아아아입 지금 노래 뭐들으세요?
              뉴진스의 하입보이요 하아아아아입 지금 노래 뭐들으세요? 뉴진스의
              하입보이요 하아아아아입 지금 노래 뭐들으세요? 뉴진스의 하입보이요
              하아아아아입 지금 노래 뭐들으세요? 뉴진스의 하입보이요
              하아아아아입 지금 노래 뭐들으세요? 뉴진스의 하입보이요
              하아아아아입
              <br /> 지금 노래 뭐들으세요? 뉴진스의 하입보이요 하아아아아입 지금
              노래 뭐들으세요? 뉴진스의 하입보이요 하아아아아입 하아아아아입
              하아아아아입 하아아아아입 하아아아아입아아입
            </p> */}
            <p>{content}</p>
            <span>첫 생성일: {createdAt}</span>
          </Stcontent>
          <StIconContainer onClick={() => setMode("gallery")} isTextMode={true}>
            <Gallery fill={lightTheme.colors.white} />
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
    background-color: ${({ theme }) => theme.colors.primary03};
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

const StLikesCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${calcRem(4)};

  svg {
    width: ${calcRem(16)};
    height: ${calcRem(16)};
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
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(8)};
  width: 100%;
  /* height: 60%; */
  /* overflow: scroll; */

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

const StIconContainer = styled.div<{ isTextMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${calcRem(40)};
  height: ${calcRem(40)};
  background-color: ${({ theme }) => theme.colors.blue};
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

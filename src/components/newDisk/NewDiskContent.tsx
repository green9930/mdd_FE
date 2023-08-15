import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import PreviewList from "./PreviewList";
import Textarea from "../elements/Textarea";
import Button from "../elements/Button";
import { postDisk } from "../../api/diskApi";
import { newDiskState } from "../../state/atom";
import {
  DISK_CONTENT_MAX_LENGTH,
  DISK_IMG_MAX_LENGTH,
} from "../../utils/validations";
import { DiskColorType, newDiskProps } from "../../types/diskTypes";
import { InputStatusType } from "../../types/etcTypes";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../../styles/theme";
import { diskTheme } from "../../styles/colors";

import { ReactComponent as EmptyRegisterDisk } from "../../assets/svg/empty_register_disk.svg";

const NewDiskContent = ({ step, setStep, titleText }: newDiskProps) => {
  const [newDisk, setNewDisk] = useRecoilState(newDiskState);
  const [files, setFiles] = useState<any[]>([]);
  const [previewList, setPreviewList] = useState<any[]>([]);
  const [mainImg, setMainImg] = useState<string>("");
  const [content, setContent] = useState("");
  const [contentStatus, setContentStatus] =
    useState<InputStatusType>("default");

  const navigate = useNavigate();

  useEffect(() => {
    handleMainImg(0);
  }, [previewList]);

  const handleAddImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgList = e.target.files;

    if (imgList && imgList.length) {
      if (imgList.length + previewList.length > DISK_IMG_MAX_LENGTH) {
        window.alert("사진은 최대 4개까지 등록할 수 있습니다.");
      } else {
        [...(imgList as any)].map(async (file) => {
          try {
            setFiles([...files, imgList]);
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

  const handleDeleteImg = (target: number) => {
    setFiles(files.filter((_, idx) => idx !== target));
    setPreviewList(previewList.filter((_, idx) => idx !== target));
  };

  const handleMainImg = (target: number) => setMainImg(previewList[target]);

  const { mutate: addDisk, isLoading } = useMutation(postDisk, {
    onSuccess: (data) => {
      console.log(data);
      // navigate("/");
    },
    onError: (err: any) => {
      alert("ERROR");
      // alert(err.response.data.errorMessage);
    },
  });

  const handleSubmit = async () => {
    const frm = new FormData();
    console.log(files);
    files.map((file) => frm.append("file", file[0]));
    frm.append(
      "data",
      new Blob([JSON.stringify(newDisk)], {
        type: "application/json",
      })
    );
    console.log(newDisk);
    console.log("SUBMIT DISK");

    addDisk(frm);
    // try {
    //   // POST DISK
    //   navigate("/disk-list");
    // } catch (err) {
    //   console.log("POST DISK ERROR >> ", err);
    // }
  };

  return (
    <StContainer>
      <h2>{titleText}</h2>
      <StGallery diskColor={newDisk.diskColor}>
        <StDiskName>{newDisk.diskName}</StDiskName>
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
          {PreviewList(
            previewList,
            handleAddImg,
            handleDeleteImg,
            handleMainImg
          )}
        </StImgList>
      </StGallery>
      <Textarea
        labelText="디스크 메모"
        value={content}
        setValue={setContent}
        status={contentStatus}
        setStatus={setContentStatus}
        maxLength={DISK_CONTENT_MAX_LENGTH}
        placeholder="어떤 디깅 메모리를 담은 디스크인가요?"
        jc="flex-start"
        TopChildren={<StOptionText>선택사항</StOptionText>}
      />
      <StBtnContainer>
        <Button
          btnStatus={files.length ? "primary01" : "disabled"}
          clickHandler={() => handleSubmit()}
          disabled={!files.length}
        >
          <span>디스크 굽기</span>
        </Button>
        <StSkipBtn>
          {step === "newDiskSignUp2" ? (
            <Button btnStatus="transparent" clickHandler={() => navigate("/")}>
              <span>나중에 만들기</span>
            </Button>
          ) : (
            <></>
          )}
        </StSkipBtn>
      </StBtnContainer>
    </StContainer>
  );
};

export default NewDiskContent;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.bg};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 ${calcRem(16)};
  }

  h2 {
    padding: ${calcRem(24)} ${calcRem(16)};
    white-space: pre-wrap;
    color: ${({ theme }) => theme.colors.text01};
    text-align: center;
    line-height: ${fontTheme.display02.lineHeight};
    letter-spacing: ${fontTheme.display02.letterSpacing};
    font-family: "NanumSquareNeo";
    font-size: ${fontTheme.display02.fontSize};
    font-weight: ${fontTheme.display02.fontWeight};
  }
`;

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

const StDiskName = styled.h3`
  color: ${({ theme }) => theme.colors.text01};
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
  background-color: ${({ theme }) => theme.colors.primary03};
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
    background-color: ${({ theme }) => theme.colors.primary03};
    border-radius: ${calcRem(8)};
    overflow: hidden;
  }
`;

const StOptionText = styled.span`
  color: ${({ theme }) => theme.colors.text02};
  line-height: ${fontTheme.body02.lineHeight};
  letter-spacing: ${fontTheme.body02.letterSpacing};
  font-size: ${fontTheme.body02.fontSize};
  font-weight: ${fontTheme.body02.fontWeight};
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(32)};
  width: 100%;
  padding: ${calcRem(0)} ${calcRem(32)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0;
  }
`;

const StSkipBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import DiskCarousel from "../newDisk/DiskCarousel";
import Input from "../elements/Input";
import {
  DISK_CONTENT_MAX_LENGTH,
  DISK_NAME_MAX_LENGTH,
} from "../../utils/validations";
import {
  RANDOM_DISK_NAME_LIST,
  getRandomName,
} from "../../utils/getRandomName";
import { DISK_COLOR_LIST, DiskType } from "../../types/diskTypes";
import { InputStatusType } from "../../types/etcTypes";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../../styles/theme";

import { ReactComponent as Dice } from "../../assets/svg/dice.svg";
import NewDiskCard from "../newDisk/NewDiskCard";
import Textarea from "../elements/Textarea";
import Button from "../elements/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchDisk } from "../../api/diskApi";
import { useNavigate } from "react-router-dom";
import { getLoc } from "../../utils/localStorage";

interface EditDiskProps {
  data: DiskType;
}

export type PatchType = {
  data: any;
  diskId: number;
};

const EditDisk = ({ data }: EditDiskProps) => {
  const [diskNum, setDiskNum] = useState<number>(0);
  const [diskName, setDiskName] = useState<string>(RANDOM_DISK_NAME_LIST[0]);
  const [diskNameStatus, setDiskNameStatus] =
    useState<InputStatusType>("default");
  const [files, setFiles] = useState<File[]>([]);
  const [deleteImgList, setDeleteImgList] = useState<number[]>([]);
  const [previewList, setPreviewList] = useState<any[]>([]);
  const [mainImg, setMainImg] = useState<string>("");
  const [content, setContent] = useState("");
  const [contentStatus, setContentStatus] =
    useState<InputStatusType>("default");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    //   {
    //     "diskName" : "diskName3",
    //     "diskColor" : "NEON_ORANGE",
    //     "isBookmark" : true,
    //     "deleteImgList" : [1, 3]
    // }
    setDiskName(data.diskName);
    setDiskNum(DISK_COLOR_LIST.indexOf(data.diskColor));
    setContent(data.content);
    setMainImg(data.image[0].imgUrl);
    setPreviewList(data.image.map((val) => val.imgUrl));
  }, []);

  const { mutate: editDisk, isLoading } = useMutation(patchDisk, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["diskList"]);
      queryClient.invalidateQueries(["diskById"]);
      navigate(`/disk-list/${getLoc("memberId")}`);
    },
    onError: (err) => {
      alert("디스크 편집에 실패했습니다.");
      console.log(err);
    },
  });

  const handleSubmit = async () => {
    console.log(files);
    console.log(diskName, content, DISK_COLOR_LIST[diskNum], deleteImgList);
    const frm = new FormData();
    const newData = {
      diskName,
      content,
      diskColor: DISK_COLOR_LIST[diskNum],
      isPrivate: false,
      deleteImgList: [],
      isBookmark: false,
      // isBookmark: data.isBookmark,
    };
    files.map((file) => frm.append("file", file));
    frm.append(
      "data",
      new Blob([JSON.stringify(newData)], {
        type: "application/json",
      })
    );
    // editDisk(frm);
    editDisk({ diskId: data.diskId, frm: frm });
  };

  return (
    <StContainer>
      <StDiskCover>
        <StDiskCarousel>
          <DiskCarousel disk={data} setDiskNum={setDiskNum} />
        </StDiskCarousel>
        <StInputContainer>
          <Input
            labelText="디스크 이름"
            bottomText="직접 수정할 수 있어요"
            value={diskName}
            setValue={setDiskName}
            status={diskNameStatus}
            setStatus={setDiskNameStatus}
            placeholder=""
            maxLength={DISK_NAME_MAX_LENGTH}
            TopChildren={
              <StRandomBtn onClick={() => setDiskName(getRandomName())}>
                <span>랜덤추천</span>
                <Dice />
              </StRandomBtn>
            }
          ></Input>
        </StInputContainer>
      </StDiskCover>
      <StDiskContent>
        <NewDiskCard
          isNew={false}
          disk={data}
          previewList={previewList}
          mainImg={mainImg}
          files={files}
          setFiles={setFiles}
          setPreviewList={setPreviewList}
          setMainImg={setMainImg}
          setDeleteImgList={setDeleteImgList}
        />
        <StContent>
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
            isMultiLine={true}
          />
        </StContent>
      </StDiskContent>
      <StBtnContainer>
        <Button
          btnStatus={files.length ? "primary01" : "disabled"}
          clickHandler={() => handleSubmit()}
          disabled={false}
          // disabled={!files.length}
        >
          <span>디스크 굽기</span>
        </Button>
      </StBtnContainer>
    </StContainer>
  );
};

export default EditDisk;

const StContainer = styled.div`
  padding-top: ${calcRem(50)};
`;

const StDiskCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(24)};
  padding: ${calcRem(24)} ${calcRem(32)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary03};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(24)} ${calcRem(16)};
  }
`;

const StDiskCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StInputContainer = styled.div`
  width: 100%;
`;

const StRandomBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${calcRem(4)};
`;

const StDiskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(24)};
  width: 100%;
  padding: ${calcRem(24)} ${calcRem(32)};
  background-color: ${({ theme }) => theme.colors.bg};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(24)} ${calcRem(16)};
  }
`;

const StContent = styled.div`
  width: 100%;
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
  padding: ${calcRem(12)} ${calcRem(32)} ${calcRem(36)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(12)} ${calcRem(16)} ${calcRem(36)};
  }
`;

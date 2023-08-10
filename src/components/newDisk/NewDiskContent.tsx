import React, {
  ChangeEvent,
  RefObject,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { DiskColorType, newDiskProps } from "../../types/diskTypes";
import styled from "styled-components";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../../styles/theme";
import { diskTheme } from "../../styles/colors";
import { useRecoilState } from "recoil";
import { newDiskState } from "../../state/atom";
import { ReactComponent as GalleryAdd } from "../../assets/svg/gallery_add.svg";
import { ReactComponent as EmptyRegisterDisk } from "../../assets/svg/empty_register_disk.svg";
import { ReactComponent as CloseCircle } from "../../assets/svg/close_circle.svg";
import Input from "../elements/Input";
import { InputStatusType } from "../../types/etcTypes";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";

const DISK_IMG_MAX_LENGTH = 4;
const DISK_CONTENT_MAX_LENGTH = 300;

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

const NewDiskContent = ({ step, setStep, titleText }: newDiskProps) => {
  const [newDisk, setNewDisk] = useRecoilState(newDiskState);
  const [files, setFiles] = useState<any[]>([]);
  const [previewList, setPreviewList] = useState<any[]>([]);
  const [mainImg, setMainImg] = useState<string>("");
  const [contentStatus, setContentStatus] =
    useState<InputStatusType>("default");

  const navigate = useNavigate();
  console.log(newDisk);
  console.log(files);

  const contentRef = useRef<HTMLTextAreaElement>(null);

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

  const handleMainImg = (target: number) => {
    setMainImg(previewList[target]);
  };

  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.substring(0, DISK_CONTENT_MAX_LENGTH);
    setNewDisk((prev) => ({ ...prev, content: text }));
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height =
        contentRef.current.scrollHeight > 284
          ? "284px"
          : `${contentRef.current.scrollHeight}px`;
    }
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
      <StContentContainer>
        <StContentHeader>
          <label>디스크 메모</label>
          <span>선택사항</span>
        </StContentHeader>
        <StTextareaContainer contentStatus={contentStatus}>
          <textarea
            ref={contentRef}
            placeholder="어떤 디깅 메모리를 담은 디스크인가요?"
            value={newDisk.content}
            onChange={(e) => handleContent(e)}
            onFocus={() => setContentStatus("focused")}
            onBlur={() => setContentStatus("default")}
            maxLength={DISK_CONTENT_MAX_LENGTH}
            rows={1}
          />
          {newDisk.content.length ? (
            <StTextLength>
              {newDisk.content.length}/{DISK_CONTENT_MAX_LENGTH}
            </StTextLength>
          ) : (
            <></>
          )}
        </StTextareaContainer>
      </StContentContainer>
      <StBtnContainer>
        <Button
          btnStatus={files.length ? "primary01" : "disabled"}
          clickHandler={() => {}}
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

const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calcRem(4)};
  width: 100%;
  padding: ${calcRem(24)} ${calcRem(32)} ${calcRem(60)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(24)} ${calcRem(0)} ${calcRem(24)};
  }
`;

const StContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${calcRem(4)};

  label {
    color: ${({ theme }) => theme.colors.text01};
    line-height: ${fontTheme.subtitle02.lineHeight};
    letter-spacing: ${fontTheme.subtitle02.letterSpacing};
    font-size: ${fontTheme.subtitle02.fontSize};
    font-weight: ${fontTheme.subtitle02.fontWeight};
  }

  span {
    color: ${({ theme }) => theme.colors.text02};
    line-height: ${fontTheme.body02.lineHeight};
    letter-spacing: ${fontTheme.body02.letterSpacing};
    font-size: ${fontTheme.body02.fontSize};
    font-weight: ${fontTheme.body02.fontWeight};
  }
`;

const StTextareaContainer = styled.div<{ contentStatus: InputStatusType }>`
  display: flex;
  align-items: center;
  gap: ${calcRem(12)};
  width: 100%;
  padding: ${calcRem(12)} ${calcRem(12)} ${calcRem(12)} ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid;
  border-color: ${({ theme, contentStatus }) => {
    switch (contentStatus) {
      case "default":
        return theme.colors.primary03;
      case "warning":
        return theme.colors.error;
      case "focused":
        return theme.colors.primary01;
      default:
        return;
    }
  }};
  border-radius: ${calcRem(4)};

  textarea {
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.text02};
    }
  }
`;

const StTextLength = styled.div`
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

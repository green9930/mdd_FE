import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { lightThemeState } from "../state/atom";
import { GuideText, InputStatusType } from "../types/etcTypes";

import { WINDOW_W, calcRem, fontTheme } from "../styles/theme";
import { darkTheme, lightTheme } from "../styles/colors";

import DiskMask01 from "../assets/img/disk_mask_1.png";
import DiskMask02 from "../assets/img/disk_mask_2.png";
import CloseCircle from "../assets/svg/close_circle.svg";
import { ReactComponent as ArrowBox } from "../assets/svg/arrow_box.svg";

import Button from "./elements/Button";
import ModalLayout from "./layout/ModalLayout";

const GUIDE_TEXT: GuideText = {
  1: [
    "디깅이란 내가 좋아하는 것들의 정보를 수집하며 깊게 알아가는 즐거움을 느끼는 것을 뜻해요.",
    "당신은 지금 어떤 것에 몰입하고 있나요?",
    "디깅의 순간이 무의미하게 흘러가고 있진 않았나요?",
  ],
  2: [
    "나만의 디깅을 의미있게 기록해봐요.\n디깅디스크는 최대 4장까지 나의 디깅 순간을 밀도있게 기록할 수 있어요.",

    "나만의 디깅디스크, 함께 공유해볼까요?",
  ],
};

interface GuideProps extends React.HTMLAttributes<HTMLDivElement> {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Guide = ({ modalOpen, setModalOpen }: GuideProps) => {
  const [page, setPage] = useState<number>(1);
  const isLightTheme = useRecoilValue(lightThemeState);

  const [currentIcon, setCurrentIcon] = useState(DiskMask01);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setCurrentIcon((currentIcon) =>
          currentIcon === DiskMask01 ? DiskMask02 : DiskMask01
        );
      }, 200);

      return () => {
        clearInterval(intervalId);
      };
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {modalOpen ? (
        <ModalLayout
          width={`calc(${WINDOW_W}px - 24px)`}
          height="auto"
          bgc="transparent"
        >
          <StModalContainer>
            <StModal>
              <span>디깅디스크 사용법</span>
              <StDiskMask src={currentIcon} />
            </StModal>
            <StTextContainer>
              {GUIDE_TEXT[`${page}`].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </StTextContainer>
            <StArrowFlex>
              <ArrowBox
                onClick={() => {
                  if (page !== 1) {
                    setPage(1);
                  }
                }}
                width="40px"
                height="40px"
                fill={
                  page === 1
                    ? lightTheme.colors.primary02
                    : lightTheme.colors.primary01
                }
              />
              <ArrowBox
                onClick={() => {
                  if (page !== 2) {
                    setPage(2);
                  }
                }}
                style={{ transform: "rotate(180deg)" }}
                width="40px"
                height="40px"
                fill={
                  page === 2
                    ? lightTheme.colors.primary02
                    : lightTheme.colors.primary01
                }
              />
            </StArrowFlex>
          </StModalContainer>
          <Button
            btnStatus="primary02"
            clickHandler={() => {
              setModalOpen(false);
            }}
          >
            <StClose src={CloseCircle} />
            <span>닫기</span>
          </Button>
        </ModalLayout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Guide;

const StModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(16)};
  height: 100%;
  margin-bottom: ${calcRem(16)};
  padding: ${calcRem(24)};
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const StTextContainer = styled.div`
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: ${calcRem(16)};
  height: 100%;
  span {
    color: ${({ theme }) => theme.colors.primary01};
    font-family: "NanumSquareNeo";
    white-space: pre-line;
    text-align: center;
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

const StModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(16)};
  span {
    color: ${({ theme }) => theme.colors.text01};
    font-family: "NanumSquareNeo";
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

const StArrowFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${calcRem(16)};
  svg {
    cursor: pointer;
  }
`;

const StDiskMask = styled.img`
  width: 44px;
  height: auto;
`;

const StClose = styled.img`
  width: 24px;
  height: auto;
  margin-right: ${calcRem(8)};
`;

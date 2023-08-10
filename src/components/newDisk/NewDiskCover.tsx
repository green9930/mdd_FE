import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../../styles/theme";

import Disk from "../elements/Disk";
import { DISK_COLOR_LIST, newDiskProps } from "../../types/diskTypes";
import { lightTheme } from "../../styles/colors";
import Input from "../elements/Input";
import { InputStatusType } from "../../types/etcTypes";

import { ReactComponent as ShortArrowBox } from "../../assets/svg/short_arrow_box.svg";
import { ReactComponent as Dice } from "../../assets/svg/dice.svg";
import Button from "../elements/Button";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { newDiskState } from "../../state/atom";

const DISK_NAME_MAX_LENGTH = 30;
const RANDOM_DISK_NAME_LIST = [
  `상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡`,
  `내가 좋아한 음악 앨범 Top4 (๑′ᴗ‵๑)`,
  `이번달 네컷사진 Top4 ✌(‘ω’✌)`,
  `내가 가장 좋아했던 하늘 ☁️`,
  `우리집 고양이 자랑할래 |• - '•)و✧`,
  `이번 달 문화생활 (๓° ˘ °๓)`,
  `내 베스트 프랜드 Top4 (*˘◡˘*)`,
  `이번 주 베스트 소비 💸`,
  `또 먹고싶은 음식 Top4 🍽`,
];

const NewDiskCover = ({ step, setStep, titleText }: newDiskProps) => {
  const [diskNum, setDiskNum] = useState<number>(0);
  const [diskName, setDiskName] = useState<string>(RANDOM_DISK_NAME_LIST[0]);
  const [inputStatus, setInputStatus] = useState<InputStatusType>("default");

  const setNewDisk = useSetRecoilState(newDiskState);

  const navigate = useNavigate();

  useEffect(() => {
    const isSignUp = false;
    if (isSignUp) {
      setStep("newDiskSignUp1");
    }
  }, []);

  const handleRandomName = () => {
    const randomNum = Math.floor(Math.random() * RANDOM_DISK_NAME_LIST.length);
    setDiskName(RANDOM_DISK_NAME_LIST[randomNum]);
  };

  const handleNext = () => {
    setNewDisk((newDisk) => ({
      ...newDisk,
      diskName,
      diskColor: DISK_COLOR_LIST[diskNum],
    }));
    setStep((prev) =>
      prev === "newDiskSignUp1" ? "newDiskSignUp2" : "newDisk2"
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: (
      <StPrevBtn>
        <ShortArrowBox fill={lightTheme.colors.primary01} />
      </StPrevBtn>
    ),
    nextArrow: (
      <StNextBtn>
        <ShortArrowBox fill={lightTheme.colors.primary01} />
      </StNextBtn>
    ),
    initialSlide: 0,
  };

  return (
    <StContainer>
      <h2>{titleText}</h2>
      <StCarouselContainer>
        <StDiskCarousel>
          <Slider {...settings} afterChange={(cur) => setDiskNum(cur)}>
            {DISK_COLOR_LIST.map((val) => {
              return <Disk key={val} diskColor={val} />;
            })}
          </Slider>
        </StDiskCarousel>
      </StCarouselContainer>
      <StInputContainer>
        <Input
          labelText="디스크 이름"
          bottomText="직접 수정할 수 있어요"
          value={diskName}
          setValue={setDiskName}
          status={inputStatus}
          setStatus={setInputStatus}
          placeholder=""
          maxLength={DISK_NAME_MAX_LENGTH}
          TopChildren={
            <StRandomBtn onClick={handleRandomName}>
              <span>랜덤추천</span>
              <Dice />
            </StRandomBtn>
          }
        ></Input>
      </StInputContainer>
      <StBtnContainer>
        <Button
          btnStatus={diskName.length ? "primary01" : "disabled"}
          disabled={!diskName.length}
          clickHandler={() => handleNext()}
        >
          <span>{step === "newDiskSignUp1" ? "다음" : "디스크 생성하기"}</span>
        </Button>
        <StSkipBtn>
          {step === "newDiskSignUp1" ? (
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

export default NewDiskCover;

const StContainer = styled.div`
  min-height: calc(100vh - 50px);
  background-color: ${({ theme }) => theme.colors.bg};

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

const StCarouselContainer = styled.div`
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDiskCarousel = styled.div`
  width: 306px;
  padding: ${calcRem(42)} ${calcRem(42)} ${calcRem(56)};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${MOBILE_MAX_W}) {
    width: 100%;
  }

  img {
    width: 178px;
    height: auto;
  }

  .slick-slider {
    width: 178px;
  }

  .slick-slide {
  }

  .slick-arrow {
    width: ${calcRem(32)};
    height: ${calcRem(32)};
  }

  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: ${calcRem(32)};
      height: ${calcRem(32)};
    }
  }
`;

const StPrevBtn = styled.button`
  left: ${calcRem(-64)};
  transform: translateY(-50%);
`;

const StNextBtn = styled.button`
  right: ${calcRem(-64)};
  transform: translateY(-50%) rotate(180deg);
`;

const StInputContainer = styled.div`
  width: 100%;
  padding: 0 ${calcRem(32)} ${calcRem(60)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 ${calcRem(16)} ${calcRem(60)};
  }
`;

const StRandomBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${calcRem(4)};
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(32)};
  padding: 0 ${calcRem(32)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 ${calcRem(16)};
  }
`;

const StSkipBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

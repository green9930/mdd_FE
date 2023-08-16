import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import Disk from "../elements/Disk";
import { DISK_COLOR_LIST, NewDiskType } from "../../types/diskTypes";
import { MOBILE_MAX_W, calcRem } from "../../styles/theme";
import { lightTheme } from "../../styles/colors";

import { ReactComponent as ShortArrowBox } from "../../assets/svg/short_arrow_box.svg";

interface DiskCarouselProps {
  disk: NewDiskType;
  setDiskNum: React.Dispatch<React.SetStateAction<number>>;
}

const DiskCarousel = ({ disk, setDiskNum }: DiskCarouselProps) => {
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
    initialSlide: DISK_COLOR_LIST.indexOf(disk.diskColor),
    // initialSlide: 0,
  };

  return (
    <StDiskCarousel>
      <Slider {...settings} afterChange={(cur) => setDiskNum(cur)}>
        {DISK_COLOR_LIST.map((val) => {
          return <Disk key={val} diskColor={val} />;
        })}
      </Slider>
    </StDiskCarousel>
  );
};

export default DiskCarousel;

const StDiskCarousel = styled.div`
  width: 306px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
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

import React from "react";
import DiskCard from "./DiskCard";
import styled from "styled-components";
import { MOBILE_MAX_W, calcRem } from "../../styles/theme";
import Button from "../elements/Button";

import { ReactComponent as ArrowCircle } from "../../assets/svg/arrow_circle.svg";
import { lightTheme } from "../../styles/colors";

const TEST_DATA = [
  {
    diskId: 1,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜(˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 2,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 3,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 4,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 5,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 6,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 7,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 8,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 9,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
];

const DiskListFeed = () => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <StContainer>
      <StList>
        {TEST_DATA.map((val) => {
          const {
            diskId,
            diskName,
            content,
            diskColor,
            isPrivate,
            image,
            isMine,
            createdAt,
          } = val;

          return (
            <li key={`${diskId}-${diskName}`}>
              <DiskCard data={val} />
            </li>
          );
        })}
      </StList>
      <StBtnContainer>
        <Button btnStatus="primary02" clickHandler={scrollToTop}>
          <BtnText>
            <ArrowCircle fill={lightTheme.colors.white} />
            <span>위로 가기</span>
          </BtnText>
        </Button>
      </StBtnContainer>
    </StContainer>
  );
};

export default DiskListFeed;

const StContainer = styled.div``;

const StList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(24)};
  padding: ${calcRem(24)} ${calcRem(94)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(24)} ${calcRem(16)};
  }

  li {
    width: 100%;
    position: relative;
  }
`;

const StBtnContainer = styled.div`
  width: 100%;
  padding: 0 ${calcRem(32)} ${calcRem(36)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 ${calcRem(16)} ${calcRem(36)};
  }
`;

const BtnText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(8)};

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
  }
`;

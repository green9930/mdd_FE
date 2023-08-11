import React from "react";

import styled from "styled-components";
import Disk from "../elements/Disk";
import { DiskColorType } from "../../types/diskTypes";
import { calcRem, fontTheme } from "../../styles/theme";

import { ReactComponent as Bookmark } from "../../assets/svg/bookmark.svg";
import { ReactComponent as PlusFilled } from "../../assets/svg/plus_filled.svg";
import { lightTheme } from "../../styles/colors";
import { useNavigate } from "react-router-dom";

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

const DiskListGallery = () => {
  const navigate = useNavigate();

  const handleClick = (target: string) => navigate(target);

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
            <StItem
              key={`${diskName}-${diskId}`}
              onClick={() => handleClick(`/disk/${diskId}`)}
            >
              <StDiskContainer>
                <Disk diskColor={diskColor as DiskColorType} />
              </StDiskContainer>
              <span>{diskName}</span>
            </StItem>
          );
        })}
        <StNewDisk onClick={() => handleClick("/new-disk")}>
          <PlusFilled fill={lightTheme.colors.primary01} />
          <span>새로운 디스크 생성하기</span>
        </StNewDisk>
      </StList>
    </StContainer>
  );
};

export default DiskListGallery;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${calcRem(24)} ${calcRem(16)} ${calcRem(36)};
`;

const StList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${calcRem(100)}, 1fr));
  justify-items: center;
  gap: ${calcRem(16)};
  width: 100%;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${calcRem(8)};
    width: ${calcRem(100)};
    height: ${calcRem(132)};
    padding: ${calcRem(8)} ${calcRem(4)};
    border-radius: ${calcRem(8)};

    span {
      text-align: center;
      line-height: ${fontTheme.caption.lineHeight};
      letter-spacing: ${fontTheme.caption.letterSpacing};
      font-size: ${fontTheme.caption.fontSize};
      font-weight: ${fontTheme.caption.fontWeight};
    }
  }
`;

const StItem = styled.li`
  span {
    color: ${({ theme }) => theme.colors.text01};
  }
`;

const StDiskContainer = styled.div`
  padding: 0px ${calcRem(16)};
`;

const StNewDisk = styled.li`
  background-color: ${({ theme }) => theme.colors.primary03};

  span {
    color: ${({ theme }) => theme.colors.text03};
    word-break: keep-all;
  }
`;

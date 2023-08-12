import React, { useState } from "react";

import styled from "styled-components";
import Disk from "../elements/Disk";
import { DiskColorType } from "../../types/diskTypes";
import { MOBILE_MAX_W, WINDOW_W, calcRem, fontTheme } from "../../styles/theme";

import { ReactComponent as Bookmark } from "../../assets/svg/bookmark.svg";
import { ReactComponent as PlusFilled } from "../../assets/svg/plus_filled.svg";
import { ReactComponent as CloseCircle } from "../../assets/svg/close_circle.svg";
import { ReactComponent as Pen } from "../../assets/svg/pen.svg";
import { lightTheme } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import ModalLayout from "../layout/ModalLayout";
import DiskCard from "./DiskCard";
import Button from "../elements/Button";

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
    isMine: false,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
  {
    diskId: 2,
    diskName: "움치치상반기 최애 아이돌 Top4 ⸜( ˙ ˘ ˙)⸝♡",
    content: "content",
    diskColor: "YELLOW",
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
    diskColor: "NEONORANGE",
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
    diskColor: "PURPLE",
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
    diskColor: "SKYBLUE",
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
    diskColor: "NEONORANGE",
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
    isMine: false,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
];

const DiskListGallery = () => {
  const [openModal, setOpenModal] = useState(false);
  const [targetDisk, setTargetDisk] = useState(0);

  const navigate = useNavigate();

  const handleClick = (target: string) => navigate(target);

  return (
    <StContainer>
      <StList>
        {TEST_DATA.map((val, idx) => {
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
              onClick={() => {
                setOpenModal(true);
                setTargetDisk(idx);
              }}
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
      {openModal ? (
        <ModalLayout
          width={WINDOW_W < MOBILE_MAX_W ? "358px" : "412px"}
          height="auto"
          bgc="transparent"
        >
          <DiskCard data={TEST_DATA[targetDisk]} />
          <StBtnContainer>
            <Button
              btnStatus="primary02"
              clickHandler={() => setOpenModal(false)}
            >
              <StBtnText>
                <CloseCircle />
                <span>닫기</span>
              </StBtnText>
            </Button>
            {TEST_DATA[targetDisk].isMine ? (
              <Button
                btnStatus="primary01"
                clickHandler={() => {
                  console.log("GO TO EDIT PAGE");
                }}
              >
                <StBtnText>
                  <Pen fill={lightTheme.colors.white} />
                  <span>편집하기</span>
                </StBtnText>
              </Button>
            ) : (
              <></>
            )}
          </StBtnContainer>
        </ModalLayout>
      ) : (
        <></>
      )}
    </StContainer>
  );
};

export default DiskListGallery;

const StContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${calcRem(74)} ${calcRem(16)} ${calcRem(36)} ${calcRem(16)};
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
  cursor: pointer;
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

const StBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(8)};
  margin-top: ${calcRem(16)};
`;

const StBtnText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(8)};

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
  }
`;

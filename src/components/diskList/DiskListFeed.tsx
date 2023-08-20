import React from "react";
import styled from "styled-components";

import DiskCard from "./DiskCard";
import Button from "../elements/Button";
import { MOBILE_MAX_W, calcRem } from "../../styles/theme";
import { lightTheme } from "../../styles/colors";

import { ReactComponent as ArrowCircle } from "../../assets/svg/arrow_circle.svg";
import { DiskListProps } from "../../pages/DiskListPage";

const DiskListFeed = ({ isMine, data }: DiskListProps) => {
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <StContainer>
      <StList>
        {data.map((val) => {
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
      {data.length > 2 ? (
        <StBtnContainer>
          <Button btnStatus="primary02" clickHandler={scrollToTop}>
            <BtnText>
              <ArrowCircle fill={lightTheme.colors.white} />
              <span>위로 가기</span>
            </BtnText>
          </Button>
        </StBtnContainer>
      ) : (
        <></>
      )}
    </StContainer>
  );
};

export default DiskListFeed;

const StContainer = styled.div`
  padding-top: ${calcRem(50)};
`;

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

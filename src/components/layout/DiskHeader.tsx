import React from "react";
import { HeaderProps } from "./Header";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import { lightTheme } from "../../styles/colors";
import { MOBILE_MAX_W, calcRem } from "../../styles/theme";
import { fontTheme } from "../../styles/theme";
import { DiskHeaderPageType } from "../../types/etcTypes";

interface DiskHeaderProps extends HeaderProps {
  pageType: DiskHeaderPageType;
}

const DiskHeader = ({
  isMyDisk,
  userName,
  pageType,
  jc = "space-between",
  children,
}: DiskHeaderProps) => {
  return (
    <StHeader jc={jc}>
      <StTitle>
        <button>
          <Arrow fill={lightTheme.colors.primary01} />
        </button>
        {children}
      </StTitle>
      <StBtnContainer></StBtnContainer>
    </StHeader>
  );
};

export default DiskHeader;

const StHeader = styled.div<{ jc: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ jc }) => jc};
  width: 100%;
  height: 50px;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.colors.bg};
  position: relative;

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 16px;
  }

  h1 {
    font-family: "NanumSquareNeo";
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
    transform: rotate(-90deg);
  }
`;

const StBtnContainer = styled.div``;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Loading1 from "../assets/img/loading_1.png";
import Loading2 from "../assets/img/loading_2.png";
import Loading3 from "../assets/img/loading_3.png";

import { fontTheme } from "../styles/theme";

interface LoadingSpinnerProps {
  text: "디스크 불러오는 중" | "디스크 굽는 중";
}

const LoadingSpinner = ({ text }: LoadingSpinnerProps) => {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((iconIndex + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, [iconIndex]);

  return (
    <StSpinnerWrapper>
      <StSpinnerBackground>
        <StSpinnerIcon
          src={
            iconIndex === 0 ? Loading1 : iconIndex === 1 ? Loading2 : Loading3
          }
        />
        <span>{text}</span>
      </StSpinnerBackground>
    </StSpinnerWrapper>
  );
};

export default LoadingSpinner;

const StSpinnerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  span {
    font-family: "NanumSquareNeo";
    color: ${({ theme }) => theme.colors.white};
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

const StSpinnerBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--transparent-02, rgba(15, 11, 33, 0.5));
`;

const StSpinnerIcon = styled.img`
  width: 120px;
  height: 96px;
`;

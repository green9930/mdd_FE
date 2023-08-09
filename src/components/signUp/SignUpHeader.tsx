import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { fontTheme } from "../../styles/theme";
import { calcRem } from "../../styles/theme";

import { StepType } from "../../types/etcTypes";

import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import { lightTheme } from "../../styles/colors";

export interface SignUpHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  step?: number;
  percent?: number;
  setStep?: Dispatch<SetStateAction<number>>;
  setPercent?: Dispatch<SetStateAction<number>>;
}

const STEP_TEXT: StepType = {
  1: "로그인에 사용할 아이디를 알려주세요.",
  2: "로그인에 사용할 비밀번호를 알려주세요.",
  3: "비밀번호를 한 번 더 입력해주세요.",
};

const SignUpHeader = ({
  children,
  step = 1,
  setStep,
  percent = 0,
  setPercent,
}: SignUpHeaderProps) => {
  return (
    <StContainer>
      {step !== 1 && (
        <StBack>
          <Arrow
            style={{ transform: "rotate(-90deg)" }}
            width="24px"
            height="24px"
            fill={lightTheme.colors.primary01}
          />
        </StBack>
      )}

      <StCreateText>{percent}% 디스크 생성 중...</StCreateText>
      <StProgressBar percent={percent}>
        <div></div>
      </StProgressBar>
      <StText>{STEP_TEXT[`${step}`]}</StText>
      {children}
    </StContainer>
  );
};

export default SignUpHeader;

const StContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary03};
  padding: ${calcRem(30)} ${calcRem(16)} ${calcRem(16)} ${calcRem(16)};
  display: flex;
  flex-direction: column;
`;

const StCreateText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  padding-bottom: ${calcRem(8)};
  text-align: end;
  color: ${({ theme }) => theme.colors.primary02};
`;

const StText = styled.span`
  letter-spacing: ${fontTheme.display02.letterSpacing};
  line-height: ${fontTheme.display02.lineHeight};
  font-size: ${fontTheme.display02.fontSize};
  font-weight: ${fontTheme.display02.fontWeight};
  color: ${({ theme }) => theme.colors.text01};
  padding-top: ${calcRem(24)};
`;

const StProgressBar = styled.div<SignUpHeaderProps>`
  border-radius: 8px;
  width: 100%;
  height: 8px;
  background-color: rgba(108, 99, 255, 0.3);
  div {
    border-radius: 8px;
    width: ${({ percent }) => `${percent}%`};
    height: 8px;
    background-color: ${({ theme }) => theme.colors.primary01};
  }
`;

const StBack = styled.div`
  position: absolute;
  top: 6px;
`;

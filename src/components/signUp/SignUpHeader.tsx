import React, { Dispatch, SetStateAction, useState } from "react";
import styled, { keyframes } from "styled-components";

import { MOBILE_MAX_W, fontTheme } from "../../styles/theme";
import { calcRem } from "../../styles/theme";

import { StepType } from "../../types/etcTypes";

import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";
import { lightTheme } from "../../styles/colors";
import { signUpData } from "../../state/atom";
import { useRecoilState } from "recoil";

export interface SignUpHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  step: number;
  percent: number;
  setStep: Dispatch<SetStateAction<number>>;
  setPercent: Dispatch<SetStateAction<number>>;
}
export interface StProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
  step: number;
}

const STEP_TEXT: StepType = {
  1: "로그인에 사용할 아이디를 알려주세요.",
  2: "로그인에 사용할 비밀번호를 알려주세요.",
  3: "비밀번호를 한 번 더 입력해주세요.",
  4: "비밀번호를 한 번 더 입력해주세요.",
};

const SignUpHeader = ({
  children,
  step = 1,
  setStep,
  percent = 0,
  setPercent,
}: SignUpHeaderProps) => {
  const [data, setData] = useRecoilState(signUpData);

  return (
    <StContainer>
      {step !== 1 && (
        <StBack
          onClick={() => {
            // if (step === 2) {
            //   setData({
            //     memberName: "",
            //     password: "",
            //   });
            // }
            if (step === 3) {
              setData((prev) => ({
                ...prev,
                password: "",
              }));
            }
            setStep(step - 1);
            setPercent(step === 2 ? 12 : 50);
          }}
        >
          <Arrow
            style={{ transform: "rotate(-90deg)" }}
            width="24px"
            height="24px"
            fill={lightTheme.colors.primary01}
          />
        </StBack>
      )}

      <StCreateText>{percent}% 디스크 생성 중...</StCreateText>
      <StProgressBar percent={percent} step={step}>
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
  padding: ${calcRem(32)} ${calcRem(32)} ${calcRem(16)} ${calcRem(32)};
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(30)} ${calcRem(16)} ${calcRem(16)} ${calcRem(16)};
  }
`;

const StCreateText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  padding-bottom: ${calcRem(8)};
  text-align: end;
  color: ${lightTheme.colors.primary02};
`;

const StText = styled.span`
  letter-spacing: ${fontTheme.display02.letterSpacing};
  line-height: ${fontTheme.display02.lineHeight};
  font-size: ${fontTheme.display02.fontSize};
  font-weight: ${fontTheme.display02.fontWeight};
  color: ${({ theme }) => theme.colors.primary05};
  padding-top: ${calcRem(24)};
`;

const progressBarAnimation = (percent: number, step: number) => keyframes`
  from {
    width: ${step === 1 ? 0 : step === 2 ? 12 : step === 3 ? 50 : 80}%;
  }
  to {
    width: ${percent}%;
  }
`;

const StProgressBar = styled.div<StProgressBarProps>`
  border-radius: 8px;
  width: 100%;
  height: 8px;
  background-color: rgba(108, 99, 255, 0.3);
  div {
    border-radius: 8px;
    width: ${({ percent }) => `${percent}%`};
    height: 8px;
    background-color: ${({ theme }) => theme.colors.primary01};
    animation: ${({ percent, step }) =>
        step > 0 ? progressBarAnimation(percent, step) : undefined}
      1s ease-in-out;
  }
`;

const StBack = styled.div`
  position: absolute;
  top: ${calcRem(24)};
  svg {
    cursor: pointer;
  }

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    top: ${calcRem(6)};
  }
`;

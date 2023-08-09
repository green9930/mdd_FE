import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { fontTheme } from "../../styles/theme";
import { calcRem } from "../../styles/theme";

import Input from "../elements/Input";
import { InputStatusType, ValidationType } from "../../types/etcTypes";
import { lightThemeState } from "../../state/atom";
import { useRecoilValue } from "recoil";

import { ReactComponent as CheckCircle } from "../../assets/svg/check_circle.svg";
import { lightTheme } from "../../styles/colors";
import Button from "../elements/Button";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";

interface buttonStyleType {
  show?: boolean;
}

export interface SignUpHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  percent: number;
  setPercent: Dispatch<SetStateAction<number>>;
}

const VALIDATION: ValidationType[] = [
  {
    text: "영문 포함",
    validation: /[a-zA-Z]/,
  },
  {
    text: "숫자 포함",
    validation: /\d/,
  },
  {
    text: "8-20자 이내",
    validation: /^.{8,20}$/,
  },
  {
    text: "중복되지 않은 아이디",
    validation: false,
  },
];

const NUMBER = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];

const SignUpPassword = ({
  children,
  step = 1,
  setStep,
  percent = 0,
  setPercent,
}: SignUpHeaderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<InputStatusType>("default");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState(["0", "0", "0", "0", "0", "0"]);

  useEffect(() => {}, []);

  return (
    <StContainer>
      <StPassword>
        {password.map((item, index) => (
          <StPasswordBox key={`${item}_${index}`}>
            <StPasswordText>*</StPasswordText>
          </StPasswordBox>
        ))}
      </StPassword>
      <StNumberGrid>
        {NUMBER.map((item, index) => (
          <StBottom
            show={item === ""}
            onClick={() => {
              setPercent(80);
              setStep(3);
            }}
            key={`${item}_${index}`}
          >
            <StNumberText>{item}</StNumberText>
          </StBottom>
        ))}

        <StBottom
          onClick={() => {
            setPercent(80);
            setStep(3);
          }}
        >
          <Arrow
            style={{ transform: "rotate(-90deg)" }}
            width="24px"
            height="24px"
            fill={lightTheme.colors.primary01}
          />
        </StBottom>
      </StNumberGrid>
      <StCautionText>
        아이디와 비밀번호는 찾을 수 없으니 주의해주세요
      </StCautionText>
    </StContainer>
  );
};

export default SignUpPassword;

const StContainer = styled.div`
  padding: ${calcRem(24)} 0 ${calcRem(76)} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  height: 100%;
`;

const StValidFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${calcRem(4)};
`;

const StPasswordText = styled.span`
  letter-spacing: ${fontTheme.display02.letterSpacing};
  line-height: ${fontTheme.display02.lineHeight};
  font-size: ${fontTheme.display02.fontSize};
  font-weight: ${fontTheme.headline01.fontWeight};
  color: ${({ theme }) => theme.colors.primary02};
`;

const StNumberGrid = styled.div`
  padding: ${calcRem(60)} 0 ${calcRem(52)} 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 160px;
  gap: ${calcRem(8)};
`;

const StBottom = styled.div<buttonStyleType>`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.primary01};
  opacity: ${({ show }) => (show ? "0" : "1")};
  cursor: ${({ show }) => (show ? "default" : "pointer")};
  box-shadow: 0px 14px 21px -1px rgba(6, 25, 56, 0.08);

  :hover,
  :active {
    span {
      color: ${({ theme }) => theme.colors.white};
    }

    svg {
      ${css`
        fill: ${({ theme }) => theme.colors.white};
      `}
    }
    background-color: ${({ theme }) => theme.colors.primary01};
  }
`;

const StNumberText = styled.span`
  letter-spacing: ${fontTheme.display02.letterSpacing};
  line-height: ${fontTheme.display02.lineHeight};
  font-size: ${fontTheme.display02.fontSize};
  font-weight: ${fontTheme.headline01.fontWeight};
  color: ${({ theme }) => theme.colors.primary01};
`;

const StPassword = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${calcRem(12)};
`;

const StPasswordBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 48px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary02};
`;

const StCautionText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ theme }) => theme.colors.primary01};
`;

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { fontTheme } from "../../styles/theme";
import { calcRem } from "../../styles/theme";

import Input from "../elements/Input";
import { InputStatusType, ValidationType } from "../../types/etcTypes";
import { useRecoilState } from "recoil";

import { ReactComponent as CheckCircle } from "../../assets/svg/check_circle.svg";
import Button from "../elements/Button";
import { signUpData } from "../../state/atom";

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
];

type ValidType = {
  valid: boolean;
};

const SignUpId = ({
  children,
  step = 1,
  setStep,
  percent = 0,
  setPercent,
}: SignUpHeaderProps) => {
  const [duplicated, setDupliceted] = useState(true);
  const [status, setStatus] = useState<InputStatusType>("default");
  const [value, setValue] = useState("");

  const [data, setData] = useRecoilState(signUpData);

  const checkValidation = () => {
    return (
      VALIDATION.every((item) => item.validation.test(value)) && duplicated
    );
  };

  return (
    <StContainer>
      <StTop>
        <Input
          labelText="아이디"
          status={status}
          setStatus={setStatus}
          value={value}
          setValue={setValue}
          maxLengthView={false}
          maxLength={20}
          placeholder="아이디를 입력해주세요"
        ></Input>
        <StValidContainer>
          {VALIDATION.map((item) => (
            <StValidFlex key={item.text} valid={item.validation.test(value)}>
              <CheckCircle width="16px" height="16px" />
              <StvalidText>{item.text}</StvalidText>
            </StValidFlex>
          ))}
          <StValidFlex valid={duplicated}>
            <CheckCircle width="16px" height="16px" />
            <StvalidText>중복되지 않은 아이디</StvalidText>
          </StValidFlex>
        </StValidContainer>
      </StTop>
      <StBottom>
        <StCautionText>
          아이디와 비밀번호는 찾을 수 없으니 주의해주세요
        </StCautionText>
        <Button
          btnStatus={checkValidation() ? "primary01" : "disabled"}
          clickHandler={() => {
            if (checkValidation()) {
              setData({
                memberName: value,
                password: "",
              });
              setStep(2);
              setPercent(50);
            }
          }}
        >
          <span>다음</span>
        </Button>
      </StBottom>
    </StContainer>
  );
};

export default SignUpId;

const StContainer = styled.div`
  padding: ${calcRem(24)} 0 ${calcRem(76)} 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StValidContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${calcRem(8)};
  padding-top: ${calcRem(4)};
  flex-wrap: wrap;
`;

const StValidFlex = styled.div<ValidType>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${calcRem(3)};
  span {
    color: ${({ valid, theme }) =>
      valid ? theme.colors.primary02 : theme.colors.error};
  }
  svg {
    fill: ${({ valid, theme }) =>
      valid ? theme.colors.primary02 : theme.colors.error};
  }
`;

const StvalidText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
`;

const StCautionText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ theme }) => theme.colors.primary01};
`;

const StBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(28)};
`;

const StTop = styled.div`
  display: flex;
  flex-direction: column;
`;

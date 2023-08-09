import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { fontTheme } from "../../styles/theme";
import { calcRem } from "../../styles/theme";

import Input from "../elements/Input";
import { InputStatusType } from "../../types/etcTypes";
import { lightThemeState } from "../../state/atom";
import { useRecoilValue } from "recoil";

import { ReactComponent as CheckCircle } from "../../assets/svg/check_circle.svg";
import { lightTheme } from "../../styles/colors";
import Button from "../elements/Button";

export interface SignUpHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  percent: number;
  setPercent: Dispatch<SetStateAction<number>>;
}

type ValidationType = {
  text: string;
  validation: RegExp | boolean;
};

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

const SignUpId = ({
  children,
  step = 1,
  setStep,
  percent = 0,
  setPercent,
}: SignUpHeaderProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<InputStatusType>("default");
  const [value, setValue] = useState("");

  useEffect(() => {}, []);

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
            <StValidFlex key={item.text}>
              <CheckCircle
                width="16px"
                height="16px"
                fill={lightTheme.colors.primary01}
              />
              <StvalidText>{item.text}</StvalidText>
            </StValidFlex>
          ))}
        </StValidContainer>
      </StTop>
      <StBottom>
        <StCautionText>
          아이디와 비밀번호는 찾을 수 없으니 주의해주세요
        </StCautionText>
        <Button
          btnStatus="primary01"
          // disabled
          clickHandler={() => {
            setStep(2);
            setPercent(50);
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
`;

const StValidFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${calcRem(4)};
`;

const StvalidText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ theme }) => theme.colors.primary02};
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

import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";
import styled from "styled-components";
import { fontTheme } from "../../styles/theme";
import { calcRem } from "../../styles/theme";

import { useRecoilValue } from "recoil";

import Input from "../elements/Input";
import {
  InputStatusType,
  ValidationType,
  isLightThemeType,
} from "../../types/etcTypes";
import { useRecoilState } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDuplicatedId } from "../../api/memberApi";

import { ReactComponent as CheckCircle } from "../../assets/svg/check_circle.svg";
import Button from "../elements/Button";
import { lightThemeState, signUpData } from "../../state/atom";
import { lightTheme } from "../../styles/colors";

export interface SignUpIdrProps extends React.HTMLAttributes<HTMLDivElement> {
  setStep: Dispatch<SetStateAction<number>>;
  setPercent: Dispatch<SetStateAction<number>>;
}

const VALIDATION: ValidationType[] = [
  {
    text: "영문 포함",
    validation: /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/,
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
  isLightTheme: boolean;
};

const SignUpId = ({ setStep, setPercent }: SignUpIdrProps) => {
  const queryClient = useQueryClient();
  const isLightTheme = useRecoilValue(lightThemeState);

  const [duplicated, setDupliceted] = useState(true);
  const [status, setStatus] = useState<InputStatusType>("default");
  const [value, setValue] = useState("");
  const [data, setData] = useRecoilState(signUpData);

  const checkValidation = () => {
    return (
      VALIDATION.every((item) => item.validation.test(value)) && duplicated
    );
  };

  useEffect(() => {
    if (data.memberName) {
      setValue(data.memberName);
    }
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      checkDuplicateNickname(value);
    }
  }, [value]);

  const checkDuplicateNickname = async (memberName: string) => {
    const result = await queryClient.fetchQuery(
      ["nicknameCheck", memberName],
      () => getDuplicatedId(memberName)
    );
    result ? setDupliceted(true) : setDupliceted(false);
  };

  const onClickNextStep = () => {
    if (checkValidation()) {
      setData({
        memberName: value,
        password: "",
      });
      setStep(2);
      setPercent(50);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickNextStep();
    }
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
          inputType="memberName"
          onKeyDown={handleKeyDown}
        ></Input>
        <StValidContainer>
          {VALIDATION.map((item) => (
            <StValidFlex
              isLightTheme={isLightTheme}
              key={item.text}
              valid={value.length > 0 ? item.validation.test(value) : true}
            >
              <CheckCircle width="16px" height="16px" />
              <StvalidText>{item.text}</StvalidText>
            </StValidFlex>
          ))}
          <StValidFlex isLightTheme={isLightTheme} valid={duplicated}>
            <CheckCircle width="16px" height="16px" />
            <StvalidText>중복되지 않은 아이디</StvalidText>
          </StValidFlex>
        </StValidContainer>
      </StTop>
      <StBottom>
        <StCautionText isLightTheme={isLightTheme}>
          아이디와 비밀번호는 찾을 수 없으니 주의해주세요
        </StCautionText>
        <Button
          btnStatus={checkValidation() ? "primary01" : "disabled"}
          clickHandler={onClickNextStep}
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
    color: ${({ valid, isLightTheme }) =>
      valid
        ? isLightTheme
          ? lightTheme.colors.primary02
          : lightTheme.colors.white
        : lightTheme.colors.error};
  }
  svg {
    fill: ${({ valid, isLightTheme }) =>
      valid
        ? isLightTheme
          ? lightTheme.colors.primary02
          : lightTheme.colors.white
        : lightTheme.colors.error};
  }
`;

const StvalidText = styled.span`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
`;

const StCautionText = styled.span<isLightThemeType>`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ isLightTheme, theme }) =>
    isLightTheme ? theme.colors.primary01 : theme.colors.text02};
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

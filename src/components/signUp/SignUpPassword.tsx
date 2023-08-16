import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";

import {
  lightThemeState,
  routeState,
  signUpData,
  signUpState,
} from "../../state/atom";
import { postJoin } from "../../api/memberApi";
import { isLightThemeType } from "../../types/etcTypes";
import { calcRem, fontTheme } from "../../styles/theme";
import { lightTheme } from "../../styles/colors";

import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";

interface ButtonStyleProps {
  show?: boolean;
  status?: string;
}

export interface SignUpPasswordProps
  extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  setPercent: Dispatch<SetStateAction<number>>;
}

const NUMBER = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"];

const SignUpPassword = ({
  step = 1,
  setStep,
  setPercent,
}: SignUpPasswordProps) => {
  const [error, setError] = useState(false);
  const [passwordIndex, setPasswordIndex] = useState(0);
  const [password, setPassword] = useState(["", "", "", "", "", ""]);
  const [data, setData] = useRecoilState(signUpData);
  const setIsSignUp = useSetRecoilState(signUpState);
  const setRoute = useSetRecoilState(routeState);
  const isLightTheme = useRecoilValue(lightThemeState);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setPassword(["", "", "", "", "", ""]);
      setPasswordIndex(0);
    }
  }, [error]);

  useEffect(() => {
    if (step === 2) {
      setError(false);
    }
  }, [step]);

  const { mutate: mutationSignUp, isLoading: mutationIsLoading } = useMutation(
    () => postJoin(data),
    {
      onSuccess(res) {
        setIsSignUp(true);
        setRoute(true);
        setStep(4);
        setPercent(100);
        setTimeout(() => {
          navigate("/new-disk", { state: "signUp" });
        }, 800);
      },
    }
  );

  const deletePassword = () => {
    if (passwordIndex !== 0) {
      const passwordCopy = [...password];
      passwordCopy[passwordIndex - 1] = "";
      setPassword(passwordCopy);
      setPasswordIndex(passwordIndex - 1);
    }
  };

  const passwordInput = (item: string) => {
    // step2일 때
    if (step === 2) {
      const passwordCurrent = [...password];
      passwordCurrent[passwordIndex] = item;
      setPassword(passwordCurrent);
      setPasswordIndex(passwordIndex + 1);

      // 6자릿수 일 때 다음 step
      if (passwordCurrent.join("").length === 6) {
        setPasswordIndex(0);
        setPassword(["", "", "", "", "", ""]);
        setPercent(80);
        setStep(3);
        setData((prev) => ({
          ...prev,
          password: passwordCurrent.join(""),
        }));
      }
      // step3일 때
    } else if (step === 3) {
      setError(false);
      const passwordCurrent = [...password];
      passwordCurrent[passwordIndex] = item;
      setPassword(passwordCurrent);
      setPasswordIndex(passwordIndex + 1);
      if (passwordCurrent.join("").length === 6) {
        //기존 password 동일 여부 확인
        if (data.password === passwordCurrent.join("")) {
          mutationSignUp();
        } else {
          setError(true);
        }
      }
    }
  };

  return (
    <StContainer>
      <StPassword>
        {password.map((item, index) => (
          <StPasswordBox
            status={error ? "warning" : item === "" ? "default" : "filled"}
            key={`${item}_${index}`}
          >
            <StPasswordText>
              {index === passwordIndex - 1 && item !== "" ? item : "*"}
            </StPasswordText>
          </StPasswordBox>
        ))}
        {error && <StErrorText>틀린 비밀번호에요!</StErrorText>}
      </StPassword>

      <StNumberGrid>
        {NUMBER.map((item, index) => (
          <StBottom
            show={item === ""}
            onClick={() => passwordInput(item)}
            key={`${item}_${index}`}
          >
            <StNumberText>{item}</StNumberText>
          </StBottom>
        ))}

        <StBottom onClick={deletePassword}>
          <Arrow
            style={{ transform: "rotate(-90deg)" }}
            width="24px"
            height="24px"
            fill={lightTheme.colors.primary01}
          />
        </StBottom>
      </StNumberGrid>
      <StCautionText isLightTheme={isLightTheme}>
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
  height: 100%;
`;

const StPasswordText = styled.span`
  letter-spacing: ${fontTheme.display02.letterSpacing};
  line-height: ${fontTheme.display02.lineHeight};
  font-size: ${fontTheme.display02.fontSize};
  font-weight: ${fontTheme.headline01.fontWeight};
`;

const StErrorText = styled.span`
  position: absolute;
  top: ${calcRem(64)};
  left: 50%;
  transform: translate(-50%, 0);
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
`;

const StNumberGrid = styled.div`
  padding: ${calcRem(60)} 0 ${calcRem(52)} 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 160px;
  gap: ${calcRem(8)};
`;

const StBottom = styled.div<ButtonStyleProps>`
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
  background-color: ${({ theme }) => theme.colors.primary03};
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
  position: relative;
`;

const StPasswordBox = styled.div<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 48px;
  border-bottom: 2px solid;
  border-color: ${({ theme, status }) => {
    switch (status) {
      case "default":
        return theme.colors.primary02;
      case "filled":
        return theme.colors.primary01;
      case "warning":
        return theme.colors.error;
      default:
        break;
    }
  }};
  span {
    color: ${({ theme, status }) => {
      switch (status) {
        case "default":
          return theme.colors.primary02;
        case "filled":
          return theme.colors.primary01;
        case "warning":
          return theme.colors.error;
        default:
          break;
      }
    }};
  }
`;

const StCautionText = styled.span<isLightThemeType>`
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ isLightTheme, theme }) =>
    isLightTheme ? theme.colors.primary01 : theme.colors.text02};
`;

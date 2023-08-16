import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import styled from "styled-components";

import { InputStatusType } from "../types/etcTypes";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../styles/theme";

import { getCookie, setCookie } from "../utils/cookie";
import { getLoc } from "../utils/localStorage";
import { postLogin } from "../api/memberApi";
import { loginState } from "../state/atom";

import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import PasswordInput from "../components/elements/PasswordInput";
import AppLayout from "../components/layout/AppLayout";

import MonitorFilled from "../assets/img/monitor_filled.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [idStatus, setIdStatus] = useState<InputStatusType>("default");
  const [passwordStatus, setPasswordStatus] =
    useState<InputStatusType>("default");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const setIsLogin = useSetRecoilState(loginState);

  const validCheck = () => {
    return (
      /^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$/.test(id) &&
      /\d/.test(id) &&
      id.length >= 8 &&
      id.length <= 20 &&
      password.length === 6
    );
  };

  const { mutate: mutationLogin, isLoading: mutationIsLoading } = useMutation({
    mutationFn: postLogin,
    onSuccess(res) {
      setIsLogin(true);
      navigate(`/home/${getLoc("memberId")}`);
    },
    onError(error: AxiosError | any) {
      const errerStatus = error.response.status;
      const errorMessage = error.response.data.errorMessage;

      // 비밀번호 오류 : 409
      if (errerStatus === 409) {
        setPasswordStatus("warning");

        // 존재하지 않는 아이디 : 404
      } else if (errerStatus === 404) {
        setIdStatus("warning");

        // 로그인 시도 5회 초과 시 : 429 => 1분간 서버 에러
      } else if (errerStatus === 429) {
        window.alert(errorMessage);
        const expiresIn = new Date(Date.now() + 60000);
        setCookie("loginOver", "true", expiresIn);
      }
    },
  });

  return (
    <AppLayout>
      <StContainer>
        <StMonitor src={MonitorFilled} />
        <Input
          labelText="아이디"
          status={idStatus}
          setStatus={setIdStatus}
          TopChildren={
            idStatus === "warning" && (
              <StErrorText>존재하지 않는 아이디에요.</StErrorText>
            )
          }
          value={id}
          setValue={setId}
          maxLengthView={false}
          maxLength={20}
          placeholder="아이디를 입력해주세요"
          inputType="memberName"
        ></Input>
        <StInputContainer>
          <PasswordInput
            labelText="비밀번호"
            status={passwordStatus}
            setStatus={setPasswordStatus}
            TopChildren={
              passwordStatus === "warning" && (
                <StErrorText>비밀번호가 맞지 않아요.</StErrorText>
              )
            }
            bottomChildren={
              passwordStatus === "warning" && (
                <StPasswordErrorText>
                  오직 숫자로만 입력해주세요.
                </StPasswordErrorText>
              )
            }
            value={password}
            setValue={setPassword}
            maxLength={6}
            placeholder="비밀번호를 입력해주세요"
          ></PasswordInput>
        </StInputContainer>
        <Button
          btnStatus={validCheck() ? "primary01" : "disabled"}
          clickHandler={() => {
            if (validCheck()) {
              if (getCookie("loginOver") !== "true") {
                mutationLogin({
                  memberName: id,
                  password: password,
                });
              } else {
                window.alert(
                  "너무 많은 로그인 시도를 했습니다. 잠시 후 다시 시도해주세요."
                );
              }
            }
          }}
        >
          <span>접속하기</span>
        </Button>
        <StSignUpText onClick={() => navigate("/signUp")}>
          아이디가 없어요
        </StSignUpText>
      </StContainer>
    </AppLayout>
  );
};

export default LoginPage;

const StContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${calcRem(48)} ${calcRem(32)} ${calcRem(27)} ${calcRem(32)};
  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(48)} ${calcRem(16)} ${calcRem(27)} ${calcRem(16)};
  }
`;

const StInputContainer = styled.div`
  width: 100%;
  padding: ${calcRem(16)} 0 ${calcRem(52)} 0;
`;

const StMonitor = styled.img`
  width: 251px;
  height: auto;
  padding-bottom: ${calcRem(32)};
`;

const StErrorText = styled.span`
  letter-spacing: ${fontTheme.body02.letterSpacing};
  line-height: ${fontTheme.body02.lineHeight};
  font-size: ${fontTheme.body02.fontSize};
  font-weight: ${fontTheme.body02.fontWeight};
  color: ${({ theme }) => theme.colors.error};
`;

const StPasswordErrorText = styled.span`
  position: absolute;
  bottom: ${calcRem(-20)};
  letter-spacing: ${fontTheme.caption.letterSpacing};
  line-height: ${fontTheme.caption.lineHeight};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
  color: ${({ theme }) => theme.colors.error};
`;

const StSignUpText = styled.span`
  cursor: pointer;
  padding-top: ${calcRem(32)};
  letter-spacing: ${fontTheme.button.letterSpacing};
  line-height: ${fontTheme.button.lineHeight};
  font-size: ${fontTheme.button.fontSize};
  font-weight: ${fontTheme.button.fontWeight};
  color: ${({ theme }) => theme.colors.primary01};
  text-decoration-line: underline;
`;

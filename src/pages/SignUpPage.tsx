import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import AppLayout from "../components/layout/AppLayout";

import SignUpHeader from "../components/signUp/SignUpHeader";
import SignUpId from "../components/signUp/SignUpId";
import SignUpPassword from "../components/signUp/SignUpPassword";

import { postJoin } from "../api/memberApi";
import { signUpData } from "../state/atom";
import { useRecoilState } from "recoil";

const SignUpPage = () => {
  const [step, setStep] = useState<number>(1);
  const [percent, setPercent] = useState<number>(12);

  return (
    <AppLayout>
      <StContainer>
        <SignUpHeader
          step={step}
          setStep={setStep}
          percent={percent}
          setPercent={setPercent}
        >
          {step === 1 && (
            <SignUpId
              step={step}
              setStep={setStep}
              percent={percent}
              setPercent={setPercent}
            />
          )}
          {step !== 1 && (
            <SignUpPassword
              step={step}
              setStep={setStep}
              setPercent={setPercent}
            />
          )}
        </SignUpHeader>
      </StContainer>
    </AppLayout>
  );
};

export default SignUpPage;

const StContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

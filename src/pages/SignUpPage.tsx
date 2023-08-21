import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { signUpData } from "../state/atom";

import AppLayout from "../components/layout/AppLayout";
import SignUpHeader from "../components/signUp/SignUpHeader";
import SignUpId from "../components/signUp/SignUpId";
import SignUpPassword from "../components/signUp/SignUpPassword";

const SignUpPage = () => {
  const location = useLocation();

  const [step, setStep] = useState<number>(1);
  const [percent, setPercent] = useState<number>(12);

  const setData = useSetRecoilState(signUpData);

  useEffect(() => {
    return () => {
      setData({
        memberName: "",
        password: "",
      });
    };
  }, [setData, location]);

  return (
    <AppLayout>
      <StContainer>
        <SignUpHeader
          step={step}
          setStep={setStep}
          percent={percent}
          setPercent={setPercent}
        >
          {step === 1 && <SignUpId setStep={setStep} setPercent={setPercent} />}
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

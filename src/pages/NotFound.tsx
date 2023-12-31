import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { calcRem, fontTheme } from "../styles/theme";

import Button from "../components/elements/Button";
import AppLayout from "../components/layout/AppLayout";

import DiskMask3 from "../assets/img/disk_mask_notfound.png";
import { ReactComponent as HomeEmpty } from "../assets/svg/home_empty.svg";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <StContainer>
        <StImageContainer>
          <StImage src={DiskMask3} />
          <StErrorText>{`페이지를 찾을 수 없어요.`}</StErrorText>
        </StImageContainer>

        <StButtonContainer>
          <Button
            btnStatus={"primary01"}
            clickHandler={() => {
              navigate("/");
            }}
          >
            <StButtonText>
              <HomeEmpty />
              <span>홈으로 가기</span>
            </StButtonText>
          </Button>
        </StButtonContainer>
      </StContainer>
    </AppLayout>
  );
};

export default NotFound;

const StContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 0;
`;

const StImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 35%;
  transform: translate(0, -50%);
`;

const StImage = styled.img`
  width: 175px;
  height: auto;
`;

const StErrorText = styled.div`
  text-align: center;
  font-family: "NanumSquareNeo";
  color: ${({ theme }) => theme.colors.primary05};
  line-height: ${fontTheme.display01.lineHeight};
  letter-spacing: ${fontTheme.display01.letterSpacing};
  font-size: ${fontTheme.display01.fontSize};
  font-weight: ${fontTheme.display01.fontWeight};
  white-space: pre-line;
  margin-top: ${calcRem(24)};
`;

const StButtonText = styled.div`
  svg {
    width: 24px;
    height: 24px;
  }
  display: flex;
  align-items: center;
  gap: ${calcRem(8)};
`;

const StButtonContainer = styled.div`
  width: 146px;
  margin-top: ${calcRem(8)};
  position: absolute;
  bottom: 50px;
`;

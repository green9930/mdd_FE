import React from "react";
import styled from "styled-components";
import LogoMDD from "../../assets/img/logo_mdd.png";
import { ReactComponent as Home } from "../../assets/svg/home.svg";
import { ReactComponent as Setting } from "../../assets/svg/setting.svg";
import { MOBILE_MAX_W, calcRem } from "../../styles/theme";
import { lightTheme } from "../../styles/colors";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isMyDisk: boolean;
  userName: string;
  jc?: string;
  children?: React.ReactNode;
}

const Header = ({
  isMyDisk,
  userName,
  jc = "space-between",
  children,
}: HeaderProps) => {
  const handleGoHome = () => {
    // 로그인 한 유저일경우 -> 내 홈으로 이동
    // 없을 경우 -> 로그인 화면으로 이동
  };

  const handleGoSetting = () => {
    // 환경 설정으로 이동
  };

  return (
    <StHeader jc={jc}>
      <StTitle>
        {isMyDisk ? (
          <StLogo src={LogoMDD} alt="MDD-logo" />
        ) : (
          <StTitleText>{userName}님의 홈</StTitleText>
        )}
      </StTitle>
      {isMyDisk ? (
        <button onClick={() => handleGoSetting()}>
          <Setting
            fill={lightTheme.colors.primary01}
            stroke={lightTheme.colors.primary01}
          />
        </button>
      ) : (
        <button onClick={() => handleGoHome()}>
          <Home
            fill={lightTheme.colors.primary01}
            stroke={lightTheme.colors.primary01}
          />
        </button>
      )}
      {children}
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div<{ jc: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ jc }) => jc};
  width: 100%;
  height: 50px;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.colors.primary02};
  position: relative;

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 16px;
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
  }
`;

const StLogo = styled.img`
  width: 110px;
  height: auto;
`;

const StTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StTitleText = styled.h1`
  color: ${({ theme }) => theme.colors.bg};
  line-height: ${calcRem(24)};
  letter-spacing: 0.15px;
  font-size: ${calcRem(16)};
  font-weight: 500;
`;

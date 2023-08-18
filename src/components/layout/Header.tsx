import React from "react";
import styled from "styled-components";

import { MOBILE_MAX_W, calcRem } from "../../styles/theme";
import { lightTheme } from "../../styles/colors";

import LogoMDDSimple from "../../assets/img/logo_mdd_simple.png";
import { ReactComponent as Home } from "../../assets/svg/home.svg";
import { ReactComponent as Setting } from "../../assets/svg/setting.svg";
import { useNavigate } from "react-router-dom";
import { getLoc } from "../../utils/localStorage";

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
  const navigate = useNavigate();

  const accessToken = getLoc("accessToken");
  const memberId = getLoc("memberId");

  const handleGoHome = () => {
    if (accessToken) {
      navigate(`/home/${memberId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <StHeader jc={jc}>
      <StTitle>
        {isMyDisk ? (
          <StLogo src={LogoMDDSimple} alt="MDD-logo" />
        ) : (
          <StTitleText>{userName}님의 홈</StTitleText>
        )}
      </StTitle>
      {isMyDisk ? (
        <button onClick={() => navigate("/settings")}>
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
  height: 62px;
  padding: 0 32px;
  background-color: ${({ theme }) => theme.colors.primary02};
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary01};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: 0 16px;
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
  color: ${({ theme }) => theme.colors.white};
  line-height: ${calcRem(24)};
  letter-spacing: 0.15px;
  font-size: ${calcRem(16)};
  font-weight: 500;
`;

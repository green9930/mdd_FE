import React, { useState } from "react";
import styled from "styled-components";
import { calcRem } from "../../styles/GlobalStyle";
import { BtnStatusType } from "../../types/etcTypes";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  buttonText?: string;
  btnStatus: BtnStatusType;
  clickHandler: () => void;
  children: React.ReactNode;
}

const Button = ({
  buttonText,
  btnStatus,
  clickHandler,
  children,
}: ButtonProps) => {
  return (
    <StButton btnStatus={btnStatus} onClick={() => clickHandler()}>
      <StContent btnStatus={btnStatus}>{children}</StContent>
    </StButton>
  );
};

export default Button;

const StButton = styled.button<{ btnStatus: BtnStatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  gap: 10px;
  border: none;
  background-color: ${({ theme, btnStatus }) => {
    switch (btnStatus) {
      case "primary01":
        return theme.colors.primary01;
      case "primary02":
        return theme.colors.primary02;
      case "disabled":
        return "#C8C5FF";
      case "transparent":
        return "transparent";
    }
  }};
  border-radius: 12px;
`;

const StContent = styled.div<{ btnStatus: BtnStatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  span {
    color: ${({ theme, btnStatus }) => {
      switch (btnStatus) {
        case "primary01":
          return theme.colors.white;
        case "primary02":
          return theme.colors.white;
        case "disabled":
          return theme.colors.primary02;
        case "transparent":
          return theme.colors.primary01;
      }
    }};
    text-align: center;
    line-height: ${calcRem(17)};
    letter-spacing: 1.35px;
    font-size: ${calcRem(16)};
    font-weight: 700;
  }
`;

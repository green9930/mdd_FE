import React, { useState } from "react";
import styled from "styled-components";
import { BtnStatusType } from "../../types/etcTypes";
import { calcRem, fontTheme } from "../../styles/theme";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  btnStatus: BtnStatusType;
  clickHandler: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({
  btnStatus,
  clickHandler,
  disabled = false,
  children,
}: ButtonProps) => {
  return (
    <StButton
      btnStatus={btnStatus}
      onClick={() => clickHandler()}
      disabled={disabled}
    >
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
  padding: ${({ btnStatus }) =>
    btnStatus === "transparent" ? calcRem(6) : calcRem(16)};
  gap: ${calcRem(10)};
  border: none;
  background-color: ${({ theme, btnStatus }) => {
    switch (btnStatus) {
      case "primary01":
        return theme.colors.primary01;
      case "primary02":
        return theme.colors.primary02;
      case "disabled":
        return theme.colors.primary04;
      case "unregister":
        return theme.colors.primary04;
      case "transparent":
        return "transparent";
    }
  }};
  border-radius: ${calcRem(12)};
  cursor: ${({ btnStatus }) =>
    btnStatus === "disabled" ? "not-allowed" : "pointer"};
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
        case "unregister":
          return theme.colors.primary01;
        case "transparent":
          return theme.colors.primary01;
      }
    }};
    text-align: center;
    text-decoration: ${({ btnStatus }) =>
      btnStatus === "transparent" ? "underline" : "normal"};
    line-height: ${fontTheme.button.lineHeight};
    letter-spacing: ${fontTheme.button.letterSpacing};
    font-size: ${fontTheme.button.fontSize};
    font-weight: ${fontTheme.button.fontWeight};
  }
`;

import React from "react";
import styled from "styled-components";

import { calcRem, fontTheme } from "../../styles/theme";

interface ToastModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ToastModal = ({ children }: ToastModalProps) => {
  return <StContainer>{children}</StContainer>;
};

export default ToastModal;

const StContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 36px;
  transform: translateX(-50%);
  padding: ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.primary02};
  border-radius: ${calcRem(12)};
  box-shadow: 0px 2px 5px 0px rgba(6, 25, 56, 0.06);

  span {
    color: ${({ theme }) => theme.colors.white};
    line-height: ${fontTheme.body02.lineHeight};
    letter-spacing: ${fontTheme.body02.letterSpacing};
    font-size: ${fontTheme.body02.fontSize};
    font-weight: ${fontTheme.body02.fontWeight};
  }
`;

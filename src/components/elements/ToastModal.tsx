import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { calcRem, fontTheme } from "../../styles/theme";

interface ToastModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ToastModal = ({ children }: ToastModalProps) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, 3000);
  }, []);

  return <StContainer status={status}>{children}</StContainer>;
};

export default ToastModal;

const StContainer = styled.div<{ status: boolean }>`
  opacity: ${({ status }) => (status ? 1 : 0)};
  padding: ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.transparent02};
  border-radius: ${calcRem(12)};
  box-shadow: 0px 2px 5px 0px rgba(6, 25, 56, 0.06);
  position: fixed;
  left: 50%;
  bottom: 36px;
  z-index: 70;
  transform: translate3d(
    ${({ status }) => (status ? "-50%, 0" : "-50%, 10px")},
    0
  );
  transition: opacity 0.3s ease, transform 0.3s ease;

  span {
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.white};
    line-height: ${fontTheme.body02.lineHeight};
    letter-spacing: ${fontTheme.body02.letterSpacing};
    font-size: ${fontTheme.body02.fontSize};
    font-weight: ${fontTheme.body02.fontWeight};
  }
`;

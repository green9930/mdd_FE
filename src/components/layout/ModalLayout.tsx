import React, { useEffect } from "react";
import styled from "styled-components";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  bgc: string;
  children: React.ReactNode;
}

const ModalLayout = ({ width, height, bgc, children }: ModalProps) => {
  // 모달 뒤 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <StModalBackground>
      <StModalBody width={width} height={height} bgc={bgc}>
        {children}
      </StModalBody>
    </StModalBackground>
  );
};

export default ModalLayout;

const StModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.transparent02};
`;

const StModalBody = styled.div<{ width: string; height: string; bgc: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bgc }) => bgc};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

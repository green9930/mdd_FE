import React from "react";
import styled from "styled-components";

import { MOBILE_MAX_W, TABLET_MAX_W, WINDOW_H } from "../../styles/theme";

interface IAppLayout extends React.HTMLAttributes<HTMLDivElement> {}

const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  return <StAppLayout>{children}</StAppLayout>;
};

export default AppLayout;

const StAppLayout = styled.div`
  max-width: ${MOBILE_MAX_W}px;
  min-height: ${WINDOW_H};
  margin: auto;
  background-color: ${({ theme }) => theme.colors.bg};
  position: relative;

  @media screen and (max-width: ${TABLET_MAX_W}px) {
    width: 100%;
  }
`;

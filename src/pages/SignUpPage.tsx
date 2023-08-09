import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import AppLayout from "../components/layout/AppLayout";
import { calcRem, MOBILE_MAX_W } from "../styles/theme";

import Button from "../components/elements/Button";

import LogoMDDSimple from "../assets/img/logo_mdd_simple.png";
import MonitorEmpty from "../assets/img/monitor_empty.png";
import DiskMask01 from "../assets/img/disk_mask_1.png";
import DiskMask02 from "../assets/img/disk_mask_2.png";

const MONITOR_TEXT =
  "당신의 디깅디스크를\n만들어드리는 MDD에 오신것을\n환영합니다.";

const SignUpPage = () => {
  return (
    <AppLayout>
      <StContainer></StContainer>
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

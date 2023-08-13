import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { calcRem, fontTheme, MOBILE_MAX_W } from "../styles/theme";

import DotBackground from "../assets/img/dot_background.png";
import DefaultProfile from "../assets/img/default_profile.png";
import DiskMask01 from "../assets/img/disk_mask_1.png";
import DiskMask02 from "../assets/img/disk_mask_2.png";
import { ReactComponent as Like } from "../assets/svg/like.svg";
import { ReactComponent as Edit } from "../assets/svg/edit.svg";
import { ReactComponent as Share } from "../assets/svg/share.svg";
import { ReactComponent as AllDisk } from "../assets/svg/all_disk.svg";
import { ReactComponent as Guide } from "../assets/svg/guide.svg";
import { ReactComponent as Plus } from "../assets/svg/plus.svg";
import { ReactComponent as Bookmark } from "../assets/svg/bookmark.svg";

import Header from "../components/layout/Header";
import { lightTheme } from "../styles/colors";
import Disk from "../components/elements/Disk";

export type StDotBackgroundProps = {
  image: string;
};
export type StProfileTextProps = {
  color: string;
};

const MainPage = () => {
  return (
    <AppLayout>
      <Header isMyDisk={true} jc="flex-end" userName="testname"></Header>
      <StContainer>
        <StDotBackground image={DotBackground}>
          <StSubContainer>
            <StProfileContainer>
              <StEditBox>
                <Edit />
              </StEditBox>
              <StProfileImage src={DefaultProfile} />
              <StProfileText color={lightTheme.colors.primary01}>
                잔인한 바나나
              </StProfileText>
              <StProfileText color={lightTheme.colors.primary02}>
                뉴진스직캠보기 디깅중
              </StProfileText>
              <StProfileText color={lightTheme.colors.text01}>
                지금 노래 뭐들으세요? 뉴진스의 하입보이요하아아아아입
              </StProfileText>
              <StVisitLike>
                <span>방문 123,456</span>
                <Like fill={lightTheme.colors.primary02} />
                <span>좋아요 345,342</span>
              </StVisitLike>
            </StProfileContainer>

            <StDiskContainer>
              <StTopBox>
                <StDiskText>대표 디스크</StDiskText>
                <Plus width="24px" height="24px" />
              </StTopBox>
              <StDiskBoxFlex>
                <StDiskBox>
                  <Bookmark width="22px" height="22px" />
                  <Disk diskColor="NEONORANGE" />
                  <span>움치치상반기 최애 아이돌 Top4⸜( ˙ ˘ ˙)⸝♡</span>
                </StDiskBox>
                <StDiskBox>
                  <Bookmark width="22px" height="22px" />
                  <Disk diskColor="NEONORANGE" />
                  <span>움치치상반기 </span>
                </StDiskBox>
                <StDiskBox>
                  <Bookmark width="22px" height="22px" />
                  <Disk diskColor="NEONORANGE" />
                  <span>움치치상반기 최애 아이돌 Top4⸜</span>
                </StDiskBox>
              </StDiskBoxFlex>
            </StDiskContainer>

            <StBottomContainer>
              <div>
                <Share />
                <span>홈 공유하기</span>
              </div>

              <div>
                <AllDisk />
                <span>전체 디깅디스크</span>
              </div>
              <div>
                <Guide />
                <span>{`디깅디스크\n사용법`}</span>
              </div>
            </StBottomContainer>
          </StSubContainer>
        </StDotBackground>
      </StContainer>
    </AppLayout>
  );
};

export default MainPage;

const StContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StDotBackground = styled.div<StDotBackgroundProps>`
  position: absolute;
  top: 0;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 55%;
`;

const StSubContainer = styled.div`
  padding: ${calcRem(24)} ${calcRem(16)} ${calcRem(36)} ${calcRem(16)};
`;

const StProfileContainer = styled.div`
  width: 100%;
  display: flex;
  padding: ${calcRem(24)} ${calcRem(16)};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(8)};
  position: relative;
`;

const StProfileText = styled.span<StProfileTextProps>`
  text-align: center;
  font-family: "NanumSquareNeo";
  color: ${({ color }) => color};
  line-height: ${fontTheme.display01.lineHeight};
  letter-spacing: ${fontTheme.display01.letterSpacing};
  font-size: ${fontTheme.display01.fontSize};
  font-weight: ${fontTheme.display01.fontWeight};
`;

const StVisitLike = styled.div`
  display: flex;
  align-items: center;
  gap: ${calcRem(4)};

  span {
    text-align: center;
    color: ${({ theme }) => theme.colors.primary02};
    line-height: ${fontTheme.caption.lineHeight};
    letter-spacing: ${fontTheme.caption.letterSpacing};
    font-size: ${fontTheme.caption.fontSize};
    font-weight: ${fontTheme.caption.fontWeight};
  }
  svg {
    margin-left: ${calcRem(8)};
    width: 16px;
    height: 16px;
  }
`;

const StProfileImage = styled.img`
  width: 69px;
  height: auto;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  object-fit: cover;
`;

const StDiskBoxFlex = styled.div`
  width: 100%;
  gap: ${calcRem(12)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(3, 1fr); */
`;

const StEditBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0px 12px 0px 4px;
  top: -2px;
  right: -2px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary01};
  svg {
    width: 24px;
    height: 24px;
  }
`;

const StDiskContainer = styled.div`
  margin: ${calcRem(16)} 0 ${calcRem(24)} 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${calcRem(16)};
  padding: ${calcRem(24)} ${calcRem(16)};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary01};
`;

const StTopBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`;

const StDiskText = styled.span`
  font-family: "NanumSquareNeo";
  color: ${({ color }) => color};
  line-height: ${fontTheme.display01.lineHeight};
  letter-spacing: ${fontTheme.display01.letterSpacing};
  font-size: ${fontTheme.display01.fontSize};
  font-weight: ${fontTheme.display01.fontWeight};
`;

const StDiskBox = styled.div`
  cursor: pointer;
  border-radius: 8px;
  padding: ${calcRem(8)} ${calcRem(4)};
  width: 100%;
  height: 132px;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  gap: ${calcRem(8)};
  img {
    width: 60px;
    height: auto;
  }
  svg {
    position: absolute;
    left: 8px;
    top: 0;
  }
  span {
    text-align: center;
    line-height: ${fontTheme.caption.lineHeight};
    letter-spacing: ${fontTheme.caption.letterSpacing};
    font-size: ${fontTheme.caption.fontSize};
    font-weight: ${fontTheme.caption.fontWeight};
  }
`;

const StBottomContainer = styled.div`
  gap: ${calcRem(8)};
  display: flex;
  align-items: top;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${calcRem(17)};
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${calcRem(12)};
  }
  span {
    white-space: pre-line;
    text-align: center;
    font-family: "NanumSquareNeo";
    color: ${({ theme }) => theme.colors.primary02};
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

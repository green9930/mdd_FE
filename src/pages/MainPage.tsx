import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { calcRem, fontTheme, MOBILE_MAX_W } from "../styles/theme";
import { darkTheme, lightTheme } from "../styles/colors";

import { useRecoilValue } from "recoil";
import { lightThemeState } from "../state/atom";

import DotBackground from "../assets/img/dot_background.png";
import DotBackgroundDark from "../assets/img/dot_background_dark.png";
import DefaultProfile from "../assets/img/default_profile.png";
import { ReactComponent as Like } from "../assets/svg/like.svg";
import { ReactComponent as Edit } from "../assets/svg/edit.svg";
import { ReactComponent as Share } from "../assets/svg/share.svg";
import { ReactComponent as AllDisk } from "../assets/svg/all_disk.svg";
import { ReactComponent as GuideIcon } from "../assets/svg/guide.svg";
import { ReactComponent as Plus } from "../assets/svg/plus.svg";
import { ReactComponent as Bookmark } from "../assets/svg/bookmark.svg";

import Header from "../components/layout/Header";
import Disk from "../components/elements/Disk";
import Guide from "../components/Guide";

export type StDotBackgroundProps = {
  image: string;
};
//안씀
export type StProfileTextProps = {
  color: string;
};

const MainPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const isLightTheme = useRecoilValue(lightThemeState);

  return (
    <AppLayout>
      <Header isMyDisk={true} jc="flex-end" userName="testname"></Header>
      <StContainer>
        <StDotBackground
          image={isLightTheme ? DotBackground : DotBackgroundDark}
        >
          <StSubContainer>
            <StProfileContainer
              color={
                isLightTheme ? lightTheme.colors.white : darkTheme.colors.bg
              }
            >
              <StEditBox>
                <Edit />
              </StEditBox>
              <StProfileImage src={DefaultProfile} />
              <StProfileText color={lightTheme.colors.primary01}>
                잔인한 바나나
              </StProfileText>
              <StProfileText color={lightTheme.colors.text02}>
                뉴진스직캠보기 디깅중
              </StProfileText>
              <StProfileText
                color={
                  isLightTheme
                    ? lightTheme.colors.text02
                    : darkTheme.colors.white
                }
              >
                지금 노래 뭐들으세요? 뉴진스의 하입보이요하아아아아입
              </StProfileText>
              <StVisitLike>
                <span>방문 123,456</span>
                <Like
                  fill={
                    isLightTheme
                      ? lightTheme.colors.text02
                      : darkTheme.colors.text02
                  }
                />
                <span>좋아요 345,342</span>
              </StVisitLike>
            </StProfileContainer>

            <StDiskContainer
              color={
                isLightTheme ? lightTheme.colors.white : darkTheme.colors.bg
              }
            >
              <StTopBox>
                <StDiskText
                  color={
                    isLightTheme ? darkTheme.colors.bg : lightTheme.colors.white
                  }
                >
                  대표 디스크
                </StDiskText>
                <Plus
                  onClick={() => navigate("/new-disk")}
                  width="24px"
                  height="24px"
                />
              </StTopBox>

              {/* <StEmptyDisk
                color={
                  isLightTheme ? darkTheme.colors.bg : lightTheme.colors.white
                }
              >
                <span>대표디스크가 없어요.</span>
              </StEmptyDisk> */}

              <StDiskBoxFlex
                color={
                  isLightTheme ? darkTheme.colors.bg : lightTheme.colors.white
                }
              >
                <StDiskBox>
                  <Bookmark width="22px" height="22px" />
                  <Disk diskColor="NEON_ORANGE" />
                  <span>움치치상반기 최애 아이돌 Top4⸜( ˙ ˘ ˙)⸝♡</span>
                </StDiskBox>
                <StDiskBox>
                  <Bookmark width="22px" height="22px" />
                  <Disk diskColor="NEON_ORANGE" />
                  <span>움치치상반기 </span>
                </StDiskBox>
                <StDiskBox>
                  <Bookmark width="22px" height="22px" />
                  <Disk diskColor="NEON_ORANGE" />
                  <span>움치치상반기 최애 아이돌 Top4⸜</span>
                </StDiskBox>
              </StDiskBoxFlex>
            </StDiskContainer>

            <StBottomContainer
              color={
                isLightTheme
                  ? lightTheme.colors.primary02
                  : darkTheme.colors.text02
              }
            >
              <div onClick={() => {}}>
                <Share />
                <span>홈 공유하기</span>
              </div>

              <div onClick={() => navigate("/disk-list")}>
                <AllDisk />
                <span>전체 디깅디스크</span>
              </div>
              <div
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <GuideIcon />
                <span>{`디깅디스크\n사용법`}</span>
              </div>
            </StBottomContainer>
          </StSubContainer>
        </StDotBackground>
      </StContainer>
      <Guide modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
  padding: ${calcRem(24)} ${calcRem(32)} ${calcRem(36)} ${calcRem(32)};
  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(24)} ${calcRem(16)} ${calcRem(36)} ${calcRem(16)};
  }
`;

const StProfileContainer = styled.div`
  width: 100%;
  display: flex;
  padding: ${calcRem(24)} ${calcRem(16)};
  border-radius: 12px;
  background-color: ${({ color }) => color};
  /* background-color: ${({ theme }) => theme.colors.white}; */
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(8)};
  position: relative;
`;

const StProfileText = styled.span`
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
    color: ${({ theme }) => theme.colors.text02};
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
  color: ${({ color }) => color};
  width: 100%;
  gap: ${calcRem(12)};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const StEmptyDisk = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${({ color }) => color};
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
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
  background-color: ${({ color }) => color};
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
    color: ${({ color }) => color};
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
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: ${calcRem(12)};
  }
  span {
    white-space: pre-line;
    text-align: center;
    font-family: "NanumSquareNeo";
    color: ${({ color }) => color};
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
  }
`;

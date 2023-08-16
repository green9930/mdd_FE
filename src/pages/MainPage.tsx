import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { calcRem, fontTheme, MOBILE_MAX_W } from "../styles/theme";
import { darkTheme, lightTheme } from "../styles/colors";

import { getLoc } from "../utils/localStorage";
import { useRecoilValue } from "recoil";
import { lightThemeState } from "../state/atom";
import { getMemberInfo } from "../api/memberApi";
import { useQuery } from "@tanstack/react-query";

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
import ProfileModal from "../components/home/ProfileModal";
import Button from "../components/elements/Button";
import { getBookmarkDiskList } from "../api/diskApi";
import { DiskListType } from "../types/diskTypes";

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
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);

  const isLightTheme = useRecoilValue(lightThemeState);

  const memberId = getLoc("memberId");
  const handleShare = () => {
    if (navigator.share) {
      const nickname = getLoc("nickname");
      navigator
        .share({
          title: "My Digging Disk",
          text: `${nickname} 님의 디스크를 공유했습니다.`,
          url: `mydiggingdisk.com/home/${memberId}`,
        })
        .then(() => {})
        .catch((error) => console.error(error));
    } else {
      alert("현재 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useQuery(
    ["myInfo", id],
    () => getMemberInfo(id ? id : ""),
    {
      onSuccess: (data) => console.log("SUCCESS", data),
      onError: (err) => console.log("GET DISK LIST FAIL", err),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    }
  );

  const { data: bookmarkData } = useQuery(
    ["myBookmarkDisk", id],
    () => getBookmarkDiskList(id ? id : ""),
    {
      onSuccess: (data) => console.log("SUCCESS", data),
      onError: (err) => console.log("GET DISK LIST FAIL", err),
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
    }
  );

  return (
    <AppLayout>
      <Header
        isMyDisk={data && data.isMe}
        jc={data && data.isMe ? "flex-end" : "flex-start"}
        userName={data && data.nickname}
      ></Header>
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
              {data && data.isMe && (
                <StEditBox onClick={() => setOpenProfileModal(true)}>
                  <Edit />
                </StEditBox>
              )}

              <StProfileImage src={data ? data.profileImg : DefaultProfile} />
              <StProfileText color={lightTheme.colors.primary01}>
                {data && data.nickname}
              </StProfileText>
              <StProfileText color={lightTheme.colors.text02}>
                {data && data.interest}
              </StProfileText>
              <StProfileText
                color={
                  isLightTheme
                    ? lightTheme.colors.text01
                    : darkTheme.colors.white
                }
              >
                {data && data.introduce}
              </StProfileText>
              <StVisitLike>
                <span>방문 {data && data.visitCount}</span>
                {data && data.isMe && (
                  <>
                    <Like
                      fill={
                        isLightTheme
                          ? lightTheme.colors.text02
                          : darkTheme.colors.text02
                      }
                    />
                    <span>좋아요 {data && data.likeCount}</span>
                  </>
                )}
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
                {data && data.isMe ? (
                  <Plus
                    onClick={() => navigate("/new-disk")}
                    width="24px"
                    height="24px"
                  />
                ) : (
                  <StMoreText onClick={() => navigate("/disk-list")}>
                    더보기
                  </StMoreText>
                )}
              </StTopBox>

              {/* <StEmptyDisk
                color={
                  isLightTheme ? darkTheme.colors.bg : lightTheme.colors.white
                }
              >
                <span>대표디스크가 없어요.</span>
              </StEmptyDisk> */}

              {bookmarkData && bookmarkData.length > 0 ? (
                <StDiskBoxFlex
                  color={
                    isLightTheme ? darkTheme.colors.bg : lightTheme.colors.white
                  }
                >
                  {bookmarkData.map((item: DiskListType) => (
                    <StDiskBox key={item.diskId}>
                      <Bookmark width="22px" height="22px" />
                      <Disk diskColor={item.diskColor} />
                      <span>{item.diskName}</span>
                    </StDiskBox>
                  ))}
                </StDiskBoxFlex>
              ) : (
                <StEmptyDisk
                  color={
                    isLightTheme
                      ? lightTheme.colors.primary02
                      : lightTheme.colors.white
                  }
                >
                  <span>대표디스크가 없어요.</span>
                </StEmptyDisk>
              )}
            </StDiskContainer>
            {data && data.isMe ? (
              <StBottomContainer
                color={
                  isLightTheme
                    ? lightTheme.colors.primary02
                    : darkTheme.colors.text02
                }
              >
                <div onClick={handleShare}>
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
            ) : (
              <StButtonContainer>
                <Button btnStatus={"primary01"} clickHandler={() => {}}>
                  <StButtonText>
                    <Like />
                    <span>{data && data.likeCount}</span>
                  </StButtonText>
                </Button>
              </StButtonContainer>
            )}
          </StSubContainer>
        </StDotBackground>
      </StContainer>
      {openProfileModal ? (
        <ProfileModal data={data} setOpen={() => setOpenProfileModal(false)} />
      ) : (
        <></>
      )}
      <Guide modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </AppLayout>
  );
};

export default MainPage;

const StContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  width: 100%;
  height: calc(100vh - 50px);
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
  display: flex;
  align-items: center;
  flex-direction: column;
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
  height: 69px;
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
  margin: ${calcRem(16)} 0;
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

const StMoreText = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary01};
  line-height: ${fontTheme.button.lineHeight};
  letter-spacing: ${fontTheme.button.letterSpacing};
  font-size: ${fontTheme.button.fontSize};
  font-weight: ${fontTheme.button.fontWeight};
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
  width: 100%;
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

const StButtonContainer = styled.div`
  width: 139px;
  margin-top: ${calcRem(8)};
`;

const StButtonText = styled.div`
  svg {
    fill: ${({ theme }) => theme.colors.white};
    width: 24px;
    height: 24px;
  }
  display: flex;
  align-items: center;
  gap: ${calcRem(8)};
`;

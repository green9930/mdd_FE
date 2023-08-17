import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { calcRem, fontTheme, MOBILE_MAX_W, WINDOW_W } from "../styles/theme";
import { darkTheme, lightTheme } from "../styles/colors";

import { getLoc } from "../utils/localStorage";
import { useRecoilValue } from "recoil";
import { lightThemeState } from "../state/atom";
import { getUserInfo, postUserLike } from "../api/memberApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { ReactComponent as CloseCircle } from "../assets/svg/close_circle.svg";
import { ReactComponent as Pen } from "../assets/svg/pen.svg";

import Header from "../components/layout/Header";
import Disk from "../components/elements/Disk";
import Guide from "../components/Guide";
import ProfileModal from "../components/home/ProfileModal";
import Button from "../components/elements/Button";
import { getBookmarkDiskList } from "../api/diskApi";
import { DiskType } from "../types/diskTypes";
import NotFound from "./NotFound";
import ModalLayout from "../components/layout/ModalLayout";
import DiskCard from "../components/diskList/DiskCard";

export type StDotBackgroundProps = {
  image: string;
};

const MainPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [targetDisk, setTargetDisk] = useState<number>(0);
  const [like, setLike] = useState<number>(0);

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
          url: `/${memberId}`,
        })
        .then(() => {})
        .catch(() => {});
    } else {
      const url = `http://mydiggingdisk.com/home/${memberId}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("공유 링크가 복사되었습니다.");
        })
        .catch(() => {});
    }
  };
  const { id } = useParams();

  const { data, isLoading, isSuccess, isError } = useQuery(
    ["userInfo", id],
    () => getUserInfo(id ? id : ""),
    {
      onSuccess: (res) => setLike(res.likeCount),
      refetchOnWindowFocus: false,
    }
  );

  const { data: bookmarkData } = useQuery(
    ["userBookmarkDisk", id],
    () => getBookmarkDiskList(id ? id : ""),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: mutationUserLike, isLoading: mutationIsLoading } =
    useMutation(() => postUserLike(id ? id : ""), {
      onSuccess(res) {
        // queryClient.invalidateQueries(["userInfo"]);
        setLike(res);
      },
    });

  useEffect(() => {
    queryClient.invalidateQueries(["userBookmarkDisk"]);
  }, []);

  return (
    <>
      {!isLoading && isSuccess && data ? (
        <AppLayout>
          <Header
            isMyDisk={data.isMe}
            jc={data.isMe ? "flex-end" : "flex-start"}
            userName={data.nickname}
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
                  {data.isMe && (
                    <StEditBox onClick={() => setOpenProfileModal(true)}>
                      <Edit />
                    </StEditBox>
                  )}

                  <StProfileImage
                    src={data.profileImg ? data.profileImg : DefaultProfile}
                    alt="profile"
                  />
                  <StProfileText color={lightTheme.colors.primary01}>
                    {data.nickname}
                  </StProfileText>
                  <StProfileText color={lightTheme.colors.text02}>
                    {data.interest}
                  </StProfileText>
                  <StProfileText
                    color={
                      isLightTheme
                        ? lightTheme.colors.text01
                        : darkTheme.colors.white
                    }
                  >
                    {data.introduce}
                  </StProfileText>
                  <StVisitLike>
                    <span>방문 {data.visitCount}</span>
                    {data.isMe && (
                      <>
                        <Like
                          fill={
                            isLightTheme
                              ? lightTheme.colors.text02
                              : darkTheme.colors.text02
                          }
                        />
                        <span>좋아요 {like}</span>
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
                        isLightTheme
                          ? darkTheme.colors.bg
                          : lightTheme.colors.white
                      }
                    >
                      대표 디스크
                    </StDiskText>
                    {data.isMe ? (
                      <Plus
                        onClick={() =>
                          navigate("/new-disk", { state: "newDisk" })
                        }
                        width="24px"
                        height="24px"
                      />
                    ) : (
                      <StMoreText onClick={() => navigate(`/disk-list/${id}`)}>
                        더보기
                      </StMoreText>
                    )}
                  </StTopBox>

                  {bookmarkData && bookmarkData.diskList.length > 0 ? (
                    <StDiskBoxFlex
                      color={
                        isLightTheme
                          ? darkTheme.colors.bg
                          : lightTheme.colors.white
                      }
                    >
                      {bookmarkData.diskList.map((item: DiskType) => (
                        <StDiskBox
                          onClick={() => {
                            setOpenModal(true);
                            setTargetDisk(item.diskId);
                          }}
                          key={item.diskId}
                        >
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
                {data.isMe ? (
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

                    <div onClick={() => navigate(`/disk-list/${memberId}`)}>
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
                    <Button
                      btnStatus={"primary01"}
                      clickHandler={() => {
                        mutationUserLike();
                      }}
                    >
                      <StButtonText>
                        <Like />
                        <span>{like}</span>
                      </StButtonText>
                    </Button>
                  </StButtonContainer>
                )}
              </StSubContainer>
            </StDotBackground>
          </StContainer>
          {openProfileModal ? (
            <ProfileModal
              data={data}
              setOpen={() => setOpenProfileModal(false)}
            />
          ) : (
            <></>
          )}
          <Guide modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </AppLayout>
      ) : isError ? (
        <NotFound />
      ) : (
        <>로딩중 ...</>
      )}

      {openModal ? (
        <ModalLayout
          width={WINDOW_W < MOBILE_MAX_W ? "358px" : "412px"}
          height="auto"
          bgc="transparent"
        >
          <DiskCard
            data={
              bookmarkData.diskList.find(
                (val: DiskType) => val.diskId === targetDisk
              ) as DiskType
            }
            setOpen={() => setOpenModal(false)}
          />
          <StBtnContainer>
            <Button
              btnStatus="primary02"
              clickHandler={() => setOpenModal(false)}
            >
              <StBtnText>
                <CloseCircle />
                <span>닫기</span>
              </StBtnText>
            </Button>
            {(
              bookmarkData.diskList.find(
                (val: DiskType) => val.diskId === targetDisk
              ) as DiskType
            ).isMine ? (
              <Button
                btnStatus="primary01"
                clickHandler={() => navigate(`/edit-disk/${targetDisk}`)}
              >
                <StBtnText>
                  <Pen fill={lightTheme.colors.white} />
                  <span>편집하기</span>
                </StBtnText>
              </Button>
            ) : (
              <></>
            )}
          </StBtnContainer>
        </ModalLayout>
      ) : (
        <></>
      )}
    </>
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

const StBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(8)};
  margin-top: ${calcRem(16)};
`;

const StBtnText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(8)};

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
  }
`;

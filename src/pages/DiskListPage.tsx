import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import DiskListFeed from "../components/diskList/DiskListFeed";
import DiskListGallery from "../components/diskList/DiskListGallery";
import ToastModal from "../components/elements/ToastModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { getDiskList } from "../api/diskApi";
import { getLoc } from "../utils/localStorage";
import {
  bookmarkToastState,
  createToastState,
  deleteToastState,
  pageState,
} from "../state/atom";
import { DiskListType, DiskType } from "../types/diskTypes";

export interface DiskListProps {
  isMine: boolean;
  data: DiskType[];
}

const DiskListPage = () => {
  const [isMyPage, setIsMyPage] = useState<boolean>(false);

  const [page, setPage] = useRecoilState(pageState);
  const [openCreateToast, setOpenCreateToast] =
    useRecoilState(createToastState);
  const [openBookmarkToast, setOpenBookmarkToast] =
    useRecoilState(bookmarkToastState);
  const [openDeleteToast, setOpenDeleteToast] =
    useRecoilState(deleteToastState);

  const { id: paramsId } = useParams<{ id: string }>();

  useEffect(() => {
    setIsMyPage(paramsId === getLoc("memberId"));
    paramsId === getLoc("memberId")
      ? setPage("diskListGallery")
      : setPage("diskListFeed");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (openCreateToast) setOpenCreateToast(false);
      if (openBookmarkToast)
        setOpenBookmarkToast((prev) => ({ ...prev, open: false }));
      if (openDeleteToast) setOpenDeleteToast(false);
    }, 7000);
  }, [openCreateToast, openBookmarkToast.open, openDeleteToast]);

  const { data, isLoading, isSuccess } = useQuery(
    ["diskList"],
    () => getDiskList(paramsId as string),
    {
      onSuccess: (data: DiskListType) => console.log("DISK LIST >> ", data),
      onError: (err: any) => {
        if (err.response.data.ErrorCode === "NOT_FOUND_MEMBER") {
          window.alert(err.response.data.errorMessage);
          window.location.replace("/member_not_found");
        }
      },
    }
  );

  return (
    <AppLayout>
      {!isLoading && isSuccess ? (
        <>
          <DiskHeader
            param={paramsId as string}
            isMyDisk={data.isMine}
            titleText={
              data.isMine
                ? "전체 디깅디스크"
                : `${data.nickname}님의 디깅디스크`
            }
          />
          {page === "diskListFeed" ? (
            <DiskListFeed isMine={data.isMine} data={data.diskList} />
          ) : (
            <></>
          )}
          {page === "diskListGallery" ? (
            <DiskListGallery isMine={data.isMine} data={data.diskList} />
          ) : (
            <></>
          )}
          {openCreateToast ? (
            <ToastModal>
              <span>디스크 굽기 완료! 대표 디스크로 설정해보세요</span>
            </ToastModal>
          ) : (
            <></>
          )}
          {openBookmarkToast.open ? (
            <ToastModal>
              <span>{openBookmarkToast.text}</span>
            </ToastModal>
          ) : (
            <></>
          )}
          {openDeleteToast ? (
            <ToastModal>
              <span>디스크가 삭제되었어요 🗑</span>
            </ToastModal>
          ) : (
            <></>
          )}
        </>
      ) : (
        <LoadingSpinner text="디스크 불러오는 중" />
      )}
    </AppLayout>
  );
};

export default DiskListPage;

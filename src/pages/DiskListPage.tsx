import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import DiskListFeed from "../components/diskList/DiskListFeed";
import DiskListGallery from "../components/diskList/DiskListGallery";
import ToastModal from "../components/elements/ToastModal";
import { getDiskList } from "../api/diskApi";
import { deleteToastState, pageState } from "../state/atom";
import { DiskListType } from "../types/diskTypes";

const TEST_USER = {
  isMe: true,
  userName: "testUser",
};

export interface DiskListProps {
  data: DiskListType[];
}

const DiskListPage = () => {
  const [page, setPage] = useRecoilState(pageState);
  const [openDeleteToast, setOpenDeleteToast] =
    useRecoilState(deleteToastState);

  const { data, isLoading, isSuccess } = useQuery(["diskList"], getDiskList, {
    onSuccess: (data: DiskListType[]) => console.log("SUCCESS", data),
    onError: (err) => console.log("GET DISK LIST FAIL", err),
    staleTime: Infinity,
  });

  useEffect(() => {
    TEST_USER.isMe ? setPage("diskListGallery") : setPage("diskListFeed");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (openDeleteToast) setOpenDeleteToast(false);
    }, 2000);
  }, [openDeleteToast]);

  return (
    <AppLayout>
      <DiskHeader
        isMyDisk={TEST_USER.isMe}
        titleText={
          TEST_USER.isMe
            ? "전체 디깅디스크"
            : `${TEST_USER.userName}님의 디깅디스크`
        }
      />
      {!isLoading && isSuccess ? (
        <>
          {page === "diskListFeed" ? <DiskListFeed data={data} /> : <></>}
          {page === "diskListGallery" ? <DiskListGallery data={data} /> : <></>}
        </>
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
    </AppLayout>
  );
};

export default DiskListPage;

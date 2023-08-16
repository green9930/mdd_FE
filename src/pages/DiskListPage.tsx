import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import DiskListFeed from "../components/diskList/DiskListFeed";
import DiskListGallery from "../components/diskList/DiskListGallery";
import ToastModal from "../components/elements/ToastModal";
import { getDiskList } from "../api/diskApi";
import { getLoc } from "../utils/localStorage";
import { deleteToastState, pageState } from "../state/atom";
import { DiskType } from "../types/diskTypes";

export interface DiskListProps {
  data: DiskType[];
}

const DiskListPage = () => {
  const [isMyPage, setIsMyPage] = useState<boolean>(false);

  const [page, setPage] = useRecoilState(pageState);
  const [openDeleteToast, setOpenDeleteToast] =
    useRecoilState(deleteToastState);

  const params = useParams();

  const { data, isLoading, isSuccess } = useQuery(["diskList"], getDiskList, {
    onSuccess: (data: DiskType[]) => {
      console.log("SUCCESS", data);
    },
    onError: (err) => console.log("GET DISK LIST FAIL", err),
    staleTime: Infinity,
  });

  useEffect(() => {
    setIsMyPage(params.id === getLoc("memberId"));
    params.id === getLoc("memberId")
      ? setPage("diskListGallery")
      : setPage("diskListFeed");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (openDeleteToast) setOpenDeleteToast(false);
    }, 2000);
  }, [openDeleteToast]);

  return (
    <AppLayout>
      <DiskHeader
        isMyDisk={isMyPage}
        titleText={
          isMyPage ? "전체 디깅디스크" : `${getLoc("nickname")}님의 디깅디스크`
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

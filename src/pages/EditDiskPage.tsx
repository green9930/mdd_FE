import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import EditDisk from "../components/editDisk/EditDisk";
import { pageState } from "../state/atom";
import { useQuery } from "@tanstack/react-query";
import { getDisk } from "../api/diskApi";
import { DiskType } from "../types/diskTypes";

const EditDiskPage = () => {
  const setPageState = useSetRecoilState(pageState);

  const { id: paramsId } = useParams<{ id: string }>();

  useEffect(() => {
    refetch();
  }, []);

  const { data, refetch, isLoading, isSuccess } = useQuery(
    ["diskById"],
    () => getDisk(paramsId as string),
    {
      onSuccess: (data: DiskType) => console.log("SUCCESS", data),
      onError: (err) => console.log("GET DISK LIST FAIL", err),
      enabled: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    setPageState("editDisk");
  }, []);

  return (
    <AppLayout>
      <DiskHeader isMyDisk={true} titleText="디스크 편집하기" />
      {!isLoading && isSuccess ? <EditDisk data={data} /> : <></>}
    </AppLayout>
  );
};

export default EditDiskPage;
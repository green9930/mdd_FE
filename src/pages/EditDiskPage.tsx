import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import EditDisk from "../components/editDisk/EditDisk";
import { getDisk } from "../api/diskApi";
import { pageState } from "../state/atom";

const EditDiskPage = () => {
  const setPage = useSetRecoilState(pageState);

  const { id: paramsId } = useParams<{ id: string }>();

  useEffect(() => {
    setPage("editDisk");
    refetch();
  }, []);

  const { data, refetch, isLoading, isSuccess } = useQuery(
    ["diskById"],
    () => getDisk(paramsId as string),
    {
      // onSuccess: (data: DiskType) => console.log("SUCCESS", data),
      onError: () => window.alert("디스크 정보를 가져오지 못했습니다."),
      enabled: false,
      cacheTime: 0,
    }
  );

  return (
    <AppLayout>
      <DiskHeader isMyDisk={true} titleText="디스크 편집하기" />
      {!isLoading && isSuccess ? <EditDisk data={data} /> : <></>}
    </AppLayout>
  );
};

export default EditDiskPage;

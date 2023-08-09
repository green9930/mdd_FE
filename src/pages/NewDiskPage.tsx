import React from "react";
import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";

const TEST_DATA = {
  isMe: true,
  userName: "testUser",
};

const NewDiskPage = () => {
  return (
    <AppLayout>
      <DiskHeader
        isMyDisk={TEST_DATA.isMe}
        userName={TEST_DATA.userName}
        pageType="newDisk"
      >
        <h1>디스크 생성하기</h1>
      </DiskHeader>
    </AppLayout>
  );
};

export default NewDiskPage;

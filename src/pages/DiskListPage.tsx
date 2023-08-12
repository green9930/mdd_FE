import React, { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import { useRecoilState } from "recoil";
import { pageState } from "../state/atom";
import DiskListFeed from "../components/diskList/DiskListFeed";
import DiskListGallery from "../components/diskList/DiskListGallery";

const TEST_USER = {
  isMe: true,
  userName: "testUser",
};

const TEST_DATA = [
  {
    diskId: 1,
    diskName: "diskName",
    content: "content",
    diskColor: "PINK",
    isPrivate: false,
    image: [
      {
        imageId: 1,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
      {
        imageId: 2,
        imageUrl: "url",
        createdAt: "2023…",
        modifiedAt: "2023…",
      },
    ],
    isMine: true,
    createdAt: "2023-08-03",
    modifiedAt: "2023-08-03",
  },
];

const DiskListPage = () => {
  const [page, setPage] = useRecoilState(pageState);

  useEffect(() => {
    TEST_USER.isMe ? setPage("diskListGallery") : setPage("diskListFeed");
  }, []);

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
      {page === "diskListFeed" ? <DiskListFeed /> : <></>}
      {page === "diskListGallery" ? <DiskListGallery /> : <></>}
    </AppLayout>
  );
};

export default DiskListPage;

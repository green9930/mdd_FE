import React, { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import { useSetRecoilState } from "recoil";
import { pageState } from "../state/atom";
import Settings from "../components/settings/Settings";

const SettingsPage = () => {
  const setDiskPage = useSetRecoilState(pageState);

  useEffect(() => {
    setDiskPage("settings");
  }, []);

  return (
    <AppLayout>
      <DiskHeader isMyDisk={true} titleText="환경설정" />
      <Settings />
    </AppLayout>
  );
};

export default SettingsPage;

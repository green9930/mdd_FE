import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import Settings from "../components/settings/Settings";
import { pageState } from "../state/atom";

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

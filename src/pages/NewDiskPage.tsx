import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import NewDiskCover from "../components/newDisk/NewDiskCover";
import NewDiskContent from "../components/newDisk/NewDiskContent";
import { newDiskStepState, pageState } from "../state/atom";
import { useLocation, useParams } from "react-router-dom";

const TEST_DATA = {
  isMe: false,
  userName: "testUser",
};

const TITLE_LIST = {
  newDiskSignUp1: `디스크 생성 완료! \n디스크 색상과 이름을 정해볼까요?`,
  newDiskSignUp2: "디스크에 나만의 기억을 담아보세요.",
  newDisk1: "디스크의 색상과 이름을 입력해주세요.",
  newDisk2: "디스크에 나만의 기억을 담아보세요.",
};

export interface NewDiskProps {
  titleText: string;
}

const NewDiskPage = () => {
  const [step, setStep] = useRecoilState(newDiskStepState);
  const setPageState = useSetRecoilState(pageState);

  const location = useLocation();

  useEffect(() => {
    setPageState("newDisk");
    location.state === "newDisk"
      ? setStep("newDisk1")
      : setStep("newDiskSignUp1");
  }, []);

  return (
    <AppLayout>
      <DiskHeader
        isMyDisk={TEST_DATA.isMe}
        titleText="디스크 생성하기"
        newDiskContent={step === "newDisk2" || step === "newDiskSignUp2"}
      />
      {step === "newDiskSignUp1" || step === "newDisk1" ? (
        <NewDiskCover titleText={TITLE_LIST[step]} />
      ) : (
        <NewDiskContent titleText={TITLE_LIST[step]} />
      )}
    </AppLayout>
  );
};

export default NewDiskPage;

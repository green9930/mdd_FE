import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import AppLayout from "../components/layout/AppLayout";
import DiskHeader from "../components/layout/DiskHeader";
import NewDiskCover from "../components/newDisk/NewDiskCover";
import NewDiskContent from "../components/newDisk/NewDiskContent";
import { pageState } from "../state/atom";

const TEST_DATA = {
  isMe: false,
  userName: "testUser",
};

export type StepType =
  | "newDiskSignUp1"
  | "newDiskSignUp2"
  | "newDisk1"
  | "newDisk2";

const TITLE_LIST = {
  newDiskSignUp1: `디스크 생성 완료! \n디스크 색상과 이름을 정해볼까요?`,
  newDiskSignUp2: "디스크에 나만의 기억을 담아보세요.",
  newDisk1: "디스크의 색상과 이름을 입력해주세요.",
  newDisk2: "디스크에 나만의 기억을 담아보세요.",
};

const NewDiskPage = () => {
  const [step, setStep] = useState<StepType>("newDisk1");
  const setPageState = useSetRecoilState(pageState);

  useEffect(() => {
    setPageState("newDisk");
  }, []);

  return (
    <AppLayout>
      <DiskHeader isMyDisk={TEST_DATA.isMe} titleText="디스크 생성하기" />
      {step === "newDiskSignUp1" || step === "newDisk1" ? (
        <NewDiskCover
          step={step}
          setStep={setStep}
          titleText={TITLE_LIST[step]}
        />
      ) : (
        <NewDiskContent
          step={step}
          setStep={setStep}
          titleText={TITLE_LIST[step]}
        />
      )}
    </AppLayout>
  );
};

export default NewDiskPage;

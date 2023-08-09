import React, { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import ModalLayout from "../components/layout/ModalLayout";
import { WINDOW_W } from "../styles/theme";
import { useRecoilValue } from "recoil";
import { lightThemeState } from "../state/atom";
import { darkTheme, lightTheme } from "../styles/colors";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import { InputStatusType } from "../types/etcTypes";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<InputStatusType>("default");
  const [value, setValue] = useState("");

  const isLightTheme = useRecoilValue(lightThemeState);

  const navigate = useNavigate();

  // status bar theme-color 변경
  useEffect(() => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", `${lightTheme.colors.primary02}`); // 원하는 색상으로 변경
      return () =>
        themeColorMeta.setAttribute("content", `${lightTheme.colors.bg}`);
    }
  }, []);

  return (
    <AppLayout>
      <Header isMyDisk={true} jc="flex-end" userName="testname"></Header>
      {/* <Header isMyDisk={false} userName="testname"></Header> */}
      <h1>TEST PAGE</h1>
      <button onClick={() => navigate("/")}>GO HOME</button>
      <Input
        labelText="닉네임"
        bottomText="직접 수정할 수 있어요"
        status={status}
        setStatus={setStatus}
        value={value}
        setValue={setValue}
        maxLength={10}
        placeholder="어떤 디깅 메모리를 담은 디스크인가요?"
        jc="flex-start"
        TopChildren={<span>선택사항</span>}
      ></Input>
      <Input
        labelText="닉네임"
        bottomText="직접 수정할 수 있어요"
        status={status}
        setStatus={setStatus}
        value={value}
        setValue={setValue}
        maxLength={10}
        placeholder="비밀번호를 입력해주세요"
        TopChildren={
          <div>
            <span>랜덤 추천</span>ㅁ{/* 주사위 자리 */}
          </div>
        }
      ></Input>
      <Button
        btnStatus="primary02"
        clickHandler={() => {
          if (value.length > 5) {
            setStatus("default");
          } else {
            setStatus("warning");
          }
        }}
      >
        <span>HELLO</span>
      </Button>
      <button onClick={() => setModalOpen(true)}>MODAL</button>
      <StScrollContainer>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
        <span>SCROLL TEST</span>
      </StScrollContainer>
      {modalOpen ? (
        <ModalLayout
          width={`calc(${WINDOW_W}px - 24px)`}
          height="300px"
          bgc={isLightTheme ? lightTheme.colors.bg : darkTheme.colors.bg}
        >
          <StTestModal>
            <div>MODAL TEST</div>
            <button onClick={() => setModalOpen(false)}>CLOSE</button>
          </StTestModal>
        </ModalLayout>
      ) : (
        <></>
      )}
    </AppLayout>
  );
};

export default TestPage;

const StScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  span {
    font-size: 24px;
  }
`;

const StTestModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
`;

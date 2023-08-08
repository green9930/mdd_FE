import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import ModalLayout from "../components/layout/ModalLayout";
import { WINDOW_W } from "../styles/GlobalStyle";
import { useRecoilValue } from "recoil";
import { lightThemeState } from "../state/atom";
import { darkTheme, lightTheme } from "../styles/colors";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";

const TestPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const isLightTheme = useRecoilValue(lightThemeState);

  return (
    <AppLayout>
      <Header isMyDisk={true} jc="flex-end" userName="testname"></Header>
      {/* <Header isMyDisk={false} userName="testname"></Header> */}
      <h1>TEST PAGE</h1>
      <Input labelText="test" type="" value={value} setValue={setValue} />
      <Button buttonText="button" btnStatus="primary02" clickHandler={() => {}}>
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

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import ModalLayout from "./layout/ModalLayout";
import IconConverter from "./settings/IconConverter";
import Button from "./elements/Button";
import { MOBILE_MAX_W, WINDOW_W, calcRem, fontTheme } from "../styles/theme";
import { getLoc, setLoc } from "../utils/localStorage";
import { lightThemeState } from "../state/atom";

import DiskMask3 from "../assets/img/disk_mask_3.png";

export type SettingIconType = "letter" | "heart" | "candles" | "logout";

type SettingsListType = {
  title: string;
  content: string;
  icon: SettingIconType;
};

const SETTINGS_LIST: SettingsListType[] = [
  {
    title: "서비스 평가하기",
    content: "개선해야 할 점이나 좋았던 점이 있으신가요?",
    icon: "letter",
  },
  {
    title: "제작팀 보기",
    content: "열심히 만든 제작팀이 궁금하다면 👀",
    icon: "heart",
  },
  {
    title: "라이트/다크 모드",
    content: "라이트 모드 적용 중이에요",
    icon: "candles",
  },
  {
    title: "로그아웃",
    content: "",
    icon: "logout",
  },
];

const Settings = () => {
  const [openUnregisterModal, setOpenUnregisterModal] = useState(false);
  const [isLightTheme, setIsLightTheme] = useRecoilState(lightThemeState);

  const clickHandler = (name: SettingIconType) => {
    switch (name) {
      case "letter":
        window.open("https://github.com/green9930/mdd_FE");
        return;
      case "heart":
        console.log("제작팀 보기");
        return;
      case "candles":
        setIsLightTheme(!isLightTheme);
        setLoc(
          "theme",
          getLoc("theme") === "lightMode" ? "darkMode" : "lightMode"
        );
        return;
      case "logout":
        console.log("로그아웃");
        return;
      default:
        return;
    }
  };

  const handleUnregister = () => {
    console.log("UNREGISTER");
    setOpenUnregisterModal(false);
  };

  return (
    <StContainer>
      <StList>
        {SETTINGS_LIST.map((val) => {
          const { title, content, icon } = val;
          return (
            <li key={title}>
              <div onClick={() => clickHandler(icon)}>
                {IconConverter(icon)}
                <StTitle>{title}</StTitle>
              </div>
              {content.length ? (
                <StContent>
                  {title === "라이트/다크 모드" && !isLightTheme
                    ? "다크 모드 적용 중이에요"
                    : content}
                </StContent>
              ) : (
                <></>
              )}
            </li>
          );
        })}
      </StList>
      <StUnregister onClick={() => setOpenUnregisterModal(true)}>
        <span>회원탈퇴</span>
      </StUnregister>
      {openUnregisterModal ? (
        <ModalLayout
          width={WINDOW_W < MOBILE_MAX_W ? "358px" : "537px"}
          height="auto"
          bgc="transparent"
        >
          <div>
            <StUnregisterModal>
              <h2>회원탈퇴</h2>
              <img src={DiskMask3} alt="unregister-icon" />
              <span>
                탈퇴시 디스크와 좋아요 등 모든 데이터가 삭제되며 공유된 링크로
                더이상 회원님의 홈을 볼 수 없어요. 그래도 탈퇴하시겠어요?
              </span>
            </StUnregisterModal>
            <StBtnContainer>
              <Button
                btnStatus="unregister"
                clickHandler={() => handleUnregister()}
              >
                <span>탈퇴하기</span>
              </Button>
              <Button
                btnStatus="primary01"
                clickHandler={() => setOpenUnregisterModal(false)}
              >
                <span>다시 생각해보기</span>
              </Button>
            </StBtnContainer>
          </div>
        </ModalLayout>
      ) : (
        <></>
      )}
    </StContainer>
  );
};

export default Settings;

const StContainer = styled.div``;

const StList = styled.ul`
  margin-bottom: ${calcRem(24)};

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${calcRem(4)};
    padding: ${calcRem(24)} ${calcRem(16)};
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary03};

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${calcRem(8)};
      cursor: pointer;

      svg {
        width: ${calcRem(36)};
        height: ${calcRem(36)};
      }
    }
  }
`;

const StTitle = styled.span`
  color: ${({ theme }) => theme.colors.text01};
  line-height: ${fontTheme.display01.lineHeight};
  letter-spacing: ${fontTheme.display01.letterSpacing};
  font-size: ${fontTheme.display01.fontSize};
  font-weight: ${fontTheme.display01.fontWeight};
  font-family: "NanumSquareNeo";
`;

const StContent = styled.span`
  color: ${({ theme }) => theme.colors.text02};
  line-height: ${fontTheme.caption.lineHeight};
  letter-spacing: ${fontTheme.caption.letterSpacing};
  font-size: ${fontTheme.caption.fontSize};
  font-weight: ${fontTheme.caption.fontWeight};
`;

const StUnregister = styled.div`
  padding: 0 ${calcRem(16)};
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary02};
  line-height: ${fontTheme.button.lineHeight};
  letter-spacing: ${fontTheme.button.letterSpacing};
  font-size: ${fontTheme.button.fontSize};
  font-weight: ${fontTheme.button.fontWeight};
  cursor: pointer;
`;

const StUnregisterModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(16)};
  padding: ${calcRem(24)} ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  border-radius: ${calcRem(12)};

  h2 {
    color: ${({ theme }) => theme.colors.text01};
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
    font-family: "NanumSquareNeo";
  }

  span {
    text-align: center;
    word-break: keep-all;
    color: ${({ theme }) => theme.colors.text01};
    line-height: ${fontTheme.body01.lineHeight};
    letter-spacing: ${fontTheme.body01.letterSpacing};
    font-size: ${fontTheme.body01.fontSize};
    font-weight: ${fontTheme.body01.fontWeight};
  }

  img {
    width: ${calcRem(68)};
    height: ${calcRem(68)};
  }
`;

const StBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(8)};
  margin-top: ${calcRem(16)};
`;

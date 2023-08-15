import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import ModalLayout from "../layout/ModalLayout";
import Input from "../elements/Input";
import Textarea from "../elements/Textarea";
import Button from "../elements/Button";
import { patchMyInfo } from "../../api/memberApi";
import { MemberType } from "../../types/memberTypes";
import { InputStatusType } from "../../types/etcTypes";
import {
  INTEREST_MAX_LENGTH,
  INTRODUCE_MAX_LENGTH,
  NICKNAME_MAX_LENGTH,
} from "../../utils/validations";
import { MOBILE_MAX_W, WINDOW_W, calcRem, fontTheme } from "../../styles/theme";
import { lightTheme } from "../../styles/colors";

import DefaultProfile from "../../assets/img/default_profile.png";
import { ReactComponent as GalleryAddOutline } from "../../assets/svg/gallery_add_outline.svg";
import { ReactComponent as CloseCircle } from "../../assets/svg/close_circle.svg";
import { ReactComponent as Save } from "../../assets/svg/save.svg";

interface ProfileModalProps {
  data: MemberType;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const ProfileModal = ({ data, setOpen }: ProfileModalProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [updated, setUpdated] = useState<boolean>(false);
  const [file, setFile] = useState<File[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameStatus, setNicknameStatus] =
    useState<InputStatusType>("default");
  const [nicknameAlert, setNicknameAlert] = useState<string>("");
  const [interest, setInterest] = useState<string>("");
  const [interestStatus, setInterestStatus] =
    useState<InputStatusType>("default");
  const [introduce, setIntroduce] = useState<string>("");
  const [introduceStatus, setIntroduceStatus] =
    useState<InputStatusType>("default");

  const queryClient = useQueryClient();

  useEffect(() => {
    setPreview(data.profileImg);
    setNickname(data.nickname);
    setInterest(data.interest);
    setIntroduce(data.introduce);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && nickname.length === 0) {
      setNicknameStatus("warning");
      setNicknameAlert("한 글자 이상 입력해 주세요.");
    }
  }, [nickname]);

  useEffect(() => {
    if (!loading && nickname.length > 0) {
      setUpdated(
        data.profileImg !== preview ||
          data.nickname !== nickname ||
          data.interest !== interest ||
          data.introduce !== introduce
      );
    } else {
      setUpdated(false);
    }
  }, [loading, preview, nickname, interest, introduce]);

  const { mutate: updateMyInfo } = useMutation(patchMyInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["myInfo"]);
      setOpen(false);
    },
    onError: (err) => console.log("FAILED", err),
  });

  const handleAddImg = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target.files;
    if (target && target.length) {
      const newFiles: File[] = Array.from(target);
      setFile(newFiles);

      const reader = new FileReader();
      reader.readAsDataURL(newFiles[0]);
      reader.onload = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
      };
    }
  };

  const handleDeleteImg = () => {
    setPreview("");
    setFile([]);
  };

  const handleUpdate = async () => {
    const frm = new FormData();
    const newData = {
      nickname,
      interest,
      introduce,
      isDefault: preview ? false : true,
    };

    if (preview) frm.append("file", file[0]);

    frm.append(
      "data",
      new Blob([JSON.stringify(newData)], {
        type: "application/json",
      })
    );
    updateMyInfo(frm);
  };

  return (
    <ModalLayout
      width={WINDOW_W < MOBILE_MAX_W ? "358px" : "412px"}
      height="auto"
      bgc="transparent"
    >
      <StContainer>
        <h2>프로필 편집</h2>
        <StProfileContainer>
          <StProfileImg>
            <img src={preview ? preview : DefaultProfile} alt="profile-img" />
          </StProfileImg>
          <StProfileAddBtn>
            <GalleryAddOutline
              fill={lightTheme.colors.bg}
              stroke={lightTheme.colors.bg}
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleAddImg}
            />
          </StProfileAddBtn>
        </StProfileContainer>
        {preview ? (
          <StDefaultBtn onClick={() => handleDeleteImg()}>
            <span>기본 이미지로 변경하기</span>
          </StDefaultBtn>
        ) : (
          <></>
        )}
        <Input
          labelText="닉네임"
          bottomText={nicknameAlert}
          value={nickname}
          setValue={setNickname}
          status={nicknameStatus}
          setStatus={setNicknameStatus}
          maxLength={NICKNAME_MAX_LENGTH}
          placeholder=""
          jc="flex-start"
          TopChildren={<StOptionText>필수사항</StOptionText>}
        />
        <Input
          labelText="요즘 열심히 파고있는 관심사는? 🤔"
          value={interest}
          setValue={setInterest}
          status={interestStatus}
          setStatus={setInterestStatus}
          maxLength={INTEREST_MAX_LENGTH}
          placeholder="무엇에 몰입하고 있나요?"
          jc="flex-start"
          TopChildren={<StOptionText>선택사항</StOptionText>}
        />
        <Textarea
          labelText="나를 한 줄로 표현해봐요 💬"
          value={introduce}
          setValue={setIntroduce}
          status={introduceStatus}
          setStatus={setIntroduceStatus}
          maxLength={INTRODUCE_MAX_LENGTH}
          placeholder="할 말이 없다면 MBTI 소개는 어때요?...ㅋㅋ"
          jc={"flex-start"}
          TopChildren={<StOptionText>선택사항</StOptionText>}
          isMultiLine={false}
        />
      </StContainer>
      <StBtnContainer>
        <Button btnStatus="primary02" clickHandler={() => setOpen(false)}>
          <StBtnText>
            <CloseCircle />
            <span>닫기</span>
          </StBtnText>
        </Button>
        <Button
          btnStatus={updated ? "primary01" : "disabled"}
          disabled={!updated}
          clickHandler={() => handleUpdate()}
        >
          <StBtnText>
            <Save
              fill={
                updated ? lightTheme.colors.white : lightTheme.colors.primary02
              }
            />
            <span>저장하기</span>
          </StBtnText>
        </Button>
      </StBtnContainer>
    </ModalLayout>
  );
};

export default ProfileModal;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${calcRem(16)};
  width: 100%;
  height: 100%;
  padding: ${calcRem(24)} ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.bg};
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  border-radius: ${calcRem(12)};

  h2 {
    line-height: ${fontTheme.display01.lineHeight};
    letter-spacing: ${fontTheme.display01.letterSpacing};
    font-size: ${fontTheme.display01.fontSize};
    font-weight: ${fontTheme.display01.fontWeight};
    font-family: "NanumSquareNeo";
  }
`;

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${calcRem(88)};
  height: ${calcRem(88)};
  position: relative;
`;

const StProfileImg = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.primary01};
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const StProfileAddBtn = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${calcRem(8)};
  border-radius: ${calcRem(12)};
  background-color: ${({ theme }) => theme.colors.primary01};
  position: absolute;
  right: -16px;
  bottom: -2px;
  z-index: 11;

  input {
    display: none;
  }

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
  }
`;

const StDefaultBtn = styled.button`
  span {
    color: ${({ theme }) => theme.colors.primary01};
    line-height: ${fontTheme.button.lineHeight};
    letter-spacing: ${fontTheme.button.letterSpacing};
    font-size: ${calcRem(14)};
    font-weight: ${fontTheme.button.fontWeight};
    text-decoration: underline;
  }
`;

const StOptionText = styled.span`
  color: ${({ theme }) => theme.colors.text02};
  line-height: ${fontTheme.body02.lineHeight};
  letter-spacing: ${fontTheme.body02.letterSpacing};
  font-size: ${fontTheme.body02.fontSize};
  font-weight: ${fontTheme.body02.fontWeight};
`;

const StBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${calcRem(8)};
  margin-top: ${calcRem(16)};
`;

const StBtnText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${calcRem(8)};

  svg {
    width: ${calcRem(24)};
    height: ${calcRem(24)};
  }
`;

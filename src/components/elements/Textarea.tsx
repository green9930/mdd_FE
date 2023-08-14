import React, { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";

import { InputStatusType } from "../../types/etcTypes";
import { MOBILE_MAX_W, calcRem, fontTheme } from "../../styles/theme";

interface TextareaProps {
  labelText: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  status: InputStatusType;
  setStatus: React.Dispatch<React.SetStateAction<InputStatusType>>;
  maxLength?: number;
  maxLengthView?: boolean;
  placeholder: string;
  jc?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
  TopChildren?: React.ReactNode;
}

const Textarea = ({
  labelText,
  value,
  setValue,
  status,
  setStatus,
  maxLength,
  maxLengthView = true,
  placeholder,
  jc = "flex-start",
  TopChildren,
}: TextareaProps) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.substring(0, maxLength);
    setValue(text);

    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height =
        contentRef.current.scrollHeight > 284
          ? "284px"
          : `${contentRef.current.scrollHeight}px`;
    }
  };

  return (
    <StContainer>
      <StFlex jc={jc}>
        <label>{labelText}</label>
        {TopChildren}
      </StFlex>
      <StTextareaContainer contentStatus={status}>
        <textarea
          ref={contentRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleTextarea(e)}
          onFocus={() => setStatus("focused")}
          onBlur={() => setStatus("default")}
          maxLength={maxLength}
          rows={1}
        />
        {value.length && maxLengthView ? (
          <StTextLength>
            {value.length}/{maxLength}
          </StTextLength>
        ) : (
          <></>
        )}
      </StTextareaContainer>
    </StContainer>
  );
};

export default Textarea;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calcRem(4)};
  width: 100%;
  padding: ${calcRem(24)} ${calcRem(32)} ${calcRem(60)};

  @media screen and (max-width: ${MOBILE_MAX_W}px) {
    padding: ${calcRem(24)} ${calcRem(0)} ${calcRem(24)};
  }
`;

const StFlex = styled.div<{ jc: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ jc }) => jc};
  gap: ${calcRem(4)};

  label {
    color: ${({ theme }) => theme.colors.text01};
    line-height: ${fontTheme.subtitle02.lineHeight};
    letter-spacing: ${fontTheme.subtitle02.letterSpacing};
    font-size: ${fontTheme.subtitle02.fontSize};
    font-weight: ${fontTheme.subtitle02.fontWeight};
  }
`;

const StTextareaContainer = styled.div<{ contentStatus: InputStatusType }>`
  display: flex;
  align-items: center;
  gap: ${calcRem(12)};
  width: 100%;
  padding: ${calcRem(12)} ${calcRem(12)} ${calcRem(12)} ${calcRem(16)};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid;
  border-color: ${({ theme, contentStatus }) => {
    switch (contentStatus) {
      case "default":
        return theme.colors.primary03;
      case "warning":
        return theme.colors.error;
      case "focused":
        return theme.colors.primary01;
      default:
        return;
    }
  }};
  border-radius: ${calcRem(4)};

  textarea {
    flex-grow: 1;
    background-color: ${({ theme }) => theme.colors.white};
    border: none;
    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.colors.text02};
    }
  }
`;

const StTextLength = styled.div`
  color: ${({ theme }) => theme.colors.text02};
  line-height: ${fontTheme.body02.lineHeight};
  letter-spacing: ${fontTheme.body02.letterSpacing};
  font-size: ${fontTheme.body02.fontSize};
  font-weight: ${fontTheme.body02.fontWeight};
`;

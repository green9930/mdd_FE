import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { InputStatusType } from "../../types/etcTypes";
import { calcRem } from "../../styles/theme";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string;
  labelText: string;
  bottomText?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  status: InputStatusType;
  setStatus: React.Dispatch<React.SetStateAction<InputStatusType>>;
  maxLength?: number;
  placeholder: string;
  jc?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
  TopChildren?: React.ReactNode;
}

const Input = ({
  type = "text",
  labelText,
  bottomText,
  status,
  setStatus,
  value,
  setValue,
  maxLength = 0,
  placeholder,
  jc = "space-between",
  TopChildren,
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.substring(0, maxLength));
  };

  return (
    <StContainer inputStatus={status}>
      <StFlex jc={jc}>
        <label htmlFor="input-element">{labelText}</label>
        {TopChildren}
      </StFlex>
      <StInputContainer id="input-element" inputStatus={status}>
        <StInput
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => handleChange(e)}
          onFocus={() => setStatus("focused")}
          onBlur={() => setStatus("default")}
          maxLength={maxLength}
          inputStatus={status}
        />
        {maxLength && (
          <StTextLength>
            {value.length}/{maxLength}
          </StTextLength>
        )}
      </StInputContainer>
      <StDesc inputStatus={status}>{bottomText}</StDesc>
    </StContainer>
  );
};

export default Input;

const StContainer = styled.div<{ inputStatus: InputStatusType }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${calcRem(4)};

  label {
    color: ${({ theme }) => theme.colors.text01};
    line-height: ${calcRem(24)};
    letter-spacing: 0.1px;
    font-size: ${calcRem(14)};
    font-weight: 700;
  }

  span {
    color: ${({ theme, inputStatus }) => {
      switch (inputStatus) {
        case "warning":
          return theme.colors.error;
        default:
          return theme.colors.text02;
      }
    }};
    line-height: ${calcRem(20)};
    letter-spacing: 0.25px;
    font-size: ${calcRem(14)};
    font-weight: 400;
  }
`;

const StInputContainer = styled.div<{ inputStatus: InputStatusType }>`
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${calcRem(12)} ${calcRem(12)} ${calcRem(12)} ${calcRem(16)};
  gap: ${calcRem(16)};
  border: ${({ inputStatus }) => {
    switch (inputStatus) {
      case "focused":
        return "2px solid";
      default:
        return "1px solid";
    }
  }};
  border-color: ${({ theme, inputStatus }) => {
    switch (inputStatus) {
      case "default":
        return theme.colors.primary03;
      case "warning":
        return theme.colors.error;
      case "focused":
        return theme.colors.primary01;
      default:
        break;
    }
  }};
`;

const StInput = styled.input<{ inputStatus: InputStatusType }>`
  border: none;
  outline: none;
  background-color: transparent;
  box-shadow: none;
  appearance: none;
  width: 100%;

  color: ${({ theme, inputStatus }) => {
    switch (inputStatus) {
      case "default":
        return theme.colors.text01;
      case "warning":
        return theme.colors.error;
      default:
        break;
    }
  }};
  line-height: ${calcRem(20)};
  letter-spacing: 0.25px;
  font-size: ${calcRem(14)};
  font-weight: 400;
  ::placeholder {
    color: ${({ theme }) => theme.colors.text02};
  }
`;

const StDesc = styled.div<{ inputStatus: InputStatusType }>`
  line-height: ${calcRem(16)};
  letter-spacing: 0.24px;
  font-size: ${calcRem(12)};
  font-weight: 400;
  color: ${({ theme, inputStatus }) => {
    switch (inputStatus) {
      case "warning":
        return theme.colors.error;
      default:
        return theme.colors.text02;
    }
  }};
`;

const StFlex = styled.div<{ jc: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ jc }) => jc};
  width: 100%;
  gap: ${calcRem(4)};
`;

const StTextLength = styled.div`
  color: ${({ theme }) => theme.colors.text02};
  line-height: ${calcRem(20)};
  letter-spacing: 0.25px;
  font-size: ${calcRem(14)};
  font-weight: 400;
`;

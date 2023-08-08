import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Eye } from "../../assets/svg/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/svg/eye_slash.svg";
import { InputStatusType } from "../../types/etcTypes";
import { calcRem } from "../../styles/GlobalStyle";

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  labelText: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Input = ({ type, labelText, value, setValue }: InputProps) => {
  const [status, setStatus] = useState<InputStatusType>("default");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <StContainer>
      <label htmlFor="input-element">{labelText}</label>
      <StInput
        id="input-element"
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        onFocus={() => setStatus("focused")}
        onBlur={() => setStatus("default")}
        inputStatus={status}
      />
      <StDesc inputStatus={status}>description test</StDesc>
    </StContainer>
  );
};

export default Input;

const StContainer = styled.div`
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
`;

const StInput = styled.input<{ inputStatus: InputStatusType }>`
  padding: ${calcRem(14)} ${calcRem(14)} ${calcRem(14)} ${calcRem(16)};
  border: 1px solid;
  border-color: ${({ theme, inputStatus }) => {
    switch (inputStatus) {
      case "default":
        return theme.colors.primary03;
      case "warning":
        return theme.colors.primary03;
      case "focused":
        return theme.colors.primary01;
      case "disabled":
        return theme.colors.primary03;
      default:
        break;
    }
  }};
`;

const StDesc = styled.div<{ inputStatus: InputStatusType }>``;

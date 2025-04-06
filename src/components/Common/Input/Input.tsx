import React from "react";
import { StyledInput, StyledIconButton } from "./Input.styles";
import { InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface InputComponentProps {
  value: string;
  onChange: (newValue: string) => void;
  onSend: () => void;
  disabled: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  onSend,
  disabled,
}) => {
  return (
    <StyledInput
      label="Enter your question"
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <StyledIconButton onClick={onSend}>
              <SendIcon />
            </StyledIconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputComponent;

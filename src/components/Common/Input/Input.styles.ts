import { styled } from "@mui/system";
import { TextField, IconButton } from "@mui/material";

export const StyledInput = styled(TextField)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "30px",
    backgroundColor: "white",
    color: "black",
    display: "flex",
    alignItems: "center",
    paddingRight: 0,
    "& input": {
      color: "black",
      fontSize: "18px",
      padding: "14px 15px",
    },
    "& fieldset": {
      borderColor: "#00796b",
    },
    "&:hover fieldset": {
      borderColor: "#00796b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00796b",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "15px",
    color: "#7e7e7e !important",
  },
});

export const StyledIconButton = styled(IconButton)({
  backgroundColor: "#00796b",
  color: "white",
  borderRadius: "30px 30px 30px 30px",
  height: "100%",
  minWidth: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px",
  "&:hover": {
    backgroundColor: "#004d40",
  },
  "& svg": {
    fontSize: "24px",
  },
});

import { styled } from "@mui/system";

export const ChatContainer = styled("div")({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  scrollBehavior: "smooth",
  display: "flex",
  flexDirection: "column",

  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#00796b",
    borderRadius: "10px",
  },
});

export const ChatWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
});

export const InputWrapper = styled("div")({
  padding: "10px 20px",
  backgroundColor: "#fff",
  borderTop: "1px solid #ddd",
  position: "sticky",
  bottom: "0",
  width: "100%",
  boxSizing: "border-box",
});

export const Title = styled("h1")({
  color: "black",
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
});

export const MessageBubble = styled("div")({
  marginBottom: "10px",
  padding: "10px 15px",
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  color: "#333",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  alignSelf: "flex-start",
  animation: "slideIn 0.3s ease-in-out",
  "&:last-child": {
    marginBottom: "0",
  },
  "@keyframes slideIn": {
    "0%": { transform: "translateX(100%)" },
    "100%": { transform: "translateX(0)" },
  },
});
export const CustomBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  maxWidth: "600px",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
});

export const UserMessageBubble = styled(MessageBubble)({
  backgroundColor: "#00796b",
  color: "white",
  alignSelf: "flex-end",
});

const loadingAnimation =
  "@keyframes loadingAnimation { 0% { transform: scale(0); } 50% { transform: scale(1); } 100% { transform: scale(0); } }";

export const LoaderContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
  animation: `${loadingAnimation} 1s infinite ease-in-out`,
});

export const Loader = styled("div")({
  width: "30px",
  height: "30px",
  border: "4px solid #ddd",
  borderTop: "4px solid #00796b",
  borderRadius: "50%",
  animation: "loadingAnimation 1s infinite ease-in-out",
});

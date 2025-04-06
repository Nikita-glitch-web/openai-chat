import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChatContainer,
  MessageBubble,
  UserMessageBubble,
  Title,
  ChatWrapper,
  InputWrapper,
  CustomBox,
} from "./Chat.styles";
import InputComponent from "../Common/Input/Input";

const subjects = {
  uk: [
    "математика",
    "фізика",
    "хімія",
    "біологія",
    "історія",
    "географія",
    "література",
    "англійська мова",
    "мистецтво",
    "музика",
    "інформатика",
  ],
  en: [
    "mathematics",
    "physics",
    "chemistry",
    "biology",
    "history",
    "geography",
    "literature",
    "english language",
    "art",
    "music",
    "informatics",
  ],
};

const detectLanguage = (text: string): "uk" | "en" => {
  return /[a-zA-Z]/.test(text) ? "en" : "uk";
};

const isModificationRequest = (text: string): boolean => {
  const keywords = [
    "коротше",
    "скороти",
    "зменши",
    "стисни",
    "резюмуй",
    "shorter",
    "summarize",
    "розшир",
    "доповни",
    "розгорни",
    "expand",
    "elaborate",
    "more details",
    "спрост",
    "зроби простіше",
    "simplify",
    "easier",
    "перефразуй",
    "rephrase",
    "reword",
    "make it very short",
    "very short",
  ];
  return keywords.some((kw) => text.toLowerCase().includes(kw));
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [previousAnswer, setPreviousAnswer] = useState<string>("");

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { text: inputValue, isUser: true }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const language = detectLanguage(inputValue);
      const currentSubjects = subjects[language];

      const findSubject = (text: string) => {
        return currentSubjects.find((subject) =>
          new RegExp(`\\b${subject}\\b`, "i").test(text)
        );
      };

      const subject = findSubject(inputValue);
      if (!subject) {
        setMessages([
          ...newMessages,
          {
            text: "Не вдалося розпізнати предмет. Будь ласка, спробуйте ще раз.",
            isUser: false,
          },
        ]);
        setLoading(false);
        return;
      }

      const topic = inputValue
        .replace(new RegExp(`\\b${subject}\\b`, "i"), "")
        .trim();
      if (!topic) {
        setMessages([
          ...newMessages,
          {
            text: `Будь ласка, уточніть тему для предмету ${subject}.`,
            isUser: false,
          },
        ]);
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:4444/mistral/ask", {
        params: { subject, topic },
      });

      const aiResponse =
        response.data?.choices?.[0]?.message?.content ||
        "Помилка у відповіді від сервера.";
      setMessages([...newMessages, { text: aiResponse, isUser: false }]);
      setPreviousAnswer(aiResponse);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages,
        { text: "Помилка при отриманні відповіді.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleModifyAnswer = async () => {
    if (!previousAnswer || !inputValue.trim()) return;

    const newMessages = [...messages, { text: inputValue, isUser: true }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const modificationRequest = inputValue
        .toLowerCase()
        .includes("very short")
        ? "make it very short"
        : inputValue;

      const response = await axios.get("http://localhost:4444/mistral/ask", {
        params: {
          subject: "",
          topic: "",
          modificationRequest,
          previousAnswer: previousAnswer,
        },
      });

      const modifiedAnswer =
        response.data?.choices?.[0]?.message?.content ||
        "Помилка при модифікації відповіді.";
      setMessages([...newMessages, { text: modifiedAnswer, isUser: false }]);
      setPreviousAnswer(modifiedAnswer);
    } catch (error) {
      console.error("Error modifying response:", error);
      setMessages([
        ...newMessages,
        { text: "Помилка при модифікації відповіді.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-scroll-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatWrapper>
      <Title>This is my AI assistant</Title>

      <CustomBox>
        <ChatContainer id="chat-scroll-container">
          {messages.map((msg, index) =>
            msg.isUser ? (
              <UserMessageBubble key={index}>{msg.text}</UserMessageBubble>
            ) : (
              <MessageBubble key={index}>{msg.text}</MessageBubble>
            )
          )}
        </ChatContainer>

        <InputWrapper>
          <InputComponent
            value={inputValue}
            onChange={setInputValue}
            onSend={() => {
              if (isModificationRequest(inputValue) && previousAnswer) {
                handleModifyAnswer();
              } else {
                handleSendMessage();
              }
            }}
            disabled={loading}
          />
        </InputWrapper>
      </CustomBox>
    </ChatWrapper>
  );
};

export default ChatComponent;

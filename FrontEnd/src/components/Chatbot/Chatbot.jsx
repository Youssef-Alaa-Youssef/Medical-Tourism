import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import chatbot from "../../images/Chatbot.gif";

const CHATBOT_THEME = {
  background: "#FFFEFC",
  fontFamily: "Roboto",
  headerBgColor: "#72d5cae3",
  headerFontColor: "#000",
  headerFontSize: "15px",
  botBubbleColor: "#C8D7C2",
  botFontColor: "#000",
  userBubbleColor: "#72d5cae3",
  userFontColor: "#000",
};

const CustomChatBotIcon = () => {
  return <img src={chatbot} height={"150px"} alt="ChatBot" />;
};
const ChatBotHelper = () => {
  const steps = [
    {
      id: "1",
      message: "Hello! Welcome to our Medical Tourism Chatbot.",
      trigger: "2",
    },
    {
      id: "2",
      message: "Are you interested in receiving medical treatment abroad?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        {
          value: 1,
          label: "Yes",
          trigger: "3",
        },
        {
          value: 2,
          label: "No",
          trigger: "end",
        },
      ],
    },
    {
      id: "3",
      message:
        "Great! Please tell us which country you are currently located in.",
      trigger: "4",
    },
    {
      id: "4",
      user: true,
      trigger: "5",
    },
    {
      id: "5",
      message: "Thank you! What type of medical treatment are you seeking?",
      trigger: "6",
    },
    {
      id: "6",
      user: true,
      trigger: "7",
    },
    {
      id: "7",
      message: "How soon are you planning to have the medical treatment?",
      trigger: "8",
    },
    {
      id: "8",
      options: [
        {
          value: "urgent",
          label: "Urgent",
          trigger: "9",
        },
        {
          value: "within a month",
          label: "Within a month",
          trigger: "9",
        },
        {
          value: "within six months",
          label: "Within six months",
          trigger: "9",
        },
        {
          value: "more than six months",
          label: "More than six months",
          trigger: "9",
        },
      ],
    },
    {
      id: "9",
      message:
        "Thank you for providing the information. We will get back to you shortly.",
      end: true,
    },
    {
      id: "end",
      message:
        "Thank you for using our Medical Tourism Chatbot. Have a great day!",
      end: true,
    },
  ];

  return (
    <>
      <ThemeProvider theme={CHATBOT_THEME}>
        <ChatBot
          steps={steps}
          floating={true}
          title="Chat with us"
          floatingIcon={<CustomChatBotIcon />}
        />
      </ThemeProvider>
    </>
  );
};

export default ChatBotHelper;
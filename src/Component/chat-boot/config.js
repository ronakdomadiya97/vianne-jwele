import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const config1 = { 
  botName: "LearningBot",
//   initialMessages: [createChatBotMessage("Hi, I'm here to help. What do you want to learn?")],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
}



// import LearningOptions from "./components/LearningOptions/LearningOptions";

const config = {
    initialMessages: [
        createChatBotMessage("Hi, I'm here to help. What do you want to learn?", {
            widget: "learningOptions",
        }),
    ],
    ...config1,
    // widgets: [
    //     {
    //         widgetName: "learningOptions",
    //         widgetFunc: (props) => <LearningOptions {...props} />,
    //     },
    // ],
}
export default config
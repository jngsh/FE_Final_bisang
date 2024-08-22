import { IoLogoOctocat } from "react-icons/io"

const assistantAvatar = <IoLogoOctocat size={30} />

// const userAvatar = "https://docs.nlkit.com/nlux/images/personas/peter.png"

export const personas = {
  assistant: {
    name: "Peter Pet🧚",
    avatar: assistantAvatar,
    tagline: "반려동물 제품에 대해 문의해주세요!",
  },
  user: {
    name: "Marissa",
    avatar: <img src="/assets/images/이도assistant.png"/>
  },
}
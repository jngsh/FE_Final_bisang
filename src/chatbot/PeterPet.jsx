
// src/Chat.js
import { AiChat } from "@nlux/react"
import { personas } from "./personas"
import React, { useState } from "react"
import { RxCross1 } from "react-icons/rx"
import { IoLogoOctocat } from "react-icons/io"
import { useChatAdapter } from "@nlux/langchain-react"

import "@nlux/themes/nova.css"

const adapterOptions = {
  // You can use your own langserve url here.
  url: "https://main-meet-robin.ngrok-free.app/rag/",
}

function Chat() {
  const langServeAdapter = useChatAdapter(adapterOptions)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
      <div
        className="chat-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross1 /> : <IoLogoOctocat size={33} />}
      </div>
      <div style={{ height: "88%" }}>
        {isOpen && (
          <AiChat
            displayOptions={{
              colorScheme: "white",
            }}
            className="w-[100%]"
            adapter={langServeAdapter}
            personaOptions={personas}
            composerOptions={{
              placeholder: "How can I help you today?",
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Chat
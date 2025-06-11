import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import { IMessage } from "../../types/chat";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";

export const Chat: React.FC = () => {
    const { chat } = useContext(ChatContext);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.messages]);

    return (
        <div className="flex flex-col h-full justify-between" data-testid="chat">
            <div className="overflow-y-auto">
                {chat.messages.map((message: IMessage) => (
                    <ChatBubble
                        message={message}
                        key={message.timestamp + (message?.author || "anonymous")}
                    />
                ))}
                <div ref={chatEndRef} />
            </div>
            <ChatInput />
        </div>
    );
};
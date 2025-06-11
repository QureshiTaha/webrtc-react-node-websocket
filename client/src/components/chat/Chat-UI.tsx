import React, { useEffect, useState } from 'react';

export interface IMessage {
    content: string;
    author?: string;
    timestamp: number;
}

interface ChatProps {
    messages: IMessage[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
    const [chats, setChats] = useState<IMessage[]>([])
    useEffect(() => {
        setChats(messages);
    }, [messages])

    const updateMessages = () => {
        const inputElement = document.querySelector('input') as HTMLInputElement;
        const message = inputElement.value;
        const timestamp = Date.now();

        const newMessage: IMessage = {
            content: message,
            author: "author",
            timestamp: timestamp,
        };

        setChats([newMessage,...chats]);
        inputElement.value = '';
    }
    return (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-full p-4 max-h-[300px] overflow-hidden bg-transparent text-white">
            {/* Chat messages container */}
            <div className="flex flex-col-reverse space-y-2 max-h-[250px] overflow-y-auto">
                {chats.map((message, index) => (
                    <div
                        key={index}
                        className="text-gray-900 animate-fade-up"
                        onWheelCapture={(e) => {
                            
                        }}
                        onScroll={() => {

                        }}
                        
                        style={{
                            animationDelay: `${index * 0.5}s`, // Staggered animation effect
                        }}
                    >
                        {/* Message content */}
                        <p>{message.content}</p>
                        {message?.author && (
                            <small className="text-gray-900">{message?.author}</small>
                        )}
                    </div>
                ))}
            </div>

            {/* Chat input and send button */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex items-center p-2 bg-transparent z-50">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-4/5 p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <button className="ml-2 p-2 bg-blue-600 text-white rounded-full" onClick={() => {
                    updateMessages();
                }}>
                    🚀
                </button>
            </div>
        </div>
    );
};

export default Chat;

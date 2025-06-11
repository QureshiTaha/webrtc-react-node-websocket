import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShareScreenButton } from "../components/ShareScreeenButton";
import { ChatButton } from "../components/ChatButton";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../reducers/peerReducer";
import { RoomContext } from "../context/RoomContext";
// import Chat, { IMessage } from "../components/chat/Chat";
import Toolbar from "../components/chat/Toolbar";
import { NameInput } from "../common/Name";
import { ws } from "../ws";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";

export const Room = () => {
    const { id } = useParams();
    const { stream, screenStream, peers, shareScreen, screenSharingId, setRoomId } =
        useContext(RoomContext);
    const { userName, userId } = useContext(UserContext);
    const { toggleChat, chat } = useContext(ChatContext);

    // const [messages, setMessages] = useState<IMessage[]>([
    //     { content: 'Hello, this is the first message!', timestamp: Date.now(), author: 'User1' },
    //     { content: 'Here is another message1!', timestamp: Date.now(), author: 'User2' },
    //     { content: 'Here is another message2!', timestamp: Date.now(), author: 'User2' },
    //     { content: 'Here is another message3!', timestamp: Date.now(), author: 'User2' },
    //     { content: 'Here is another message4!', timestamp: Date.now(), author: 'User2' },
    //     { content: 'What a cool live stream!', timestamp: Date.now(), author: 'User3' },
    //   ]);


    useEffect(() => {
        if (stream) {
            ws.emit("join-room", { roomId: id, peerId: userId, userName });
        } else {
            // redirect to home
        }


    }, [id, userId, stream, userName]);

    useEffect(() => {
        setRoomId(id || "");
    }, [id, setRoomId]);

    const screenSharingVideo =
        screenSharingId === userId
            ? screenStream
            : peers[screenSharingId]?.stream;

    const { [screenSharingId]: sharing, ...peersToShow } = peers;
    return (
        <div className="bg-gray-100 flex justify-center items-center max-w-lg m-auto relative">
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Video Player */}
            <VideoPlayer stream={stream} />

            {/* Chat Section */}
            {/* <Chat messages={messages} /> */}

            {/* Toolbar on the right */}
            <Toolbar />
        </div>
        </div>
    );
};



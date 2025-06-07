import { useSocketContext } from "@/context/SocketContext";
import useConverstion from "@/store/useConversation";
import { Messages } from "@/types/types";
import { useEffect } from "react";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages, messages } = useConverstion();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage: Messages) => {
            setMessages([...messages, newMessage])
        };
        

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);
};

export default useListenMessages;

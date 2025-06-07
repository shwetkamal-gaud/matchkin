import { Conversation, Messages } from '@/types/types';
import { create } from 'zustand';

interface UseConversationProp {
    selectedConversation: Conversation | null;
    setSelectedConverstion: (conversationId: Conversation | null) => void;
    messages: Messages[]; 
    setMessages: (messages: Messages[]) => void;
}

const useConverstion = create<UseConversationProp>((set) => ({
    selectedConversation: null,
    setSelectedConverstion: (selectedConversation: null | Conversation) => set({selectedConversation}),
     messages:[],
    setMessages: (messages: Messages[]) => set({messages})
}))
export default useConverstion
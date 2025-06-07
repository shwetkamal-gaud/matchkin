import getBaseUrl from "@/lib/getBaseUrl";
import useConverstion from "@/store/useConversation"
import { useEffect, useState } from "react"
const baseUrl = getBaseUrl();


const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConverstion()
    useEffect(()=>{
        const getMessages = async() => {
            setLoading(true)
            try {
                const res = await fetch(`${baseUrl}/api/messages/${selectedConversation?._id}`,{credentials:'include'})
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                setMessages(data)
                
            } catch (error) {
                console.error("Error:", error)
            }finally{
                setLoading(false)
            }
        }

        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id, setMessages])

    return {messages, loading}
}

export default useGetMessages
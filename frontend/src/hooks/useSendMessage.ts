import getBaseUrl from "@/lib/getBaseUrl";
import useConverstion from "@/store/useConversation"
import { useState } from "react"
const baseUrl = getBaseUrl();

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { selectedConversation,  messages, setMessages } = useConverstion()
    const sendMessage = async (message: string) => {
        setLoading(true)
        try {
            const res = await fetch(`${baseUrl}/api/messages/send/${selectedConversation?._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({message}),
                credentials:'include'
            })
            const data = await res.json()
            
            if(data.error){
                throw new Error(data.error)
            }
            setMessages([...messages, data])
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }
    return {loading, sendMessage}


}

export default useSendMessage
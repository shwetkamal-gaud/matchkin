import getBaseUrl from "@/lib/getBaseUrl";
import { Conversation } from "@/types/types";
import { useEffect, useState } from "react"
const baseUrl = getBaseUrl();

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversation] = useState<Conversation[]>([])

    useEffect(() => {
        const getConverstion = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${baseUrl}/api/users`, {
                    credentials: "include",
                })
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setConversation(data)
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        }
        getConverstion()
    }, [])

    return { loading, conversations }

}

export default useGetConversation
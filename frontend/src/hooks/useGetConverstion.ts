import { useAuthContext } from "@/context/AuthContext";
import getBaseUrl from "@/lib/getBaseUrl";
import { Conversation } from "@/types/types";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react"
import { toast } from "react-toastify";
const baseUrl = getBaseUrl();

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversation] = useState<Conversation[]>([])
    const { setAuthUser } = useAuthContext()
    const router = useRouter()
    useEffect(() => {
        const getConverstion = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${baseUrl}/api/users`, {
                    credentials: "include",
                })
                if (res.status === 401) {
                    router.push('/login')
                    setAuthUser(null)
                }
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error)
                    throw new Error(data.error)
                }
                setConversation(data)
            } catch (error) {
                toast.error(error?.toString())
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
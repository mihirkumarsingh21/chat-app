import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
         
            try {
                const response = await axios.get("/api/users", {
                    headers: {
                        "Cache-Control": "no-cache", // Prevent caching
                        Pragma: "no-cache",
                    },
                })

                setConversations(response.data)

                console.log(`USERS: ${JSON.stringify(response.data)}`);

            } catch (error) {
                toast.error(error?.message || `ERROR WHILE GETTING ALL USERS`)
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversation();
    }, [])

    return {loading, conversations}

}

export default useGetConversations;
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContex";

// It is logout hook.

const useLogout =  () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext(useContext);

    const logout = async () => {
        setLoading(true);

        await axios.post("/api/auth/logout")
        .then((response) => {
            if(response.error) {
                throw new Error(response.error);
            }

            localStorage.removeItem("auth-user");
           return setAuthUser(null)

        }).catch((error) => {
            console.log(`ERROR WHILE LOGOUT : ${error.message}`);
            return toast.error("Error while logout.")
        }).finally(() => {
             setLoading(false);
        })
    }
    return {logout, loading}
}
export default useLogout;
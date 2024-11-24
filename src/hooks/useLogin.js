import { useState } from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContex";

const useLogin =  () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async ({username, password}) => {

      const success = handleInputsErrors({username, password, });

      if(!success) return;
      setLoading(true);

    await axios.post("/api/auth/login", {
        username,
        password
    }
        
    )
    .then((response) => {
        if(response.data.error) {
            throw new Error(response.data.error)
        }

        // save auth user data in local storage.

        localStorage.setItem("auth-user", JSON.stringify(response.data));

        // updating contex

        setAuthUser(response.data);

        toast.success("Login successful!");

    }).catch((error) => {
        toast.error( error.response?.data?.message || "incorrect credentials")
        
        console.log(`Error while login ${error.message}`);
    }).finally(() => {
        setLoading(false)
    })
    }
    return {loading, login}
}

export default useLogin



function handleInputsErrors({ username, password,  }) {
    if ( !username || !password) {
      toast.error("Please fill all the fields");
      return false;
    }

    // if (password !== confirmpassword) {
    //     toast.error("Password does not match");
    //     return false;
    // }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
  
    return true;
  }
  
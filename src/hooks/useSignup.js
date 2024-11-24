
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../Context/AuthContex";


export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  
  const signUp = async ({ fullname, username, password, confirmpassword, gender }) => {
    const success = handleInputsErrors({ fullname, username, password, confirmpassword, gender });

    console.log("SUCCESS:", success);

    if (!success) return;

    setLoading(true);

   await axios.post("/api/auth/signup", {
  fullname,
  username,
  password,
  confirmpassword,
  gender,
  })
   .then((response) => {
    
    console.log(`RESPONSE : ${JSON.stringify(console.log(response, null, 2))}`); 
    console.log(`RESPONSE DATA : ${JSON.stringify(console.log(response.data, null, 2))}`);   
    // return response.data;
    

    if(response.error) {
      throw new Error(response.error);
    }

    // local storage

    localStorage.setItem("auth-user", JSON.stringify(response.data));

    // context

    setAuthUser(response.data);

   })
   .catch((error) => {
    toast.error(error.response?.data?.message)
    console.log(`ERROR WHILE GETTING DATA : ${error.message}`);
   })
   
   .finally(() => {
    setLoading(true);
   })
   }

   return {signUp, loading};

};



function handleInputsErrors({ fullname, username, password, confirmpassword, gender }) {
  if (!fullname || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Password does not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}






































































































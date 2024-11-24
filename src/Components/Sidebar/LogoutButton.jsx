import { BiLogOut } from "react-icons/bi";
import React from 'react'
import useLogout from "../../hooks/useLogout.js";

const LogoutButton = () => {
  const {logout, loading} = useLogout();

  return (
    <>
        <div className="mt-auto">
          {
            !loading ? (
              <BiLogOut onClick={logout} className="cursor-pointer text-white hover:text-orange-600" size={24} />
            ) : (
              <span className="loading loading-spinner" ></span>
            )
            }
        </div>
    </>
  )
}

export default LogoutButton
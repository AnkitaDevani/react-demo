import React from "react";
import { logoutUser } from "./_data";
import { useGoogleLogout } from 'react-google-login';


 const LogOut = async () => {
    const res = await logoutUser();
     localStorage.setItem("isLogedIn",false);
    localStorage.setItem("token",null);
    localStorage.setItem("email",null);
    window.location.href="/login";
};

export default LogOut;
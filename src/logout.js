import React from "react";
import { logoutUser } from "./_data";
import { useGoogleLogout } from 'react-google-login';


async function LogOut() {
        debugger;
    const res = await logoutUser();
    localStorage.setItem("token",null);
    localStorage.setItem("email",null);


    window.location.href="/login";
};




export default LogOut;
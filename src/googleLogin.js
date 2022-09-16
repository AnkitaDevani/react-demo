import React ,{useEffect, useState} from 'react';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import {addactiveUser} from "./_data";

const LogInGoogle = () => {
    const [isSignIn, setisSignIn] = useState(false);
    const clientId = '391355494928-dqa84reekge0vaph9ojdjdqdfc55jcgi.apps.googleusercontent.com';
    useEffect(() => {
        gapi.load("client:auth2", ()=>{
            gapi.auth2.init({clientId:clientId})
        })
    },[]);

    const responseGoogle = async (res) => {
        console.log(res.profileObj);
        setisSignIn(true);
        if(isSignIn === true) {
            const response = await addactiveUser(res.profileObj, isSignIn);
            console.log(response.data);
            if (response.success === true) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("email", response.data.email);
                window.location.href="/blog";
            } else {
                window.location.href="/login";
            }
        }
    };

    const resFailGoogle = (res) => {
        console.log(res);
    };

    return (
        <div>
            <GoogleLogin clientId={clientId}
                         buttonText="login"
                         onSuccess={responseGoogle}
                         onFailure={resFailGoogle}
                         isSignedIn={true}
                         />
        </div>
    )
};

export default LogInGoogle;
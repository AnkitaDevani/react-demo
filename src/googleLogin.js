import React ,{useEffect, useState} from 'react';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import {addactiveUser} from "./_data";
import jwt_decode from "jwt-decode";

const LogInGoogle = (callback) => {
    const [isSignIn, setisSignIn] = useState(false);
    const clientId = '884778620106-150hi24nmdube87dht92p30bd5ijgqko.apps.googleusercontent.com';


    useEffect(() => {
        gapi.load("client:auth2", ()=>{
            gapi.auth2.init({clientId:clientId})
        });
    },[]);

    const responseGoogle =  async (res) => {
        console.log(res);

            if (res) {
                localStorage.setItem("isLogedIn", true);
                const isLogedIn = localStorage.getItem("isLogedIn");
                if (isLogedIn === "true") {
                    const response = await addactiveUser(res.profileObj, isLogedIn);
                    console.log(response.data);
                    if (response.success === true) {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("email", response.data.email);
                        window.location.href = "/blog";
                    } else {
                        window.location.href = "/login";
                    }
                }
            } else {
                setisSignIn(false);
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

                         />
        </div>
    )
};

export default LogInGoogle;
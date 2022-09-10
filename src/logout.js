import React from "react";
import {getSubjectList, loginUser, logoutUser} from "../_data";

class Logout extends React.Component{
    constructor(){
        super(props);
    }

    async componentDidMount(e) {
        const res = await logoutUser();
        console.log(res.data)
        localStorage.setItem("token",null);
        localStorage.setItem("email",null);
        this.props.history.push({
            pathname:`/login`,
        });
    }
}

export default Logout;
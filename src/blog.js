import React, {Fragment} from "react";
import {FormControl, FormGroup, TableCell} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Layout from "./layout";
import FormData from 'form-data';
import config from "./url";
import {allUsers, deleteUser, getSubjectList, loginUser, uploadProfile, getSelectedSub, logoutUser} from "./_data";
import { GoogleLogout } from 'react-google-login';

class Blog extends React.Component{
    constructor(){
        super();
        this.state = {
            fname:"",
            lname:"",
            hobbies:[],
            email:"",
            password:"",
            course:"",
            gender:"",
            hobbiesList : [{name: 'Reading', isChecked: false},
                {name: 'Travelling', isChecked: false},
                {name: 'Dancing', isChecked: false}],
            courseList: [],
            editableId:"",
            records:[],
            profile:"",
            viewProfile:"",
            isLogined: false,
        }
    }

   async componentDidMount(e) {
        const token = localStorage.getItem("token");
       const email = localStorage.getItem("email");
        //const splittedRute = path.split("/")[2];
        const subjectList = await getSubjectList();
       const response = await loginUser();
        if(token !== "null" && email === response.data.email) {
            localStorage.setItem("role",response.data.role);
            this.setState({
                records: response.data,
                courseList: subjectList.data,
            },() =>  this.userDetail(response.data));

        }else {
            window.location.href="/login";
        }
    }

    userDetail = async (findUser) => {
        debugger
        const {courseList} = this.state;
        const course = courseList.find(ele => ele._id === findUser.course);
        this.setState({
            fname: findUser.fname,
            lname: findUser.lname,
            hobbies:findUser.hobbies,
            course: course.subject,
            email: findUser.email ,
            password:findUser.password,
            gender:findUser.gender,
            editableId: findUser._id,
            viewProfile: findUser.profile
        });
    };

    profile= (e) => {
        this.setState({
            profile: e.target.files[0]
        },() => this.handleProfile())
    };

    handleProfile = async () => {
        const token = localStorage.getItem("token");
        if (!this.state.profile) return;
        const formData = new FormData();
        formData.append(
            "profilePic",
            this.state.profile,
        );
        const data = formData;
        debugger
        const profilePic= await uploadProfile(data);
        this.setState({
            viewProfile:profilePic.data.profile,
            profile: ""
        });
    };

    onEdit = (editUser) => {
        console.log(this.state.records);
        let logEmail = localStorage.getItem("email");
        if(editUser.email === logEmail ) {
            this.props.history.push({
                pathname: `/register/${editUser._id}`,
                // pathname: `form?id=${editUser.userId}&fname=${editUser.fname}&lname=${editUser.lname}`,
                //search: '?id=${editUser.userId}&fname=${editUser.fname}',
                state: {name: editUser.fname, id: editUser.userId}
            })
        }else {
            console.log("user not login");
        }
    };

    onDelete = async (ele) => {
        const responce = await deleteUser(ele._id);
        this.setState({
            records: []
        });
        localStorage.setItem("email",null);
        localStorage.setItem("token",null);
        this.props.history.push({
            pathname: `/register`,
        });

    };

    changePass = (ele) => {
        console.log(ele);
        this.props.history.push({
            pathname: `/changepass`,
        })
    };
    logout = async (response) => {
        this.setState({
            isLogined: false,
        } ,async () =>   await logoutUser());

        localStorage.setItem("token",null);
        localStorage.setItem("email",null);
        window.location.href="/login";
    };

    handleLogoutFailure = (response) => {
        alert('Failed to log out');
    };

    render() {
        const {fname, lname, course, hobbies,gender, email, password,records ,editableId,viewProfile} = this.state;
        const name = Array.from(fname)[0];
        const clientId = '391355494928-dqa84reekge0vaph9ojdjdqdfc55jcgi.apps.googleusercontent.com';

        return (
            <div>
                <Layout/>
                <div className="profile">
                    <div>
                        <label htmlFor="profilePhoto">
                            <input style={{display:'none'}} accept="image/*" id="profilePhoto"  type="file" onChange={this.profile}/>
                            <Avatar style={{fontSize:'120px',width:'120px',height:'120px',cursor:'pointer',margin:'auto'}}
                                    src={`http://localhost:8080/${viewProfile}`}>{name}</Avatar>
                        </label>
                    </div>
                    <h1>{fname} {lname}</h1>
                    <h3>My Hobbies {hobbies.toString()} </h3>
                    <h3>I have knowledge  in {course}</h3>
                    <Button variant="contained" color="primary" id={records._id} onClick={()=>this.onEdit(records)}
                            style={{marginRight:'20px'}}>Edit</Button>
                    <Button variant="contained"  id={records._id} color="secondary" onClick={()=>this.onDelete(records)}
                            style={{marginRight:'20px'}}>Delete</Button>
                    <Button variant="contained"  id={records._id} color="secondary" onClick={()=>this.changePass(records.password)}>Change Password</Button>
                    <GoogleLogout
                        clientId={ clientId }
                        buttonText='Logout'
                        onLogoutSuccess={ this.logout }
                        onFailure={ this.handleLogoutFailure }
                    >
                    </GoogleLogout>
                </div>
            </div>
        );
    }


}

export default Blog;
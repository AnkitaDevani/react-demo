import React, {Fragment} from "react";
import {FormControl, FormGroup, TableCell} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Layout from "./layout";
import FormData from 'form-data';

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
            courseList: [{name: 'Computer'},{name: 'Maths'},{name: 'Science'}],
            editableId:"",
            records:[],
            profile:"",
            viewProfile:"",
        }
    }

    componentDidMount(e) {
        const token = localStorage.getItem("token");
        //const splittedRute = path.split("/")[2];
        if(token !== "null") {
            axios({
                method: 'get',
                url: 'http://localhost:8080/api/getLoggedInUser',
                headers: {"Authorization": `Bearer ${token}`},
            }).then(res => {
                this.userDetail(res.data);
                localStorage.setItem("role",res.data.role);
                if(res.data.role === "admin"){
                    axios({
                        method: 'get',
                        url: 'http://localhost:8080/api/users',
                    }).then(responce => {
                        this.setState({
                            records: res.data,
                        });
                    }).catch(err => {
                        console.log("Submit form:- ",err);
                    });
                }else {
                    this.setState({
                        records: res.data,
                    });
                }
            }).catch(err => {
                console.log("Submit form:- ", err);
            });
        }else {
            this.props.history.push({
                pathname:`/login`,
            });
        }
    }

    userDetail = (findUser) => {
        this.setState({
            fname: findUser.fname,
            lname: findUser.lname,
            hobbies:findUser.hobbies,
            course: findUser.course,
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

    handleProfile = () => {
        const token = localStorage.getItem("token");
        if (!this.state.profile) return;
        const formData = new FormData();
        formData.append(
            "profilePic",
            this.state.profile,
        );
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/uploadProfilePic',
            headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then(res => {
            this.setState({
                viewProfile:res.data.profile,
                profile: ""
            });
            console.log(res.data);
        }).catch(err => {
            console.log("Submit form:- ", err);
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

    onDelete = (ele) => {
        const token = localStorage.getItem("token");
        axios({
            method: 'delete',
            url: 'http://localhost:8080/api/delete/'+ ele._id,
            headers: {"Authorization" : `Bearer ${token}`},
        }).then(res => {
            this.setState({
                records: []
            });
            localStorage.setItem("email",null);
            localStorage.setItem("token",null);
            this.props.history.push({
                pathname: `/register`,
            })
        }).catch(err => {
            console.log("Submit form:- ", err.response.data.message);
        });
    };

    changePass = (ele) => {
        console.log(ele)
        this.props.history.push({
            pathname: `/changepass`,
        })
    };



    render() {
        const {fname, lname, course, hobbies,gender, email, password,records ,editableId,viewProfile} = this.state;
        const name = Array.from(fname)[0];
        return (
            <div>
                <Layout/>
                <div className="profile">
                    <div className="picture">
                        <label htmlFor="profilePhoto">
                            <input style={{display:'none'}} accept="image/*" id="profilePhoto"  type="file" onChange={this.profile}/>
                            <Avatar style={{fontSize:'150px',width:'120px',height:'120px',cursor:'pointer',margin:'auto',alignItems:"end",}}
                                    src={`http://localhost:8080/${viewProfile}`}>{name}</Avatar>

                        </label>
                    </div>
                    <h1 style={{fontSize:'30px',textTransform: 'capitalize'}}>{fname} {lname}</h1>
                    <h3>My Hobbies {hobbies.toString()} </h3>
                    <h3>I have knowledge  in {course}</h3>
                    <Button variant="contained" color="primary" id={records._id} onClick={()=>this.onEdit(records)}
                            style={{marginRight:'20px'}}>Edit</Button>
                    <Button variant="contained"  id={records._id} color="secondary" onClick={()=>this.onDelete(records)}
                            style={{marginRight:'20px'}}>Delete</Button>
                    <Button variant="contained"  id={records._id} color="secondary" onClick={()=>this.changePass(records.password)}>Change Password</Button>


                </div>
            </div>
        );
    }


}

export default Blog;
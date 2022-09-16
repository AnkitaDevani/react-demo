import React from "react";
import axios from "axios";
import './styles.scss';
import { connect } from "react-redux";
import { addTodo,delTodo,updateTodo } from "./redux/actions";
//import record from "./redux/reducer/sample";
import Button from '@material-ui/core/Button';
import { FormGroup, FormLabel, FormControl , Checkbox,TextField
    ,Select,MenuItem,InputLabel,FormControlLabel,Radio ,Input} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import google from './google.png';
import { GoogleLogin } from '@react-oauth/google';
import {getSubjectList, userRegistration, updatedUser, loginUser, allUsers} from "./_data";
import logo from "./ds_logo.png";
import { Link } from "react-router-dom";
import BaseUrl from"./url";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LogInGoogle from "./googleLogin";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
            editableId:null,
            records:[],
            profile:"",
            showPassword: false,
            clientId:'792001607492-oqn73lna6lhc8tg4fkc0q1gc4b6po2ir.apps.googleusercontent.com',
        }
    }

    async componentDidMount(e) {

    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    submitForm = async () => {
        const {fname, lname, hobbies, course, gender, email, password, editableId, courseList} = this.state;
        const token = localStorage.getItem("token");
        const selectedCourse = courseList.find(ele => ele.subject === course);
        if (token === "null") {
            const data = {
                "fname": fname.charAt().toUpperCase()+ fname.slice(1).toLowerCase(),
                "lname": lname.charAt().toUpperCase()+ lname.slice(1).toLowerCase(),
                "hobbies": hobbies,
                "email": email,
                "password": password,
                "gender": gender,
                "course": selectedCourse._id,
                "role": "user"
            };
            const registration = await userRegistration(data);
            console.log(registration.data);
            this.clearForm();
            this.props.history.push({
                pathname: `/login`,
            });

        } else {
            const data = {
                "fname": fname.charAt().toUpperCase()+ fname.slice(1).toLowerCase(),
                "lname": lname.charAt().toUpperCase()+ lname.slice(1).toLowerCase(),
                "hobbies": hobbies,
                "email": email,
                "password": password,
                "gender": gender,
                "course": selectedCourse._id,
            };
            this.clearForm();
            const registration = await updatedUser(editableId, data);
            console.log(registration.data);
            this.clearForm();
            this.props.history.push({
                pathname: `/blog`,
            });
        }
    };

    clearForm = () => {
        this.setState({
            userId: "",
            fname: "",
            lname: "",
            email:"",
            password:"",
            hobbies:[],
            course: "",
            gender:"",
            editableId:"",
            profile:"",
        });
    };

    handleCheckChange = (item) => {
        const isChecked = item.target.checked;
        const value = item.target.value;
        this.setState(prevState => ({ hobbiesList: prevState.hobbiesList.map(product => product.name === value ? { ...product, isAdded: isChecked } : product) }));
        if (isChecked)
            this.setState(prevState => ({hobbies: [...prevState.hobbies, value] }));
        else {
            const newAddedProducts = this.state.hobbies.filter(product => product !== value);
            this.setState({ hobbies: newAddedProducts });
        }
    };

    handleRadio = (e) => {
        const { value, checked } = e.target;
        let { gender } = this.state;
        if (value === "male" && checked){
            gender = "Male";
        }else if (value === "female" && checked){
            gender = "Female";
        }else  if (value === "other"  && checked){
            gender = "Other";
        }
        this.setState({
            gender: gender,
        });
    };

    onEdit = (editUser) => {
        const {courseList} = this.state;
        const course = courseList.find(ele => ele._id === editUser.course);
        this.setState({
            fname: editUser.fname,
            lname: editUser.lname,
            age: editUser.age,
            hobbies:editUser.hobbies,
            course: course.subject,
            email: editUser.email ,
            password: editUser.password,
            gender:editUser.gender,
            dob: editUser.dob,
            editableId: editUser._id
        });

    };

    handleClickShowPassword = () => {
        const password = this.state.showPassword === false ? true : false;
        this.setState({
            showPassword: password
        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    responseGoogle = (response) => {
            console.log(response);
    };

     handleGoogle = (result) => {
         console.log(result);
     };

     clientId = () => {
         return this.state.clientId;
     };

    onSubmit =  (data, _this) => {
        console.log(data)
    }

    render() {
        const {fname, lname, course, courseList, hobbiesList, hobbies,gender, email, password,showPassword} = this.state;
        const token = localStorage.getItem("token");



        return (

            <div style={{backgroundColor:'skyblue'}} >
                <div className="container_form">
                    <h1 align='left' >Sign up</h1>
                    <hr align='left' style={{margin:'12.5px',opacity:"0.2"}}/>
                    <FormGroup style={{margin:'6px'}}>
                        <TextField  id="standard-basic" label="Name" style={{margin:'6px' }}/>
                        <TextField  id="standard-basic1" label="Email" style={{margin:'6px' }}/>

                        <FormControl  style={{margin:'6px'}}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input id="standard-basic2" type={showPassword ? 'text' : 'password'}
                                           name="password" value={password} placeholder="Password" onChange={this.handleChange}
                                           disabled={token === "null" ?false:true} variant="outlined"
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword}
                                                               onMouseDown={this.handleMouseDownPassword} disabled={token === "null" ?false:true}>
                                                       {showPassword ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                            />
                        </FormControl>

                        <FormControl style={{margin:'6px'}}>
                            <FormLabel align='left'>
                                <Checkbox color="primary" />I agree with <span style={{color:'skyblue',fontWeight:'bold'}}> Terms </span> and
                                <span style={{color:'skyblue',fontWeight:'bold'}}> Conditions </span></FormLabel>
                        </FormControl>

                        <FormControl style={{width:'340px',margin:'auto',marginTop:'10px'}}>
                                <Button variant="contained" color="primary" onClick={this.submitForm}>{token !== "null" ? "Submit" : "Create Account"} </Button>
                        </FormControl>
                    </FormGroup>
                    <div align='center' style={{marginTop:'10px'}}>
                       {/* <FormControl style={{margin:'auto',marginTop:'10px',width:"300px"}}>
                            <Link to=/<img src={google} className="google"/>Sign up with Google</Link>
                    </FormControl>*/}
                   <LogInGoogle/>
                    </div>
                    <hr style={{margin:'12.5px',opacity:"0.2",marginTop:'20px'}}/>
                    <div align="center">

                        <p  style={{margin:'0',color:'black'}}>Already have an account ?</p>
                        <Link to="/login"   className="link1" >Log in</Link>
                    </div>
                </div>
            </div>
        );
    }
}




export default Form;
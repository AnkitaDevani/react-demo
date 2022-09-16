import React from "react";
import axios from "axios";
import './styles.scss';
import { connect } from "react-redux";
import { addTodo,delTodo,updateTodo } from "./redux/actions";
//import record from "./redux/reducer/sample";
import Button from '@material-ui/core/Button';
import { FormGroup, FormLabel, FormControl , Checkbox,TextField
    ,Select,MenuItem,InputLabel,FormControlLabel,Radio} from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ResGoogle from "./regWithGoogle";
import {getSubjectList, userRegistration, updatedUser, loginUser, allUsers} from "./_data";


class GoogleUser extends React.Component{
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
        }
    }

    async componentDidMount(e) {
        /*const isLoggedIn = localStorage.getItem("token");
        const subjectList = await getSubjectList();
        if(isLoggedIn === "null") {
            this.setState({
                courseList: subjectList.data,
            });
            this.props.history.push({
                pathname: `/register`,
            })
        } else {
            const response = await loginUser();
            if(response.data.role === "admin") {
                const allUser = await allUsers();
                console.log(allUser.data);
                const path = this.props.history.location.pathname;
                const splittedRute = path.split("/")[2] || null;
                const user = allUser.data.find(ele => ele._id === splittedRute);
                this.setState({
                    records: allUser.data,
                    courseList: subjectList.data,
                }, () => this.onEdit(user));
            }else {
                this.state.records.push(response.data);
                this.setState({
                    records: this.state.records,
                    courseList: subjectList.data,
                }, () => this.onEdit(response.data))
            }
        }*/
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
                "password": password,
                "hobbies": hobbies,
                "course": selectedCourse._id,
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

    theme = createTheme({
        palette: {
            primary: green,
        },
    });

    handleClickShowPassword = () => {
        const password = this.state.showPassword === false ? true : false;
        this.setState({
            showPassword: password
        })
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };




    render() {
        const {fname, lname, course, courseList, hobbiesList, hobbies,gender, email, password,showPassword} = this.state;
        const token = localStorage.getItem("token");

        return (

            <div style={{backgroundColor:'skyblue'}} >
                <div className="container">
                    <h1 align='left' >Register</h1>
                    <div>
                        <h1 align='left' >Create your account</h1>
                    </div>
                    <FormGroup>
                        <FormControl  style={{margin:'6px'}}>
                            <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
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

                        <FormLabel style={{margin:'6px' }}>Hobbies :
                            {hobbiesList.map((ele, i) =>
                                <FormLabel key={i}>
                                    <Checkbox   value={ele.name} checked={hobbies.includes(ele.name)}
                                                onChange={this.handleCheckChange}/> {ele.name}</FormLabel>
                            )}
                        </FormLabel>

                        <FormControl variant="outlined" style={{margin:'6px'}}>
                            <InputLabel >Course</InputLabel>
                            <Select label="Course" name="course" value={course} onChange={this.handleChange} >
                                {courseList.map((c,i) =>
                                    <MenuItem key={i} value={c.subject}>{c.subject}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel style={{margin:'6px'}}>Gender :
                                <FormControlLabel value="female" style={{margin:'2px'}}
                                                  control={
                                                      <Radio checked={gender === "Female"} onChange={this.handleRadio} name="gender" value="female"/>} label="Female" />
                                <FormControlLabel value="male" style={{margin:'2px'}}
                                                  control={
                                                      <Radio checked={gender === "Male"} onChange={this.handleRadio} name="gender" value="male"/>} label="Male" />
                                <FormControlLabel value="other"style={{margin:'2px'}}
                                                  control={
                                                      <Radio  checked={gender === "Other"} onChange={this.handleRadio} name="gender" value="other"/>} label="Other" />
                            </FormLabel>
                        </FormControl>

                        <FormControl style={{width:'430px',margin:'auto',marginTop:'10px'}}>
                            <ThemeProvider theme={this.theme}>
                                <Button variant="contained" color="primary" onClick={this.submitForm}>{token !== "null" ? "Submit" : "Create Account"} </Button>
                            </ThemeProvider>
                        </FormControl>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

export default GoogleUser;
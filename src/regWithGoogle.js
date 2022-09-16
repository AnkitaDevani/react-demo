import React ,{useEffect, useState} from 'react';
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script';
import {addactiveUser, getSubjectList, updatedUser, userRegistration} from "./_data";
import jwt_decode from "jwt-decode";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import {
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    Select, ThemeProvider
} from "@material-ui/core";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const ResGoogle = (callback) => {
    const [isSignIn, setisSignIn] = useState('');
    const [open,setopen] = useState(false);
    const [showPassword,setshowPassword] = useState(false);
    const [hobbiesList,setHobbiesList] = useState([{name: 'Reading', isChecked: false},
                                                             {name: 'Travelling', isChecked: false},
                                                             {name: 'Dancing', isChecked: false}]);
    const [courseList,setCourseList] = useState([]);
    const [form , setForm] = useState({
        fname:'',
        lname:'',
        email:'',
        profile:'',
        password:'',
        hobbies:'',
        course:'',
        gender:'',
    });
    const clientId = '884778620106-150hi24nmdube87dht92p30bd5ijgqko.apps.googleusercontent.com';


    useEffect(() => {
        async function check() {
            const subjectList = await getSubjectList();
            console.log(subjectList);
            setCourseList(subjectList.data);
            console.log(courseList);
            gapi.load("client:auth2", () => {
                gapi.auth2.init({clientId: clientId})
            });
        }
    check()
    },[]);

    const handleClose = () => {
        debugger
      setopen(false);
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const responseGoogle =  async (res) => {
        console.log(res);
        setisSignIn(res);
        if(res){
            setForm({...form,fname:res.profileObj.givenName,
                lname:res.profileObj.familyName,
                email:res.profileObj.email,
                profile:res.profileObj.imageUrl});
            setopen(true);
        }else if(open === true){
            setopen(false);
            localStorage.setItem("isLogedIn", true);
            const isLogedIn = localStorage.getItem("isLogedIn");
            const selectedCourse = courseList.find(ele => ele.subject === form.course);
                const data = {
                    "fname": isSignIn.profileObj.givenName,
                    "lname": isSignIn.profileObj.familyName,
                    "hobbies": form.hobbies,
                    "email": isSignIn.profileObj.email,
                    "password": form.password,
                    "gender": form.gender,
                    "course": selectedCourse._id,
                    "profile": isSignIn.profileObj.imageUrl,
                    "role": "user"
                };
            const registration = await userRegistration(data);
            window.location.href = "/login";
        } else {
                window.location.href = "/login";
            }

    };

    const resFailGoogle = (res) => {
        console.log(res);
    };

    const handleClickShowPassword = () => {
        const password = showPassword === false ? true : false;
        setshowPassword(password);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

   const handleCheckChange = (item) => {
        const isChecked = item.target.checked;
        const value = item.target.value;
        const {hobbies} = form;
        setHobbiesList(hobbiesList.map(product => product.name === value ? { ...product, isAdded: isChecked } : product) );
        if (isChecked)
            setForm( prevState => ({...form,hobbies: [...prevState.hobbies, value] }));
        else {
            const newAddedProducts = hobbies.filter(product => product !== value);
            setForm({...form,hobbies:newAddedProducts});
        }
    };

    const handleRadio = (e) => {
        const { value, checked } = e.target;
        let {gender} = form;
        if (value === "male" && checked){
            gender = "Male";
        }else if (value === "female" && checked){
            gender = "Female";
        }else  if (value === "other"  && checked){
            gender = "Other";
        }
        setForm({...form,gender:gender})
    };

    const submitForm = async () => {
        const {hobbies, course, gender,  password} = form;
        const token = localStorage.getItem("token");
            setForm({...form,course,
                gender,
                password,
                hobbies});
           responseGoogle();

    };

    const token = localStorage.getItem("token");

    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title"
                    style={{marginLeft:'10px'}}>
                <DialogTitle style={{ cursor: 'move'}} id="draggable-dialog-title">
                    Alert
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <FormGroup>
                            <FormControl  style={{margin:'6px'}}>
                                <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                                               name="password" value={form.password} placeholder="Password" onChange={handleChange}
                                               disabled={token === "null" ?false:true} variant="outlined"
                                               endAdornment={
                                                   <InputAdornment position="end">
                                                       <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                                                                   onMouseDown={handleMouseDownPassword} disabled={token === "null" ?false:true}>
                                                           {showPassword ? <Visibility /> : <VisibilityOff />}
                                                       </IconButton>
                                                   </InputAdornment>
                                               }
                                />
                            </FormControl>

                            <FormLabel style={{margin:'6px' }}>Hobbies :
                                {hobbiesList.map((ele, i) =>
                                    <FormLabel key={i}>
                                        <Checkbox   value={ele.name} checked={form.hobbies.includes(ele.name)}
                                                    onChange={handleCheckChange}/> {ele.name}</FormLabel>
                                )}
                            </FormLabel>

                            <FormControl variant="outlined" style={{margin:'6px'}}>
                                <InputLabel >Course</InputLabel>
                                <Select label="Course" name="course" value={form.course} onChange={handleChange} >
                                    {courseList.map((c,i) =>
                                        <MenuItem key={i} value={c.subject}>{c.subject}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel style={{margin:'6px'}}>Gender :
                                    <FormControlLabel value="female" style={{margin:'2px'}}
                                                      control={
                                                          <Radio checked={form.gender === "Female"} onChange={handleRadio} name="gender" value="female"/>} label="Female" />
                                    <FormControlLabel value="male" style={{margin:'2px'}}
                                                      control={
                                                          <Radio checked={form.gender === "Male"} onChange={handleRadio} name="gender" value="male"/>} label="Male" />
                                    <FormControlLabel value="other"style={{margin:'2px'}}
                                                      control={
                                                          <Radio  checked={form.gender === "Other"} onChange={handleRadio} name="gender" value="other"/>} label="Other" />
                                </FormLabel>
                            </FormControl>


                        </FormGroup>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <FormControl style={{width:'430px',margin:'auto',marginTop:'10px'}}>
                        <Button variant="contained" color="primary" onClick={submitForm}>{token !== "null" ? "Submit" : "Create Account"} </Button>
                    </FormControl>
                </DialogActions>
            </Dialog>
            <hr />
            <div  style={{margin:'auto',marginTop:'10px'}}>
            <GoogleLogin clientId={clientId}
                         buttonText="login"
                         onSuccess={responseGoogle}
                         onFailure={resFailGoogle}

            />
            </div>
        </div>
    )
};

export default ResGoogle;
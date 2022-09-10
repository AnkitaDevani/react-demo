import React from "react";
import { connect } from "react-redux";
import { FormControl,FormGroup, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import record from "./redux/reducer/sample";
import {Link} from "react-router-dom";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HttpsIcon from '@material-ui/icons/Https';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import config from "./url";
import {addactiveUser} from "./_data";

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

class LogIn extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            showPassword: false,
            records:[],
            open : false,

        }
    }

    componentDidMount(e) {
        const token = localStorage.getItem("token");
        if(token !== "null"){
            this.props.history.push({
                pathname:`/blog`,
            });
            this.clearForm();
        }else {
            this.props.history.push({
                pathname:`/login`,
            });
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    submitForm = async () => {
        debugger
        const {email, password, records} = this.state;
        const data = {
            "email": email,
            "password": password
        };
        const res = await addactiveUser(data);
        if (res.success === true) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.email);
            this.props.history.push({
                pathname: `/blog`,
            });
            this.clearForm();
        } else {
            this.setState({
                open: true
            });
            this.clearForm();
        }
    };

       /* axios({
            method: 'post',
            url: config.base_url+'loginuser',
            data: {
                "email": email,
                "password": password
            }
        }).then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.email);
            this.props.history.push({
                pathname: `/blog`,
            });
            this.clearForm();
        }).catch(err => {
            console.log("Submit form:- ", err.response.data.message);

        });
    };*/

    clearForm = () => {
        this.setState({
            email:"",
            password:"",
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

    register = () => {
        this.props.history.push({
            pathname: `/register`,
        })
    };

    handleClose = () => {
        this.setState({
            open:false,
        })
    };


    render() {
        const { email, password,showPassword,open } =this.state;

        return(
            <div>

                <div style={{display:'flex', marginTop: '120px',marginBottom: '20px',align:'center',justifyContent: 'center'}}>
                    <div className="container_login">
                        <h1 align='left' style={{margin:'0px 10px',padding:'15px',fontSize:'40px'}}>Login</h1>
                        <h1 align='left' style={{margin:'0px 25px',fontSize:'15px',fontWeight:'lighter'}}>Sign in to your account</h1>
                        <FormGroup style={{margin:'10px' }}>

                            <TextField style={{margin:'10px 15px',color:'darkcyan'}} id="outlined-basic"
                                       name="email" value={email} placeholder="Email"
                                       onChange={this.handleChange} variant="outlined"
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <AccountCircle style={{color:'skyblue'}}/>
                                               </InputAdornment>
                                           ),
                                       }}/>

                            <FormControl  style={{margin:'10px 15px'}}>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <HttpsIcon style={{color:'skyblue'}}/>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>

                            <FormControl style={{display:'flex',flexDirection:'row',marginLeft:'15px',marginTop:'20px'}}>
                                <Button variant="contained" color="primary" onClick={this.submitForm} style={{width:'60px',padding:'0px 50px',fontSize:'18px'}}>Submit</Button>

                                <Dialog open={open} onClose={this.handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title"
                                        style={{marginLeft:'10px'}}>
                                    <DialogTitle style={{ cursor: 'move'}} id="draggable-dialog-title">
                                        Alert
                                    </DialogTitle>

                                    <DialogContent>
                                        <DialogContentText>
                                            Please enter correct email or password
                                        </DialogContentText>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button autoFocus onClick={this.handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={this.handleClose} color="primary">
                                            OK
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <h3 style={{marginLeft:'160px'}}><Link to="/forgotpass" > Forgot Password? </Link></h3>
                            </FormControl>
                        </FormGroup>
                    </div>

                    <div className="container_sign">
                        <h1>Sign up</h1>
                        <p>If you have <br/>not account than <br/>sign up here </p>
                        <Button variant="contained" color="primary" onClick={this.register} >Register Now!</Button>
                    </div>
                </div>
            </div>
        );

    }
}

export default LogIn;
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



class ForgotPass extends React.Component{
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

    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    submitForm = () => {
        const {email} = this.state;
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/mail',
                data: {
                    "email": email,
                }
            }).then(res => {
                console.log(res);
                this.clearForm();
            }).catch(err => {
                console.log("Submit form:- ", err.response.data.message);
                this.setState({
                    open:true
                });
                this.clearForm();
            });
    };

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
            pathname: `/contact`,
        })
    };

    handleClose = () => {
        this.setState({
            open:false,
        })
    }


    render() {
        const { email, password,showPassword,open } =this.state;

        return(
            <div>
                <div className="container_email">
                    <h1 align='left' style={{margin:'0px 10px',padding:'15px',fontSize:'40px'}}>Forgot Password</h1>
                    <h1 align='left' style={{margin:'0px 25px',fontSize:'15px',fontWeight:'lighter'}}>Enter your email address</h1>
                    <FormGroup style={{margin:'10px' }}>

                        <TextField style={{margin:'10px 15px'}} id="outlined-basic"
                                   name="email" value={email} placeholder="Email"
                                   onChange={this.handleChange} variant="outlined"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start">
                                               <AccountCircle style={{color:'skyblue'}}/>
                                           </InputAdornment>
                                       ),
                                   }}/>


                        <FormControl style={{display:'flex',flexDirection:'row',marginLeft:'15px',marginTop:'20px'}}>
                            <Button variant="contained" color="primary" onClick={this.submitForm} style={{width:'60px',padding:'0px 50px',fontSize:'18px'}}>Submit</Button>

                        </FormControl>
                    </FormGroup>
                </div>


            </div>
        );

    }
}

export default ForgotPass;
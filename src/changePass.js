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
import Layout from "./layout";
import config from "./url";
import {changePass} from "./_data";

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

class ChangePass extends React.Component{
    constructor(){
        super();
        this.state={
            showPassword: false,
            records:[],
            open : false,
            password:"",
            newPass:"",
            reenterPass:"",
            openAlert:false

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

    submitForm = async () => {
        debugger
        const {password, reenterPass, newPass} = this.state;
        const token = localStorage.getItem("token");
        if(newPass === reenterPass) {
            const data = {
                "oldPass": password,
                    "password": newPass
            };
            const res = await changePass(data);
            if(res.success === true){
                this.props.history.push({
                    pathname:`/blog`,
                });
                this.clearForm();
            }else {
                this.setState({
                    openAlert:true
                });
            }
        }else{
            this.setState({
                open:true
            });
            this.clearForm();

        }

    };

    clearForm = () => {
        this.setState({
            password:"",
            newPass:"",
            reenterPass:""
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

    handleClose = () => {
        this.setState({
            open:false,
        })
    };

    handleCloseAlert = () => {
        this.setState({
            openAlert:false,
        })
    };


    render() {
        const { email, password,showPassword,open ,newPass,reenterPass,openAlert} =this.state;

        return(
            <div>

                <div className="container_forgot">
                    <h1 align='left'>Change Password</h1>
                    <FormGroup style={{margin:'10px' }}>
                        <FormControl  style={{margin:'10px 15px'}}>
                            <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                                           name="password" value={password} placeholder="Old Password" onChange={this.handleChange}
                                           startAdornment={
                                               <InputAdornment position="start">
                                                   <HttpsIcon style={{color:'skyblue'}}/>
                                               </InputAdornment>
                                           }
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword}
                                                               onMouseDown={this.handleMouseDownPassword}>
                                                       {showPassword ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                            />
                        </FormControl>

                        <FormControl  style={{margin:'10px 15px'}}>
                            <OutlinedInput id="outlined-adornment-password1" type={showPassword ? 'text' : 'password'}
                                           name="newPass" value={newPass} placeholder="New Password" onChange={this.handleChange}
                                           startAdornment={
                                               <InputAdornment position="start">
                                                   <HttpsIcon style={{color:'skyblue'}}/>
                                               </InputAdornment>
                                           }
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword}
                                                               onMouseDown={this.handleMouseDownPassword}>
                                                       {showPassword ? <Visibility /> : <VisibilityOff />}
                                                   </IconButton>
                                               </InputAdornment>
                                           }
                            />
                        </FormControl>

                        <FormControl  style={{margin:'10px 15px'}}>
                            <OutlinedInput id="outlined-adornment-password2" type={showPassword ? 'text' : 'password'}
                                           name="reenterPass" value={reenterPass} placeholder="Re-enter New Password" onChange={this.handleChange}
                                           startAdornment={
                                               <InputAdornment position="start">
                                                   <HttpsIcon style={{color:'skyblue'}}/>
                                               </InputAdornment>
                                           }
                                           endAdornment={
                                               <InputAdornment position="end">
                                                   <IconButton aria-label="toggle password visibility" onClick={this.handleClickShowPassword}
                                                               onMouseDown={this.handleMouseDownPassword}>
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
                                        Please enter correct password
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

                            <Dialog open={openAlert} onClose={this.handleCloseAlert} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title"
                                    style={{marginLeft:'10px'}}>
                                <DialogTitle style={{ cursor: 'move'}} id="draggable-dialog-title">
                                    Alert
                                </DialogTitle>

                                <DialogContent>
                                    <DialogContentText>
                                        Please enter your correct old password
                                    </DialogContentText>
                                </DialogContent>

                                <DialogActions>
                                    <Button autoFocus onClick={this.handleCloseAlert} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleCloseAlert} color="primary">
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </FormControl>
                    </FormGroup>
                </div>


            </div>
        );

    }
}

export default ChangePass;
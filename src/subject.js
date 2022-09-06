import React from "react";
import {
    withRouter,
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { palette } from '@mui/system';
import Stack from '@mui/material/Stack';
import { Table , TableBody,TableCell,TableHead,TableRow,Select,MenuItem,FormControl,FormLabel,InputLabel} from '@material-ui/core';
import axios from "axios";
import Layout from "./layout";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


class Subject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            subject:"",
            subjectList:[],
            open:false,
            alert:false
        }
    }

    componentDidMount() {
        /*const path = this.props.history.location.pathname;
        const splittedRute = path.split("/")[2] || null;*/

        const token = localStorage.getItem('token');

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/getLoggedInUser',
            headers: {"Authorization": `Bearer ${token}`},
        }).then(res => {

            if (res.data.role === "admin") {
                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/users',
                }).then(res => {
                    console.log(res.data);
                    this.setState({
                        records: res.data,
                    });
                }).catch(err => {
                    console.log("Submit form:- ", err);
                });

                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/subjectList',
                }).then(res => {
                    console.log(res.data);
                    this.setState({
                        subjectList: res.data,
                    });
                }).catch(err => {
                    console.log("Submit form:- ", err);
                });
            } else {
                this.props.history.push({
                    pathname: `/blog`,
                })

            }
        })
    }


    handleChange = (e) => {
        this.setState({
            subject:e.target.value
        })
    };

    handleClickOpen = () => {
        this.setState({
            open:true
        })
    };

    handleClose = () => {
        this.setState({
            alert:false,
            open:false,
            subject:""
        })
    };

    handleSub = () => {
        debugger
        const {subject , subjectList} = this.state;
        console.log(subject);
        const list = subjectList.some(ele => ele.subject === subject.charAt().toUpperCase()+ subject.slice(1).toLowerCase());
        if(list === false){
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/subject',
                data: {
                    "subject": subject.charAt().toUpperCase()+ subject.slice(1).toLowerCase()
                }
            }).then(res => {
                subjectList.push(res.data);
                this.setState({
                    subjectList,
                    open:false,
                    subject:""
                });

            }).catch(err => {
                console.log("Submit form:- ",err);
            });

        }else {
            this.setState({
                alert: true,
                subject:""
            });
        }
    };

    onDelete = (ele) => {
        debugger
        axios({
            method: 'delete',
            url: 'http://localhost:8080/api/subdelete/'+ele,
        }).then(res => {
            console.log(res.data);
            const { subjectList } = this.state;
            const delrecords = subjectList.filter(e => e.subject !== res.data.subject);
            this.setState({
                subjectList: delrecords
            });
        }).catch(err => {
            console.log("Submit form:- ", err.response.data.message);
        });

    };

    render() {
        const { perPage,subject,subjectList,totalPages,currentPage, open,alert} = this.state;

        return(
            <div>
                <Layout/>
                <FormControl variant="outlined" style={{marginTop:'110px',marginLeft:'965px',width:'100px',marginBottom:'20px'}}>
                    <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>ADD</Button>
                    <Dialog open={open} onClose={this.handleClose} >
                        <DialogTitle>Subject List</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add New Subject Here
                            </DialogContentText>
                            <TextField style={{width:"500px"}} autoFocus margin="dense" label="Subject" name="subject" value={subject}
                                       onChange={this.handleChange}    type="text" fullWidth variant="standard"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>Cancel</Button>
                            <Button onClick={this.handleSub}>ADD</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={alert} onClose={this.handleClose}>
                        <DialogTitle>Alert</DialogTitle>
                        <DialogContentText style={{width:"500px",marginLeft:'25px'}}>
                            This field already exist
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={this.handleClose}>OK</Button>
                        </DialogActions>
                    </Dialog>
                </FormControl>

                <TableContainer component={Paper} style={{marginTop:'30px',width:'800px',margin:'auto'}}>
                    <Table sx={{ minWidth: 50 }} aria-label="simple table">
                        <TableHead style={{backgroundColor:'paleturquoise',cursor:'pointer'}}>
                            <TableRow>
                                <TableCell align="center">COURSE LIST</TableCell>
                                <TableCell align="center">DELETE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                subjectList.map(ele => (
                                    <TableRow
                                        key={ele.subject}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{ele.subject}</TableCell>

                                        <TableCell align="center">
                                            <Button variant="contained"  id={ele.subject} color="secondary" onClick={()=>this.onDelete(ele.subject)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>
        )
    }
}


export default  Subject;
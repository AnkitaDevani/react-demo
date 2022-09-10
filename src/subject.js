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
import {addSubject, deleteSubject, getSubjectList, loginUser, allUsers} from "./_data";
import record from "./redux/reducer/sample";


class Subject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            subject:"",
            subjectList:[],
            open:false,
            alert:false,
            records:[],
        }
    }

    async componentDidMount(e) {
        /*const path = this.props.history.location.pathname;
        const splittedRute = path.split("/")[2] || null;*/
        const response = await loginUser();
        console.log(response.data);
        const subjectList = await getSubjectList();
        const allUser = await allUsers();
        console.log(subjectList.data);
        this.setState({
            subjectList:subjectList.data,
            records:allUser.data
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

    handleSub = async () => {
        debugger
        const {subject , subjectList} = this.state;
        console.log(subject);
        const list = subjectList.some(ele => ele.subject === subject.charAt().toUpperCase()+ subject.slice(1).toLowerCase());

        if(list === false){
            const data = {
                "subject": subject.charAt().toUpperCase()+ subject.slice(1).toLowerCase()
            };
            const responce = await addSubject(data);
            subjectList.push(responce.data);
            this.setState({
                subjectList,
                open:false,
                subject:""
            });
        }else {
            this.setState({
                alert: true,
                subject:""
            });
        }
    };

    onDelete = async (ele) => {
        debugger
        console.log(this.state.records);
        const userSub = this.state.records.find(e => e.course === ele._id);
        console.log(userSub);
        if(userSub === undefined){
            const res = await deleteSubject(ele.subject);
            console.log(res.data);
            const { subjectList } = this.state;
            const delrecords = subjectList.filter(e => e.subject !== res.data.subject);
            this.setState({
                subjectList: delrecords
            });
        }else {
            this.setState({
                alert: true,
            });
        }

       /* axios({
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
        });*/

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
                                            <Button variant="contained"  id={ele.subject} color="secondary" onClick={()=>this.onDelete(ele)}>Delete</Button>
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
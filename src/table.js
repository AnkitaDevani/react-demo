import React from "react";
import {
    withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { addTodo,delTodo,updateTodo,pageTodo } from "./redux/actions"
import record from "./redux/reducer/sample";
import Button from '@material-ui/core/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { palette } from '@mui/system';
import Stack from '@mui/material/Stack';
import { Table , TableBody,TableCell,TableHead,TableRow,Select,MenuItem,FormControl,FormLabel,InputLabel} from '@material-ui/core';
import axios from "axios";
import Layout from "./layout";

class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fname:"",
            lname:"",
            hobbies:"",
            email:"",
            password:"",
            course:"",
            gender:"",
            records:[],
            editableId:"",
            searchRecords:"",
            perPage: 5,
            totalRow: 0,
            totalPages: 0,
            currentPage: 1,
            displayRecords: [],
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

            if(res.data.role === "admin") {
                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/users',
                }).then(res => {
                    console.log(res.data);
                    this.setState({
                        records: res.data,
                    });
                }).catch(err => {
                    console.log("Submit form:- ",err);
                });
            }else {
                axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/getLoggedInUser',
                    headers: {"Authorization": `Bearer ${token}`},
                }).then(res => {
                    console.log(res.data);
                    this.state.records.push(res.data);
                    this.setState({
                        records:this.state.records,
                    });
                }).catch(err => {
                    console.log("Submit form:- ", err.response.data.message);
                });
            }
        }).catch(err => {
            console.log("Submit form:- ", err);
        });
    }

    onEdit = (editUser) => {
        let logEmail = localStorage.getItem("email");
        if(editUser.email) {
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
        debugger
        let token = localStorage.getItem("token");
        axios({
            method: 'delete',
            url: 'http://localhost:8080/api/delete/'+ ele._id,
            headers: {"Authorization": `Bearer ${token}`},
        }).then(res => {
            const { records } = this. state;
            const delrecords = records.filter(e => e._id !== res.data._id);
            this.setState({
                records: delrecords
            });
        }).catch(err => {
            console.log("Submit form:- ", err.response.data.message);
        });

    };

    onPageChange = (ele) => {
        const currentPage = ele;
        const {perPage,records} = this.state;
        var firstIndex = (currentPage*perPage)-perPage;
        var lastIndex = firstIndex+perPage;
        const displayRecords = records.slice(firstIndex,lastIndex);
        this.setState({
            displayRecords,
            currentPage,
        })
    };


    selectEntry = (e) => {
        const perPage = parseInt(e?.target?.value) || parseInt(this.state.perPage);
        const records =this.state.records;
        const currentPage = 1;
        localStorage.setItem("page",perPage);
        const totalRow = records.length;
        const totalPages = Math.ceil(totalRow/perPage);
        let firstIndex = (currentPage*perPage) - perPage;
        let lastIndex = firstIndex + perPage;
        const displayRecords = records.slice(firstIndex,lastIndex);
        this.setState({
            displayRecords,
            totalRow,
            totalPages,
            perPage,
            currentPage,
        });
    };

    render() {
        const { perPage,displayRecords,records,totalPages,currentPage} = this.state;
        const pageArr = Array.from(Array(totalPages).keys());


        return(
            <div>
                <Layout/>
                <FormControl variant="outlined" style={{marginTop:'110px',marginLeft:'150px',width:'100px',marginBottom:'20px'}}>

                    <InputLabel >Entry</InputLabel>
                    <Select label="Course" defaultValue="5" value={perPage} name="perpage" onChange={this.selectEntry} >
                        <MenuItem  value="5">5</MenuItem>
                        <MenuItem  value="10">10</MenuItem>
                        <MenuItem  value="25">25</MenuItem>
                    </Select>

                </FormControl>

                <TableContainer component={Paper} style={{marginTop:'30px',width:'1100px',margin:'auto'}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{backgroundColor:'paleturquoise',cursor:'pointer'}}>
                            <TableRow>
                                <TableCell align="center">Firstname</TableCell>
                                <TableCell align="center">Lastname</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Hobbies</TableCell>
                                <TableCell align="center">Course</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                records.map((row,i) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{row.fname}</TableCell>
                                        <TableCell align="center">{row.lname}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.hobbies.toString()}</TableCell>
                                        <TableCell align="center">{row.course}</TableCell>
                                        <TableCell align="center">{row.gender}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" id={row._id} onClick={()=>this.onEdit(row)}>Edit</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained"  id={row._id} color="secondary" onClick={()=>this.onDelete(row)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    Array.from(Array(totalPages).keys()).map(ele => {debugger
                        return <div key={ele} id="pagination"  className={currentPage === ele+1 ?"disabled":""}>

                        </div>
                    })
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.record.users,
    perPageRow : state.record.perpage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    record : () => dispatch(record()),
    perPageRecord: payload => dispatch(pageTodo(payload)),
    deleteRecord: payload => dispatch(delTodo(payload)),
    updateRecord: payload => dispatch(updateTodo(payload))
});



export default  connect(mapStateToProps, mapDispatchToProps)(TableList);
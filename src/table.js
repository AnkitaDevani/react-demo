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
import config from "./url";
import {getSubjectList, loginUser, allUsers, deleteUser} from "./_data";
import {collection, query, orderBy, onSnapshot,deleteDoc,doc} from "firebase/firestore";
import {db} from './firebase';

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
            courseList:[],
            editableId:"",
            searchRecords:"",
            perPage: 5,
            totalRow: 0,
            totalPages: 0,
            currentPage: 1,
            displayRecords: [],
            id:'',
            data:[],
        }
    }

   async componentDidMount() {
        const subjectList = await getSubjectList();
        this.setState({
            courseList: subjectList.data,
        });
      /* const q = query(collection(db, 'records'), orderBy('created', 'desc'));
       onSnapshot(q, querysnapshot => {
           querysnapshot.docs.map( doc => {
               console.log(doc.data());
               this.state.data.push(doc.data());
               this.setState({
                   id:doc.id,
                   data:this.state.data,
               });
           });

       });*/

        const response = await loginUser();
        if(response.data.role === "admin") {
            const allUser = await allUsers();
            console.log(allUser.data);
            this.setState({
                records: allUser.data,
            });
        }else {
            this.state.records.push(response.data);
            this.setState({
                records:this.state.records,
            });

        }

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

    onDelete = async (ele) => {

        /*const taskDocRef = doc(db, 'records', this.state.id);
        try{
           const res =  await deleteDoc(taskDocRef);
            const delrecords1 = this.state.data.filter(e => e.created.seconds !== res.data.created.seconds);
            this.setState({
               data: delrecords1
            });
        } catch (err) {
            alert(err)
        }*/
        const responce = await deleteUser(ele._id);
        const { records } = this. state;
        const delrecords = records.filter(e => e._id !== responce.data._id);
        this.setState({
            records: delrecords
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
        const { perPage,displayRecords,records,totalPages,currentPage,courseList} = this.state;
        const pageArr = Array.from(Array(totalPages).keys());


        return(
            <div>
                <Layout/>
               {/* <FormControl variant="outlined" style={{marginTop:'110px',marginLeft:'150px',width:'100px',marginBottom:'20px'}}>

                    <InputLabel >Entry</InputLabel>
                    <Select label="Course" defaultValue="5" value={perPage} name="perpage" onChange={this.selectEntry} >
                        <MenuItem  value="5">5</MenuItem>
                        <MenuItem  value="10">10</MenuItem>
                        <MenuItem  value="25">25</MenuItem>
                    </Select>

                </FormControl>*/}

                <TableContainer component={Paper} style={{width:'1100px',margin:'auto',marginTop:'150px'}}>
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
                                        <TableCell align="center">{(courseList.find(ele => ele._id ===row.course)).subject}</TableCell>
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
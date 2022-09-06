import React from "react";
import axios from "axios";
import './App.css';
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



//axios.baseURL = "http://localhost:8080/api/";

class Register extends React.Component{
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
      courseList: [{name: 'Computer'},{name: 'Maths'},{name: 'Science'}],
      editableId:null,
      records:[],
      profile:"",
      showPassword: false,
    }
  }

  async componentDidMount(e) {
    const isLoggedIn = localStorage.getItem("token");
    debugger

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/subjectList',
    }).then(res => {
      console.log(res.data);
      this.setState({
        courseList: res.data,
      });
    }).catch(err => {
      console.log("Submit form:- ",err);
    });

    if(isLoggedIn === "null") {
      this.props.history.push({
        pathname: `/register`,
      })
    } else {
      const response = await axios.get("http://localhost:8080/api/getLoggedInUser", { headers: {"Authorization" : `Bearer ${isLoggedIn}`} });
      if (response.data.role === "admin") {
        const path = this.props.history.location.pathname;
        const splittedRute = path.split("/")[2] || null;
        axios({
          method: 'get',
          url: 'http://localhost:8080/api/users',
        }).then(res => {
          console.log(res.data);
          const findUser = res.data.find(ele => ele._id === splittedRute);
          this.onEdit(findUser);
        }).catch(err => {
          console.log("Submit form:- ",err);
        });
      } else {
        console.log(response.data);
        this.onEdit(response.data);
        this.state.records.push(response.data);
        console.log(this.state.records);
        this.setState({
          records:this.state.records
        })
      }
    }
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  submitForm = () => {
    const { fname, lname, hobbies,course, gender, email, password,editableId} = this.state;
    const token = localStorage.getItem("token");
    if(token === "null"){
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/submit',
        data: {
          "fname": fname,
          "lname":lname,
          "hobbies":hobbies,
          "email":email,
          "password": password,
          "gender":gender,
          "course":course,
          "role":"user"
        }
      }).then(res => {
        this.clearForm();
        this.props.history.push({
          pathname: `/login`,
        });
      }).catch(err => {
        console.log("Submit form:- ",err);
      });
    } else {
      this.clearForm();
      debugger
      axios({
        method: 'patch',
        url: 'http://localhost:8080/api/update/'+editableId,
        headers: {"Authorization" : `Bearer ${token}`},
        data: {
          "fname": fname,
          "lname":lname,
          "hobbies":hobbies,
          "email":email,
          "password": password,
          "gender":gender,
          "course":course,
        }
      }).then(res => {
        this.clearForm();
        this.props.history.push({
          pathname: `/blog`,
        });
      }).catch(err => {
        console.log("Submit form:- ",err);
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
    this.setState({
      fname: editUser.fname,
      lname: editUser.lname,
      age: editUser.age,
      hobbies:editUser.hobbies,
      course: editUser.course,
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
            <h1 align='left' style={{margin:'0px 10px',padding:'5px',fontSize:'40px'}}>Register</h1>
            <div style={{display:'flex',alignItems:'center'}}>
              <h1 align='left' style={{margin:'0px 15px 5px',fontSize:'15px',fontWeight:'lighter'}}>Create your account</h1>
            </div>
            <FormGroup style={{margin:'10px' }}>

              <TextField style={{margin:'6px'}} id="outlined-basic" name="fname" value={fname} label="FirstName" onChange={this.handleChange} variant="outlined" />
              <TextField style={{margin:'6px'}} id="outlined-basic" name="lname" value={lname} label="LastName" onChange={this.handleChange} variant="outlined" />
              <TextField style={{margin:'6px'}} id="outlined-basic" name="email" value={email} label="Email" onChange={this.handleChange} variant="outlined" />
              {/*  <TextField style={{margin:'6px'}} id="outlined-basic" name="password" value={password} label="Password" onChange={this.handleChange}
                     disabled={token === "null" ?false:true} variant="outlined"/>*/}

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
                  {courseList.map(c =>
                      <MenuItem key={c.subject} value={c.subject}>{c.subject}</MenuItem>
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


              {/*<FormControl>
              <FormLabel style={{margin:'6px'}}>Profile picture :
                <input accept="image/*" style={{ display: 'none' }} name="profile" value={profile} id="raised-button-file" onChange={this.handleChange} type="file"/>
                <Button variant="contained" component="span" style={{marginLeft:'10px'}}> Upload </Button>

              </FormLabel>
          </FormControl>*/}

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


const mapStateToProps = (state, ownProps) => ({
  user: state.record.users
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitRecord: payload => dispatch(addTodo(payload)),
  deleteRecord: payload => dispatch(delTodo(payload)),
  updateRecord: payload => dispatch(updateTodo(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
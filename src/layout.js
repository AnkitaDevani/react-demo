import { Link } from "react-router-dom";
import './App.css';
import logo from './ds_logo.png';
import Button from '@material-ui/core/Button';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { BottomNavigation } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from "axios";

const logOut = () => {
    debugger
    const token = localStorage.getItem("token");
    localStorage.setItem("token",null);
    localStorage.setItem("email",null);
    axios({
        method: 'delete',
        url: 'http://localhost:8080/api/logout',
        headers: {"Authorization": `Bearer ${token}`},
    }).then(res => {
        localStorage.setItem("token",null);
        localStorage.setItem("email",null);
        this.props.history.push({
            pathname: `/login`,
        },)
    }).catch(err => {
        console.log("Submit form:- ",err);
    });

};

var role;
const Layout =  () => {
    async function subjectFun(){
        const token = localStorage.getItem("token");
        const response =   await axios.get("http://localhost:8080/api/getLoggedInUser", { headers: {"Authorization" : `Bearer ${token}`} });
        role = response.data.role;
    }
   subjectFun();
   const displaysubj = role === "admin"? {display:'block'}:{display:'none'};
    return (
        <div    >
            <AppBar position="static" style={{backgroundColor:'white',position:'fixed',top:'0'}}>
                <CssBaseline />
                <Toolbar>
                    <Typography variant="h4" >
                        <img src={logo} className="logo1"/>
                    </Typography>
                    <div style={{display:'inline-flex',marginRight:'20px'}} >
                        <Link to="/home" className="link link-ltr" > HOME </Link><hr style={{fontSize:'40px',opacity:'0.4'}}/>
                        <Link to="/table" className="link link-ltr"> LIST </Link><hr style={{fontSize:'40px',opacity:'0.4'}}/>
                        <Link to="/subject" className="link link-ltr" style={displaysubj}> SUBJECT </Link>
                        <hr style={role === "admin" ? {display:'block',fontSize:'40px',opacity:'0.4'}:{display:'none'}}/>
                        <Link to="/blog" className="link link-ltr"> PROFILE </Link><hr style={{fontSize:'40px',opacity:'0.4'}}/>
                        <Link to="/login" className="link link-ltr" onClick={logOut}> LOGOUT </Link>

                    </div>
                </Toolbar>
            </AppBar>
        </div>

    )
};

export default Layout;
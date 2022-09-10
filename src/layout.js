import { Link } from "react-router-dom";
import './styles.scss';
import logo from './ds_logo.png';
import Button from '@material-ui/core/Button';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import {loginUser, logoutUser} from "./_data";



var role;
const Layout =  () => {
    async function subjectFun(){
        const response = await loginUser();
        role = response.data.role;
    }
   subjectFun();
   const displaysubj = role === "admin"? {display:'block'}:{display:'none'};
    return (
        <div className="layout">
            <AppBar position="static" className="appbar">
                <CssBaseline />
                <Toolbar>
                    <Typography variant="h4" >
                        <img src={logo} className="logo1"/>
                    </Typography>
                    <div>
                        <Link to="/home" className="link link-ltr" > HOME </Link><hr className="line"/>
                        <Link to="/table" className="link link-ltr"> LIST </Link><hr className="line"/>
                        <Link to="/subject" className="link link-ltr" style={displaysubj}> SUBJECT </Link>
                        <hr style={role === "admin" ? {display:'block',fontSize:'40px',opacity:'0.4'}:{display:'none'}}/>
                        <Link to="/blog" className="link link-ltr"> PROFILE </Link><hr className="line"/>
                        <Link  to="/logout" className="link link-ltr" > LOGOUT </Link>

                    </div>
                </Toolbar>
            </AppBar>
        </div>

    )
};

export default Layout;
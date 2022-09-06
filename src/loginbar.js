import { Link } from "react-router-dom";
import './App.css';
import logo from './ds_logo.png';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";


const UnAuth = () => {
    return (
        <div>
            <AppBar position="static" style={{backgroundColor:'white',position:'fixed',top:'0'}}>
                <CssBaseline />
                <Toolbar>
                    <Typography variant="h4" >
                        <img src={logo} className="logo"/>
                    </Typography>
                    <div style={{display:'inline-flex',marginRight:'20px'}} >

                        <Link to="/" className="link link-ltr" > REGISTER </Link><hr style={{fontSize:'40px',opacity:'0.4'}}/>
                        <Link to="/login" className="link link-ltr"> LOGIN </Link>

                    </div>
                </Toolbar>
            </AppBar>


        </div>

    )
};

export default UnAuth;
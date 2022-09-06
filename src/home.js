import logo from './ds_logo.png';
import './App.css';
import Layout from "./layout";
import web from "./web2.png";
import React from "react";
import {Button, Box} from '@material-ui/core';
//import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
//import RestoreIcon from "@mui/material/SvgIcon/SvgIcon";
import { BottomNavigation } from '@material-ui/core';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    register = () => {
        this.props.history.push({
            pathname: `/contact`,
        });
    };

    render() {
        return (
            <div >
                <Layout/>
                <img src={web} style={{height:'500px',float:'left'}}/>
                <p style={{fontSize:'80px',textAlign:'center'}}> Make Your <br/>Dream True<br/>With Our Academy.</p>

                <div style={{textAlign:'center'}}>
                    <h1 style={{fontSize:'50px',color:'#45b6fe'}}>About Us</h1>
                    <p style={{fontSize:'30px',color:'lightgray'}}>____</p>
                    <p style={{fontSize:'30px',paddingTop:'25px'}}>Technical Experience</p>
                    <p style={{fontSize:'20px',fontWeight:'lighter',lineHeight: '1.8em'}}>
                        We are well-versed in a variety of operating systems, networks,<br/>
                        and databases.We work with just about any technology that a small business<br/>
                        would encounter. We use this expertise to help customers with small to<br/>
                        mid-sized projects. </p>

                    <p style={{fontSize:'30px',paddingTop:'20px'}}>High ROI</p>
                    <p style={{fontSize:'20px',fontWeight:'lighter',lineHeight: '1.8em'}}>
                        We are well-versed in a variety of operating systems, networks,<br/>
                        and databases.We work with just about any technology that a small business<br/>
                        would encounter. We use this expertise to help customers with small to<br/>
                        mid-sized projects. </p>

                    <p style={{fontSize:'30px',paddingTop:'20px'}}>Satisfaction Guaranteed</p>
                    <p style={{fontSize:'20px',fontWeight:'lighter',lineHeight: '1.8em'}}>
                        We are well-versed in a variety of operating systems, networks,<br/>
                        and databases.We work with just about any technology that a small business<br/>
                        would encounter. We use this expertise to help customers with small to<br/>
                        mid-sized projects. </p>
                </div>
                <Box align='center'>
                    <Button variant="contained" color="primary" onClick={this.register} style={{borderRadius:'30px',color:'white',fontSize:'25px'
                        ,padding:'10px 20px'}}>
                        Register Here</Button>
                </Box>

                <BottomNavigation sx={{ width: 800,}} style={{backgroundColor:'lightskyblue', marginTop:'20px',}}>

                    <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon style={{color:'white'}}/>}/>
                    <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon style={{color:'white'}}/>}/>
                    <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon style={{color:'white'}}/>}/>
                    <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon style={{color:'white'}}/>} />
                </BottomNavigation>
            </div>
        );
    }


}

export default Home;

import logo from './ds_logo.png';
import './styles.scss';
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
            <div className="home">
                <Layout/>
                <img src={web} className="image"/>
                <p> Make Your <br/>Dream True<br/>With Our Academy.</p>

                <div>
                    <h1>About Us</h1>
                    <p className="p1">___________</p>
                    <p className="p2">Technical Experience</p>
                    <p className="p3">
                        We are well-versed in a variety of operating systems, networks,<br/>
                        and databases.We work with just about any technology that a small business<br/>
                        would encounter. We use this expertise to help customers with small to<br/>
                        mid-sized projects. </p>

                    <p className="p2">High ROI</p>
                    <p className="p3">
                        We are well-versed in a variety of operating systems, networks,<br/>
                        and databases.We work with just about any technology that a small business<br/>
                        would encounter. We use this expertise to help customers with small to<br/>
                        mid-sized projects. </p>

                    <p className="p2">Satisfaction Guaranteed</p>
                    <p className="p3">
                        We are well-versed in a variety of operating systems, networks,<br/>
                        and databases.We work with just about any technology that a small business<br/>
                        would encounter. We use this expertise to help customers with small to<br/>
                        mid-sized projects. </p>
                </div>
                <Box align='center'>
                    <Button variant="contained" color="primary" onClick={this.register} className="btn1">
                        Register Here</Button>
                </Box>

                <BottomNavigation sx={{ width: 800,}} className="footer">

                    <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon className="icon"/>}/>
                    <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon className="icon"/>}/>
                    <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon className="icon"/>}/>
                    <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon className="icon"/>} />
                </BottomNavigation>
            </div>
        );
    }


}

export default Home;

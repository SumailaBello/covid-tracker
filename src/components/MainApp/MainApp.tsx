import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Map from '../Map/Map';
import { Menu } from 'react-feather';
import './MainApp.css';
import SideMenu from '../SideMenu/SideMenu';

const MainApp = ()=> {
    const [isOpen, toggleMenu] = React.useState(false);
    const toggle = (value: boolean)=> {
        toggleMenu(value);
    }
    return (
        <div style={{ height: '100vh', width: '100%' }} id="main">
            <SideMenu isOpen = {isOpen} outerContainerId="main" toggle={toggle} />
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Button variant="outline-light" style={{marginInline: '10px'}} onClick={()=> toggleMenu(!isOpen)}>
                        <Menu color="grey" size={30} />
                    </Button>
                    Covid Tracker
                </Navbar.Brand>
            </Navbar>
            <Map />
        </div>
    )
}

export default MainApp

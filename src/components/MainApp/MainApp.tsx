import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Map from '../Map/Map';
import { Menu, Search } from 'react-feather';
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
            {/* <SlideMenu left isOpen={isOpen} width={ '30%' } onClose={()=>toggleMenu(false)} className = "menu-style" outerContainerId={ "main"}>
                <div className="bg-light menu-inner container-fluid p-3">
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        <Search />
                    </Button>
                </InputGroup>
                </div>
            </SlideMenu> */}
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

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Map from '../Map/Map';

const MainApp = ()=> {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Nav defaultActiveKey="/home" className="justify-ccontent-start">
                <Nav.Link href="/home">Active</Nav.Link>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav>
            <Map />
        </div>
    )
}

export default MainApp

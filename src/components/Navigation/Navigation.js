import React , { Component } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Navigation extends Component {
    render(){
        return (
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Event Logger</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Form inline>
                        <Button variant="outline-info">Sync Events</Button>
                    </Form>
                </Navbar>
        )
    }
}

export default Navigation;
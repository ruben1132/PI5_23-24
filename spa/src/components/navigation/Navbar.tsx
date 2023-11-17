'use client';

// react
import React from 'react';

// react bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

// auth context
import { useAuth } from '@/context/AuthContext';

interface NavBarProps {
    toggle: () => void;
}

function NavBar(props: NavBarProps) {
    const { logout, user } = useAuth();

    const logOut = () => {
        logout();
    };

    return (
        <Navbar bg="light" expand="lg" className="" bsPrefix="navbar">
            <Container fluid>
                <Button variant="outline-secondary" onClick={props.toggle}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Navbar.Brand href="#" style={{ paddingLeft: '15px' }}>
                    ISEP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav  className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <NavDropdown style={{color:"black"}} className="d-flex" title={ user?.username + "-" + user?.userRole} id="collapsible-nav-dropdown">
                        <NavDropdown.Item>Profile (soon)</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

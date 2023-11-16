'use client';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
// nextjs
import Link from 'next/link';

interface NavBarProps {
    toggle: () => void;
}

function NavBar(props: NavBarProps) {
    return (
        <Navbar bg="light" expand="lg" className="" bsPrefix='navbar'>
            <Container fluid>
                <Button variant="outline-secondary" onClick={props.toggle}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Navbar.Brand href="#" style={{paddingLeft: "15px"}}>ISEP</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    <Link href={'/'} className='navbarLink'> Home </Link>
                    <Link href={'/aboutus'} className='navbarLink'> About Us </Link>
                    <Link href={'/termsandconditions'} className='navbarLink'> Terms of service</Link>
                    </Nav>
                    <Form className="d-flex">
                        User Here
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

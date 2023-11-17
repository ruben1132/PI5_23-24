'use client';

// react bootstrap components
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// nextjs
import Link from 'next/link';

// css
import '../../styles/navigation.css';

export default function IndexNavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">RoboDroneGo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto" navbarScroll>
                        <Link href={'/'} className="navbarLink">
                            Home
                        </Link>
                        <Link href={'/aboutus'} className="navbarLink">
                            About Us
                        </Link>
                        <Link href={'/termsandconditions'} className="navbarLink">
                            Terms of service
                        </Link>
                    </Nav>
                    <Nav>
                        <Link href={'/login'} className="navbarLink">
                            Login
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

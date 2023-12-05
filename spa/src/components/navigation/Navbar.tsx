'use client';

// react
import React from 'react';

// react bootstrap components
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Spinner from 'react-bootstrap/Spinner';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';

// auth context
import { useAuth } from '@/context/AuthContext';

// nextjs
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// config
import config from '../../../config';

interface NavBarProps {
    toggle: () => void;
}

function NavBar(props: NavBarProps) {
    const { logout, user } = useAuth();

    // router
    const router = useRouter();

    const logOut = async () => {
        const res = await logout();

        if (res) {
            router.push('/login');
        }
    };

    return (
        <Navbar bg="light" expand="lg" className="" bsPrefix="navbar">
            <Container fluid>
                <Button variant="outline-secondary" onClick={props.toggle} id="open-sidebar">
                    <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Navbar.Brand href="#" style={{ paddingLeft: '15px' }}>
                    ISEP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                    <NavDropdown
                        style={{ color: 'black' }}
                        className="d-flex"
                        title={
                            user?.username ? (
                                user?.username + '-' + user?.role.name
                            ) : (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                </>
                            )
                        }
                        id="collapsible-nav-dropdown"
                    >
                        <Link
                            href={'/' + config.dashboardBaseRoute + config.routes.find(route => route.routeName === 'profile').routeName}
                            id='navbar-profile'
                            style={{ textDecoration: 'none', padding: '2px' }}
                        >
                            <NavDropdown.ItemText>Profile</NavDropdown.ItemText>
                        </Link>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;

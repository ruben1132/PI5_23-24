'use client';

// react
import React from 'react';

// react bootstrap components
import { Nav, Button, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

// config
import config from '../../../config';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
    faBuilding,
    faLayerGroup,
    faLink,
    faRobot,
    faListCheck,
    faUser,
    faMap,
    faUsers,
    faElevator,
    faBorderAll,
    faGear,
} from '@fortawesome/free-solid-svg-icons';

// auth context
import { useAuth } from '@/context/AuthContext';

// nextjs
import Link from 'next/link';

interface SidebarProps {
    isOpen: boolean;
    toggle: () => void;
}

const sideBarIcons = {
    buildings: faBuilding,
    floors: faLayerGroup,
    passages: faLink,
    robots: faRobot,
    robottypes: faGear,
    tasktypes: faGear,
    tasks: faListCheck,
    users: faUser,
    floormaps: faMap,
    roles: faUsers,
    elevators: faElevator,
    rooms: faBorderAll,
    v3d: faMap,
};

function Sidebar(props: SidebarProps) {
    const { user } = useAuth();

    return (
        <div className={`sidebar ${props.isOpen ? 'is-open' : ''}`}>
            <div className="sidebar-header">
                <Button variant="link" onClick={props.toggle} style={{ color: '#fff' }} className="mt-4">
                    <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
                </Button>
                <h3>RobDroneGo</h3>
            </div>

            <Nav className="flex-column pt-2">
                {user?.id ? (
                    <>
                        {config.routes.map(
                            (
                                page: { routeName: string; displayName: string; permissions: string[] },
                                index: number,
                            ) => {
                                // Check if the current route is the 'profile' route
                                const isProfileRoute = page.routeName === 'profile';

                                // Check if user.role.name is included in the permissions array
                                const isUserAuthorized = user.role.name && page.permissions.includes(user.role.name)  && !isProfileRoute;

                                // Render the Link only if user is authorized
                                return isUserAuthorized ? (
                                    <Link
                                        href={'/' + config.dashboardBaseRoute + page.routeName}
                                        key={index}
                                        style={{ textDecoration: 'none', padding: '2px' }}
                                    >
                                        <Nav.Item className="nav-item" id={'sidebar-' + page.routeName}>
                                            <Col sm={3}>
                                                <FontAwesomeIcon
                                                    icon={sideBarIcons[page.routeName as keyof typeof sideBarIcons]}
                                                    style={{ color: '#fff', paddingLeft: '15px' }}
                                                />
                                            </Col>
                                            <Col sm={9}>{page.displayName}</Col>
                                        </Nav.Item>
                                        <hr style={{ color: '#ffff' }} />
                                    </Link>
                                ) : null;
                            },
                        )}
                    </>
                ) : (
                    <Spinner as="span" animation="border" role="status" aria-hidden="true" />
                )}
            </Nav>
        </div>
    );
}

export default Sidebar;

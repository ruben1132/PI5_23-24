'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Nav, Button, Col } from 'react-bootstrap';
import classNames from 'classnames';
import config from '../../../config';
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
    return (
        <div className={classNames('sidebar', { 'is-open': props.isOpen })}>
            <div className="sidebar-header">
                <Button variant="link" onClick={props.toggle} style={{ color: '#fff' }} className="mt-4">
                    <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
                </Button>
                <h3>RobDroneGo</h3>
            </div>

            <Nav className="flex-column pt-2">
                {config.routes.map((page: { routeName: string; displayName: string }, index: number) => (
                    <Link href={'/'+ config.dashboardBaseRoute + page.routeName} key={index} style={{ textDecoration: 'none', padding: '2px' }}>
                        <Nav.Item className="nav-item">
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
                ))}
            </Nav>
        </div>
    );
}

export default Sidebar;

"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import config from "../../../config";
import { library } from "@fortawesome/fontawesome-svg-core";
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
  faGear
} from "@fortawesome/free-solid-svg-icons";

// nextjs
import Link from "next/link";

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
};

function Sidebar(props: SidebarProps) {
  return (
    <div className={classNames("sidebar", { "is-open": props.isOpen })}>
      <div className="sidebar-header">
        <Button
          variant="link"
          onClick={props.toggle}
          style={{ color: "#fff" }}
          className="mt-4"
        >
          <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
        </Button>
        <h3>RobDroneGo</h3>
      </div>

      <Nav className="flex-column pt-2">
        {config.routes.map(
          (page: { routeName: string; displayName: string;}, index: number
          ) => (
            <Link href={page.routeName} key={index}>
              <Nav.Item className="active">
                <FontAwesomeIcon
                  icon={sideBarIcons[page.routeName as keyof typeof sideBarIcons]}
                  className="mr-2"
                />
                {page.displayName}
              </Nav.Item>
            </Link>
          )
        )}
      </Nav>
    </div>
  );
}

export default Sidebar;

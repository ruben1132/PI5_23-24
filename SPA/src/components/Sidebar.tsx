"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

// nextjs
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode; // Define children prop here
}

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
        <h3>RoboDroneGO</h3>
      </div>

      <Nav className="flex-column pt-2">
        {[
          { name: "Lobbies", link: "/lobby/" },
          { name: "Profile", link: "/profile/idExample" },
        ].map((page, index) => (
          <Link href={page.link} key={index}>
            <Nav.Item className="active">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              {page.name}
            </Nav.Item>
          </Link>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;

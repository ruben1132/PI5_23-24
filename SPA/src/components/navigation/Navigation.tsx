"use client";


import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import NavBar from "./Navbar";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";


  
interface NavigationProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  // Moblie first
  const [isOpen, setIsOpen] = useState(true);
  // const [isMobile, setIsMobile] = useState(true)
  const [previousWidth, setPreviousWidth] = useState(-1);

  useEffect(() => {
    // Function to retrieve 'sidebarState' from localStorage
    const getSidebarStateFromLocalStorage = () => {
      const storedState = localStorage.getItem("sidebarState");
      return storedState === "true"; // Convert to boolean
    };

    // Initialize the 'isOpen' state with the value from localStorage
    setIsOpen(getSidebarStateFromLocalStorage());

    const updateWidth = () => {
      const width = window.innerWidth;
      const widthLimit = 576;
      const isMobile = width <= widthLimit;
      const wasMobile = previousWidth <= widthLimit;

      if (isMobile !== wasMobile) {
        setIsOpen(!isMobile);
      }

      setPreviousWidth(width);
    };

    const previousWidth = window.innerWidth;

    // add event listener
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      // remove event listener
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // callback function
  const toggle = () => {
    let newState = !isOpen;
    localStorage.setItem("sidebarState", newState.toString());
    setIsOpen(newState);
  };

  return (
    <html>
      <body>
        <main>
          <div className="App wrapper">
            <Sidebar toggle={toggle} isOpen={isOpen} />
            <Container
              fluid
              className={classNames("content", { "is-open": isOpen })}
            >
              <NavBar toggle={toggle} />
              <br />
              {/* Content */}
              {children}
            </Container>
          </div>
        </main>
      </body>
    </html>
  );
}

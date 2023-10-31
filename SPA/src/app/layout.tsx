"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/navigation.css";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Moblie first
  const [isOpen, setIsOpen] = useState(true);
  // const [isMobile, setIsMobile] = useState(true)
  const [previousWidth, setPreviousWidth] = useState(-1);

  function updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      setIsOpen(!isMobile);
    }

    setPreviousWidth(width);
  }

  useEffect(() => {
    // add event listener
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      // remove event listener
      window.removeEventListener("resize", updateWidth);
    };
  });

  // callback function
  const toggle = () => {
    localStorage.setItem("sidebarState", isOpen.toString());
    setIsOpen(!isOpen);
  };

  return (
    <html lang="en">
      <Sidebar toggle={toggle} isOpen={isOpen}>
        <Container
          fluid
          className={classNames("content", { "is-open": isOpen })}
        >
          {/* <NavBar toggle={toggle} /> */}
          <br />
          {/* Content */}
          {children}
        </Container>
      </Sidebar>
    </html>
  );
}

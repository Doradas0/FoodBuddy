import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./Navbar.css";

export default () => {
  return(
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Scratch</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem href="/signup">Signup</NavItem>
          <NavItem href="/login">Login</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

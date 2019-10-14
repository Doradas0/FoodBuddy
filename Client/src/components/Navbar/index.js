import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./Navbar.css";

export default ({isAuthenticated, userHasAuthenticated, handleLogout}) => {

  return(
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Food Buddy</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
        {isAuthenticated
          ? <NavItem onClick={handleLogout}>Logout</NavItem>
          : <>
              <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

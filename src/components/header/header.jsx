import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { CommonConstant } from "../common/commonContants";

const Header = () => {
  const userName = sessionStorage.getItem("user_id");
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faPaw} />
          GIF Maker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/my-idea"></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="avatar" eventKey={2} href="#">
              <NavDropdown
                className="avatar-name"
                title={userName !== null && userName[0].toUpperCase()}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>{userName}</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  {CommonConstant.LOGOUT}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../styles/commons.style.css";

export default function Navigation() {

  window.addEventListener('scroll', function () {
    let nav = document.body.querySelector('#navbar');

    if (!nav) {
      return;
    }

    if (window.pageYOffset > 100) {
      nav.classList.add('scroll-down');
    } else {
      nav.classList.remove('scroll-down');
    }
  });

  function openNewTab({ event, url }) {
    event.preventDefault();

    window.open(url);
  }

  return (
    <div>
      <Navbar expand="lg" className="fixed-top" id="navbar">
        <Container>
          <Navbar.Brand href="#home" className="text fw-bold">brilianrn</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" aria-controls="navbarScroll">
            <Nav>
              <Nav.Link href="#home" className="items">Home</Nav.Link>
              <Nav.Link href="#about" className="items">About</Nav.Link>
              <Nav.Link href="#education" className="items">Education</Nav.Link>
              <Nav.Link href="#skills" className="items">Skills</Nav.Link>
              <Nav.Link href="#portfolio" className="items">Portofolios</Nav.Link>
              {/* <NavDropdown title="Portofolios" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">kewebin.id</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">e-commerce</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">movie-app</NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link href="#" onClick={(event) => openNewTab({ event, url: "https://wa.me/6281230818789" })} className="btn btn-primary text-white">Contact Me</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
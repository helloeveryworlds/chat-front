import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../style/Nav.module.css';
import React from 'react';

const Navi = ({ onNavigate }) => {

  return (
    <Navbar bg="light" className={styles.navbar} expand="lg">
      <Container fluid>
      <Navbar.Brand href="https://chat.openai.com/chat/">ChatGPT</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className={styles.navLink} onClick={() => onNavigate('ChatBox')}>Home</Nav.Link>
            <Nav.Link onClick={() => onNavigate('Mock')}>Mock Interview</Nav.Link>
            <NavDropdown title="My Personal Link" id="navbarScrollingDropdown">
            <NavDropdown.Item className={styles.navDropdownItem} href="https://www.linkedin.com/in/fuhao-ruan-779181253/">LinkedIn</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/helloeveryworlds">
               Github Link
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Advertisement
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Cooperation
            </Nav.Link>
          </Nav>
          <Form className="d-flex">


        <Form.Control
          type="search"
          placeholder="Search"
          className={`me-2 ${styles.searchInput}`}
          aria-label="Search"
        />
        <Button className={styles.searchButton} variant="outline-success">Search</Button>
      </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
import {
  faDollar,
  faPhone,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";

const TopHeader = () => {
  return (
    <div>
      <Container fluid style={{ width: "99%" }}>
        <Row>
          <Col>
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-1 my-lg-0"
                    style={{ maxHeight: "100px" }}
                    navbarScroll
                  >
                    <Nav.Link style={{ color: "black" }} href="#action1">
                      Download App
                    </Nav.Link>
                    <Nav.Link style={{ color: "black" }} href="#action2">
                      Mulai Jualan
                    </Nav.Link>
                    <Nav.Link style={{ color: "black" }} href="#action2">
                      Jadi Mitra
                    </Nav.Link>
                    <Nav.Link style={{ color: "black" }} href="#action2">
                      Buku Bantuan
                    </Nav.Link>
                  </Nav>
                  <Nav.Link
                    style={{ fontSize: 13, color: "black" }}
                    href="#action1"
                  >
                    <FontAwesomeIcon className="mx-1" icon={faPhoneSquare} />
                    Hotline: 0129 925 9901
                  </Nav.Link>
                  <Nav.Link
                    style={{ fontSize: 13, color: "grey" }}
                    href="#action1"
                  >
                    |
                  </Nav.Link>
                  <Nav.Link
                    style={{ fontSize: 13, color: "black" }}
                    href="#action2"
                  >
                    <FontAwesomeIcon className="mx-1" icon={faDollar} />
                    US Dollar
                  </Nav.Link>
                  <Nav.Link
                    style={{ fontSize: 13, color: "grey" }}
                    href="#action2"
                  >
                    |
                  </Nav.Link>
                  <NavDropdown
                    style={{ fontSize: 13, color: "black" }}
                    title="English"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="#action3">
                      Indonesia
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">English</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Prancis</NavDropdown.Item>
                  </NavDropdown>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopHeader;

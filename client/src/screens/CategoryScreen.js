import {
  faAdd,
  faBagShopping,
  faBook,
  faComputer,
  faDashboard,
  faEnvelope,
  faGear,
  faGears,
  faGrinStars,
  faLayerGroup,
  faMessage,
  faMoneyBill,
  faPlug,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <div>
      <Container fluid className="mt-2">
        <Row>
          <Col>
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <Card
                      classname="my-2"
                      style={{ width: "17rem", marginLeft: -25 }}
                    >
                      <Card.Header
                        style={{ color: "white", backgroundColor: "orange" }}
                      >
                        All Category
                      </Card.Header>
                      <ListGroup variant="flush">
                        <Link to="/">
                          <ListGroup.Item>
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faBagShopping}
                            />
                            Pakaian
                          </ListGroup.Item>
                        </Link>
                        <Link to="/">
                          <ListGroup.Item>
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faPlug}
                            />
                            Elektronik
                          </ListGroup.Item>
                        </Link>
                        <Link to="/">
                          <ListGroup.Item>
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faComputer}
                            />
                            Komputer
                          </ListGroup.Item>
                        </Link>
                        <Link to="/">
                          <ListGroup.Item>
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faBook}
                            />
                            Buku
                          </ListGroup.Item>
                        </Link>
                        <Link to="/">
                          <ListGroup.Item>
                            <FontAwesomeIcon
                              className="mx-2"
                              icon={faGrinStars}
                            />
                            Celana
                          </ListGroup.Item>
                        </Link>
                        <Link to="/">
                          <ListGroup.Item>Pakaian Muslim</ListGroup.Item>
                        </Link>
                      </ListGroup>
                    </Card>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavbarComp;

import {
    faAdd,
    faDashboard,
    faEnvelope,
    faGear,
    faGears,
    faLayerGroup,
    faLock,
    faMessage,
    faMoneyBill,
    faUser,
    faUserAlt,
    faUserLock,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React from "react";
  import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
  import { useDispatch, useSelector } from "react-redux";
  import { LinkContainer } from "react-router-bootstrap";
  import { logout } from "../redux/actions/userActions";
import AdminProduct from "./AdminProduct";
  
  const styleUL = {
    listStyle: "none",
    marginLeft: -10,
  };
  
  const styleA = { marginLeft: -35 };
  
  let styleB = {
    marginLeft: -25,
    marginTop: 25,
  };
  

const SidebarScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ backgroundColor: "#ebf2f5" }}>
      <Container fluid className="mt-2" style={{ width: "90%" }}>
        <Row>
          <Col md={3}>
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav>
                    <ul style={styleUL}>
                      <h2 className="mb-4">Shop Cart</h2>
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <li>
                            <LinkContainer style={styleA} to="/dashboard">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faDashboard} />{" "}
                                <span className="mx-3">Dashboard </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/profile">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faMoneyBill} />{" "}
                                <span className="mx-3">Profile </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/admin/products">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faLayerGroup} />{" "}
                                <span className="mx-3">Product </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/admin/users">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faUser} />{" "}
                                <span className="mx-3">User </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/admin/orders">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faMoneyBill} />{" "}
                                <span className="mx-3">Order </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/admin/setting">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faGear} />{" "}
                                <span className="mx-3">Setting </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <h6 style={styleB}>Other</h6>
                          <li>
                            <LinkContainer style={styleA} to="/notif">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faEnvelope} />{" "}
                                <span className="mx-3">Notifikasi </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/support">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faUserAlt} />{" "}
                                <span className="mx-3">Support </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/">
                              <Nav.Link onClick={handleLogout}>
                                <FontAwesomeIcon icon={faLock} />{" "}
                                <span className="mx-3">Logout </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                        </>
                      )}
                      {userInfo && !userInfo.isAdmin && (
                        <>
                          <li>
                            <LinkContainer style={styleA} to="/dashboard">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faDashboard} />{" "}
                                <span className="mx-3">Dashboard </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/profile">
                              <Nav.Link>
                                <FontAwesomeIcon icon={faUser} />{" "}
                                <span className="mx-3">Profile </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                          <li>
                            <LinkContainer style={styleA} to="/">
                              <Nav.Link onClick={handleLogout}>
                                <FontAwesomeIcon icon={faLock} />{" "}
                                <span className="mx-3">Logout </span>
                              </Nav.Link>
                            </LinkContainer>
                          </li>
                        </>
                      )}
                    </ul>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
          <Col style={{backgroundColor: "rgb(243, 243, 243)"}}>
            <AdminProduct />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SidebarScreen;

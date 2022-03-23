import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
// import SearchBox from "./SearchBox";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import TopHeader from "./TopHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header>
      <TopHeader />
      <Navbar expand="lg" style={{ backgroundColor: "blue", marginBottom: 20 }}>
        <Container fluid style={{ height: 60, width: "94%", color: "black" }}>
          <Link to="/">
            <Navbar.Brand>
              <b>Shop Cart</b>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <SearchBox />
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px", color: "black" }}
              navbarScroll
            ></Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FontAwesomeIcon className="mx-1" icon={faShoppingCart} />
                Cart
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <>
                <NavDropdown
                  title={<i className="fas fa-user"></i>}
                  id="navbarScrollingDropdown"
                >
                  <Link to="/profile" style={{ marginLeft: 16 }}>
                    Profile
                  </Link>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> SignIn
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="admin" id="navbarScrollingDropdown">
                <LinkContainer to="/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/products">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

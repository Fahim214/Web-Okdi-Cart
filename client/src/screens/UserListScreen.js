import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { deleteUser, listUser } from "../redux/actions/userActions";

const UserListScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch, successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(id));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Container>
        <Button className="btn btn-primary" onClick={handleBack}>
          GO BACK
        </Button>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="mt-3">
            <h3>User List</h3>
            <Col>
              <Table striped rounded="true" hover className="table-sm">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Admin</td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          className="ml-1"
                          to={`/admin/users/edit/${user._id}`}
                        >
                          <Button className="btn btn-sm" variant="primary">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn btn-sm"
                          variant="danger"
                          onClick={() => deleteUserHandler(user._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default UserListScreen;

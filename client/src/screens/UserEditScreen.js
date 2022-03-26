import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../redux/actions/userActions";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();
  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetail = useSelector((state) => state.userDetail);
  const { user, loading, error } = userDetail;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      navigate("/admin/users");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div>
      <FormContainer>
        <h2>Edit User</h2>
        {loading ? (
          <Loading />
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && <Message variant="danger">{error}</Message>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            <Form.Group controlId="name" className="mt-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
              className="mt-3"
                type="radio"
                label="is Admin"
                id="isAdmin"
                name="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(!isAdmin)}
              ></Form.Check>
            </Form.Group>
            <Button className="mt-3" type="submit" variant="primary">
                {loadingUpdate ? <Loading /> : "Update"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;

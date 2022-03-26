import React, { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { listMyOrders } from "../redux/actions/orderAction";

const ListOrderUser = () => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);

  const {
    loading: loadingMyOrders,
    orders,
    error: errorMyOrders,
  } = orderListMy;

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>My Orders</h2>
            {loadingMyOrders ? (
              <Loading />
            ) : errorMyOrders ? (
              <Message variant="danger">{errorMyOrders}</Message>
            ) : (
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm mt-3"
              >
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>PAID</td>
                    <td>DELIVERED</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn btn-sm" variant="primary">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListOrderUser;

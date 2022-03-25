import React, { useEffect } from "react";
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { createOrder } from "../redux/actions/orderAction";

const PlaceOrder = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { order, success, error } = useSelector((state) => state.orderCreate);

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 1;

  cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [dispatch, success, order?._id, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <h4>Shipping</h4>
                <strong>Address</strong>
                <p>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Payment Method</h4>
                <strong>Method :</strong>
                {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Order Items</h4>
                {cart.cartItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}></Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                      <Col>Tax</Col>
                      <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                      <Col>Total</Col>
                      <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                  className="w-100"
                  variant="primary"
                  onClick={placeOrderHandler}
                  >PLACE ORDER</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceOrder;

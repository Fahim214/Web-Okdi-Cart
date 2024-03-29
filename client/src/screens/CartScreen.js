import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FormControl,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const productDetails = useSelector((state) => state.productDetails);

  const { product } = productDetails;

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Container>
        <Button className="btn btn-light my-3" onClick={handleBack}>
          Go Back
        </Button>
        <Row>
          <h2 className="mb-4">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message variant="info">Your Cart is Empty</Message>
          ) : (
            <Row>
              <Col md={8}>
                {cartItems.map((cart) => (
                  <ListGroup variant="flush" key={cart.product}>
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={cart.image} fluid rounded />
                        </Col>
                        <Col>
                          <h5>
                            <Link to={`/product/${cart.product}`}>
                              {cart.name}
                            </Link>
                          </h5>
                          <h4 className="py-2">${cart.price}</h4>
                        </Col>
                        <Col>
                          <FormControl
                            className="w-25"
                            as="select"
                            value={cart.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(cart.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(cart.countInStock).keys()].map((x) => (
                              <option value={Number(x + 1)} key={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </FormControl>
                          <Button
                            className="my-3"
                            variant="danger"
                            onClick={() =>
                              dispatch(removeFromCart(cart.product))
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Col>
              <Col md={4}>
                <Card classNAme="p-2">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h4>
                        Subtitle (
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.qty),
                          0
                        )}
                        ) items
                      </h4>
                      <h5 className="mt-3">
                        $
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        className="w-100 p-2"
                        variant="primary"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        PROCESS TO CHECKOUT
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default CartScreen;

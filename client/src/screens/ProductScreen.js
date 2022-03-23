import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { addToCart } from "../redux/actions/cartActions";
import {
  createProductReview,
  listProductDetails,
} from "../redux/actions/productActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();
  let params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (error) {
      navigate("/");
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id, successProductReview]);

  const HandleAddToCart = () => {
    dispatch(addToCart(params.id, qty));
    navigate("/cart");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductReview(params.id, { rating, comment }));
  };
  return (
    <div>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          product && (
            <>
              <Link className="btn btn-light my-3" to="/">
                Go Back
              </Link>
              <Row>
                <Col md={4}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={5}>
                  <h3>{product.name}</h3>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.rating} Reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price: </Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? `In stock`
                              : `Out of stock`}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <FormControl
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option value={x + 1} key={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </FormControl>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button 
                          onClick={HandleAddToCart}
                          className="btn btn-primary d-block w-100"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h2>Reviews</h2>
                  {loadingProductReview && <Loading />}
                  {product.reviews.length === 0 && (
                    <Message variant="info">No Reviews</Message>
                  )}
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review.id}>
                        <strong>{review.name}</strong>
                      <Rating value={review.rating} text="Reviews" />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <h3>Write a customer review</h3>
                {userInfo ? (
                  <Form onSubmit={handleSubmit}>
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}

                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select ...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very good</option>
                        <option value="5">5 - Perfect</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mt-3" controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Comment"
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="mt-3" vatiant="primary">
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message variant="info">
                    <Link to="/login">Sign in</Link> to write a review
                  </Message>
                )}
                </Col>
              </Row>
            </>
          )
        )}
      </Container>
    </div>
  );
};

export default ProductScreen;

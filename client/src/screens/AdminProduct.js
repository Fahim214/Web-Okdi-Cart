import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { listProduct } from "../redux/actions/productActions";

const AdminProduct = () => {
  let params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Container fluid style={{ width: "93%", marginTop: 20 }}>
        <h3>Product Terbaru</h3>
        <Row>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            products.map((product, index) => (
              <Col sm={6} md={6} lg={4} xl={3}>
                <Card className="my-4 rounded">
                  <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top" />
                  </Link>
                  <Card.Body>
                    <Link to={`/product/${product._id}`}>
                      <Card.Title as="div" className="card-title">
                        <Link
                          to={`/product/${product._id}`}
                          style={{ fontSize: 13 }}
                        >
                          {product.name}
                        </Link>
                        {/* <strong>{product.name}</strong> */}
                      </Card.Title>
                    </Link>
                    <Card.Text as="div">
                      <Rating
                        value={product.rating}
                        text={`${product.rating} Reviews`}
                      />
                    </Card.Text>
                    <Card.Text as="h6">
                      <strong>{product.price}$</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default AdminProduct;

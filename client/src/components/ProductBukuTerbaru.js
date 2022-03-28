import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { listDuaProduct } from "../redux/actions/productDuaAction";
import Loading from "./Loading";
import Message from "./Message";
import Rating from "./Rating";

const ProductBukuTerbaru = () => {
  let params = useParams();
  const keyword = params.keyword;
  const dispatch = useDispatch();

  const productDuaList = useSelector((state) => state.productDuaList);
  const { products, loading, error } = productDuaList;

  useEffect(() => {
    dispatch(listDuaProduct(keyword));
  }, [dispatch, keyword]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 0,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div>
      <Container fluid style={{ width: "93%", marginTop: 50 }}>
        <Row>
          <Col>
            <Row style={{ alignItems: "center" }}>
              <Col>
                <div>
                  <h3>Produk Buku Terbaru</h3>
                </div>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <div>
                  <Link to="/product/all">
                    <h6 className="all-book">
                      Lihat Semua Barang
                    </h6>
                  </Link>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Slider {...settings}>
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  products.map((product, index) => (
                    <Col key={index}>
                      <Card className="my-2 mx-2 rounded">
                        <Link to={`/product/${product._id}`}>
                          <Card.Img src={product.image} variant="top" />
                        </Link>
                        <Card.Body>
                          <Link to={`/prduct/${product._id}`}>
                            <Card.Title as="div" className="card-title">
                              <Link
                                to={`/products/${product._id}`}
                                style={{ fontSize: 13 }}
                              >
                                {product.name}
                              </Link>
                            </Card.Title>
                          </Link>
                          <Card.Text as="div">
                            <Rating
                              value={product.rating}
                              text={`${product.rating} Reviews`}
                            />
                          </Card.Text>
                          <Card.Text as="h5">
                            <strong>{product.price}$</strong>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Slider>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductBukuTerbaru;

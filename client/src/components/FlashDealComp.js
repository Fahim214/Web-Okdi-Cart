import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../redux/actions/productActions";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const FlashDealComp = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, dispatch);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
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
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg mt-5">
      <Container fluid style={{width: "93%"}} className="py-5">
        <Row>
          <Col md={3}>
            <Row style={{alignItems: "center", color: "white"}}>
              <Col md={3}>
                <img src="https://s0.bukalapak.com/baseplate/flashdeal-ico-v2.svg" alt="" />
              </Col>
              <Col md={9}>
                <h3>Flash Deal</h3>
              </Col>
            </Row>
            <br />
            <h6>Berakhir Dalam ....</h6>
            <br />
            <br />
            <h2>Diskon tiap hari sampai 70%</h2>
          </Col>
          <Col md={9}>
            <Row>
              <Slider {...settings}>
                {products.map((product, index) => (
                  <Col key={index}>
                    <Card className="my-2 mx-2 rounded">
                      <Link to={`/product/${product._id}`}>
                        <Card.Img src={product.image} variant="top" />
                      </Link>
                      <Card.Body>
                        <Link to={`/prduct/${product._id}`}>
                          <Card.Title as="div" className="card-title">
                            <Link
                              to={`/product/${product._id}`}
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
                ))}
              </Slider>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FlashDealComp;

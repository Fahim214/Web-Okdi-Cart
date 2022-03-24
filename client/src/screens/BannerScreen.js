import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import SliderScreen from "./SliderScreen";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Product from "../components/Product";
import { listProduct } from "../redux/actions/productActions";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import CategoryScreen from "./CategoryScreen"
import CategoryComp from "../components/CategoryComp";

const BannerScreen = () => {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
  }


    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList);
    const {products, loading, error, page, pages} = productList;

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch])

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Container fluid style={{width: "95%"}}>
        <Row>
          <Col md={3}>
            <CategoryScreen />
          </Col>
          <Col md={7}>
            <SliderScreen />
          </Col>
          <Col md={2}>
            <Slider {...settings}>
              {loading ? (
                  <Loading />
              ) : error ? (
                  <Message variant="danger">{error}</Message>
              ) : (
                  products.map((product, index) => (
                      <Product product={product} key={index}/>
                  ))
              )}
            </Slider>
          </Col>
        </Row>
      </Container>
      <CategoryComp />
    </div>
  );
};

export default BannerScreen;

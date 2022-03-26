import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import { listProduct } from "../redux/actions/productActions";
import BannerScreen from "./BannerScreen";

const HomeScreen = () => {
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
      <BannerScreen />
      <Container fluid style={{ width: "93%", marginTop: 60 }}>
        <Row>
          <Col md={10}>
            <h3 style={{paddingBottom: 17}}>Product Terlaris</h3>
          </Col>
          <Col md={2}>
            <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            products.map((product, index) => (
              <Col sm={6} md={6} lg={4} xl={2}>
                <Product product={product} key={index} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;

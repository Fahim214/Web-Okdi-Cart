import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import categ from '../data/Category'
import Slider from "react-slick";

const CategoryComp = () => {

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


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 6,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            }
          ]
      };


  return (
    <div>
        <Container fluid style={{width: "90%", marginTop: 60, textAlign: "center"}}>
            <Row style={{justifyContent: "center"}}>
            <Slider {...settings}>
                {categ.map(cate => (
                    <Col md={1} xs={2} className="cate pb-3">
                        <div>
                        <img style={{width: 60,  borderRadius: "50%", marginBottom: 10, marginLeft: 45}} src={cate.image} alt="" />
                        </div>
                        <h6>{cate.nama}</h6>
                    </Col>
                ))}
                </Slider>
            </Row>
        </Container>
    </div>
  )
}

export default CategoryComp
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import promo from "../data/Promo";

const PromoComp = () => {
  return (
    <div>
      <Container fluid style={{marginTop: 60, width: "93%"}}>
        <Row style={{justifyContent: "center"}}>
          {promo.map((prom, index) => (
            <Col md={2} xs={4} key={index} style={{textAlign: "center"}}>
              <Card>
                <Card.Img variant="top" src={prom.image} />
              </Card>
              <h6 className="mt-3">{prom.name}</h6>
            </Col>
          ))}
        </Row>
        <Row>
            <Col style={{marginTop: 40}}>
                <img src="https://s0.bukalapak.com/athena/new-zone/w-1744/MAR_DWEB_NUZ_entry_point_2180x280_gaming.jpg.webp" alt="Banner promo" style={{width: "100%"}} />
            </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PromoComp;

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating"

const Product = ({ product }) => {
  return (
    <div>
      <Card className="my-2 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/prduct/${product._id}`}>
            <Card.Title as="div" className="card-title">
              <Link to={`/product/${product._id}`} style={{ fontSize: 13 }}>
                {product.name}
              </Link>
            </Card.Title>
          </Link>
          <Card.Text as="div">
              <Rating value={product.rating} text={`${product.rating} Reviews`} />
          </Card.Text>
          <Card.Text as="h5">
              <strong>{product.price}$</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;

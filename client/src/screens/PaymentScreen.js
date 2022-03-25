import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/actions/cartActions";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) navigate("/shipping");

  const handlePaymentMethod = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={handlePaymentMethod}>
          <Form.Group>
            <Form.Label as="label">Select Method</Form.Label>
          </Form.Group>
          <Col>
            <Form.Group>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card"
                id="Paypal"
                value="Paypal"
                name="paymentMethod"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Form.Group>
          </Col>
          <Button className="mt-3" type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;

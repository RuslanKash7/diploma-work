import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TypeBar from "../components/ui/typeBar";
import BrandBar from "../components/ui/brandBar";
import ProductList from "../components/ui/productList";

const Shop = () => {
  return (
    <Container className="mt-2">
      <Row className="w-100 mt-2">
        <Col md={3}>
          <TypeBar/>
        </Col>
        <Col md={9}>
          <BrandBar/>
          <ProductList/>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;

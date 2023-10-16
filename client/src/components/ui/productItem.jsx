import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import star from "../../assets/star.png";
import { useHistory } from "react-router-dom";

const ProductItem = ({ product }) => {
  const history = useHistory();

  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => history.push("/productpage/" + product._id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={product.img}
          alt={"No image yet"}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{product.brand}</div>
          <div className="d-flex align-items-center">
            <div>{product.rating}</div>
            <Image width={16} height={16} src={star} />
          </div>
        </div>
        <div>{product.name}</div>
      </Card>
    </Col>
  );
};

export default ProductItem;

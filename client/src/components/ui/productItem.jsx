import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Image } from "react-bootstrap";
import star from "../../assets/star.png";
import { useHistory } from "react-router-dom";
import {
  getBrandById,
  getBrandsLoadingStatus,
} from "../../store/brands";

const ProductItem = ({ product }) => {
  const history = useHistory();
  const isLoading = useSelector(getBrandsLoadingStatus());
  const brandId = product.brand.join(', '); // тут нужно получать строку, а не массив!!!
  const theBrand = useSelector(getBrandById(brandId));

  if (isLoading) return "Loading ...";

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
          src={"http://localhost:8080/" + product.img}
          alt={"No image yet"}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{theBrand.name}</div>
          <div className="d-flex align-items-center">
            <div>{product.rating}</div>
            <Image width={16} height={16} src={star} />
          </div>
        </div>
        <div>Стоимость {product.price}</div>
        <div>{product.name}</div>
      </Card>
    </Col>
  );
};

export default ProductItem;

import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import EditProductItem from "./editProductItem";
import { getProducts, getProductsLoadingStatus } from "../../store/products";

const EditProductList = () => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const products = useSelector(getProducts());

  useEffect(() => {
    getProducts();
  }, [products]);

  if (!isLoading) {
    return (
      <>
        <Row className="d-flex">
          {products.map((product) => (
            <EditProductItem key={product._id} product={product} />
          ))}
        </Row>
      </>
    );
  } else return "loading ...";
};

export default EditProductList;

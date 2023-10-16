import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import ProductItem from "./productItem";
import { getProducts, getProductsLoadingStatus } from "../../store/products";

const ProductList = () => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const products = useSelector(getProducts());
  useEffect(() => {
    getProducts();
  }, [products])

  if (!isLoading) {
    return (
      <>
        <Row className="d-flex">
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Row>
      </>
    );
  } else return "loading ...";
};

export default ProductList;

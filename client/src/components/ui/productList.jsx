import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import ProductItem from "./productItem";
import { getProducts, getProductsLoadingStatus } from "../../store/products";
import Pages from "./pages";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

const ProductList = ({ selectedTypeId }) => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const products = useSelector(getProducts());
  useEffect(() => {
    getProducts();
  }, [products]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypeId]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // function filterProducts(data) {
  //   const filteredProducts = selectedTypeId
  //       ? data.filter((d) => d.type === selectedTypeId)
  //       : data
  // }

  const toFilterProducts = (data) => {
    const filteredData = selectedTypeId
      ? data.filter((d) => d.type.includes(selectedTypeId))
      : data;
    return filteredData;
  };
  const filteredProducts = toFilterProducts(products);

  const count = filteredProducts.length;

  const usersCrop = paginate(filteredProducts, currentPage, pageSize);

  if (!isLoading) {
    return (
      <>
        <Row className="d-flex">
          {usersCrop.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Row>
        <Pages
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </>
    );
  } else return "loading ...";
};

export default ProductList;

import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import ProductItem from "./productItem";
import { getProducts, getProductsLoadingStatus } from "../../store/products";
import Pages from "./pages";
import { paginate } from "../../utils/paginate";

const ProductList = ({ selectedTypeId, selectedBrandId, searchQuery }) => {
  const isLoading = useSelector(getProductsLoadingStatus());
  const products = useSelector(getProducts());
  useEffect(() => {
    getProducts();
  }, [products]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypeId, selectedBrandId, searchQuery]);

  if (isLoading) return "Loading from NavbarProductList...";

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const toFilterProducts = (data, selectedTypeId, selectedBrandId) => {
    let filteredData;
    if (searchQuery) {
      filteredData = data.filter(
        (data) =>
          data.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    } else {
      if (!selectedTypeId && !selectedBrandId) {
        filteredData = data;
      }
      if (selectedTypeId && !selectedBrandId) {
        filteredData = data.filter((d) => d.type.includes(selectedTypeId));
      }
      if (!selectedTypeId && selectedBrandId) {
        filteredData = data.filter((d) => d.brand.includes(selectedBrandId));
      }
      if (selectedTypeId && selectedBrandId) {
        filteredData = data
          .filter((d) => d.type.includes(selectedTypeId))
          .filter((d) => d.brand.includes(selectedBrandId));
      }
    }
    return filteredData;
  };
  const filteredProducts = toFilterProducts(
    products,
    selectedTypeId,
    selectedBrandId
  );

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

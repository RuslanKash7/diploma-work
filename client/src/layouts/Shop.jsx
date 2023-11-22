import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import TypeBar from "../components/ui/typeBar";
import BrandBar from "../components/ui/brandBar";
import Card from "react-bootstrap/Card";
import ProductList from "../components/ui/productList";
import { useSelector } from "react-redux";
import { getTypes, getTypesLoadingStatus } from "../store/type";
import { getBrands, getBrandsLoadingStatus } from "../store/brands";

const Shop = () => {
  // поисковая строка
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = ({ target }) => {
    setSelectedTypeId(undefined);
    setSelectedBrandId(undefined);
    setSearchQuery(target.value);
};
console.log(searchQuery)

  // получение типов
  const isLoadingTypes = useSelector(getTypesLoadingStatus());
  const types = useSelector(getTypes());
  const [selectedTypeId, setSelectedTypeId] = useState();
  const handleTypeSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedTypeId(item._id);
  };

  // получение брендов
  const isLoadingBrands = useSelector(getBrandsLoadingStatus());
  const brands = useSelector(getBrands());
  const [selectedBrandId, setSelectedBrandId] = useState();
  const handleBrandSelect = (item) => {
    if (searchQuery !== "") setSearchQuery("");
    setSelectedBrandId(item._id);
  };

  const clearFilter = () => {
    setSelectedTypeId();
    setSelectedBrandId();
  };

  return (
    <Container className="mt-2">
      <Row className="w-100 mt-2">
        <Col md={3}>
          <div className="d-flex flex-column">
            <Card
              onClick={clearFilter}
              style={{ cursor: "pointer", width: 250 }}
              className={"m-1 p-2"}
              border="primary"
            >
              Очистить фильтры!
            </Card>
            <TypeBar
              isLoadingTypes={isLoadingTypes}
              selectedItem={selectedTypeId}
              items={types}
              onItemSelect={handleTypeSelect}
            />
          </div>
        </Col>
        <Col md={9}>
          <input
            type="text"
            name="searchQuery"
            placeholder="Поиск..."
            onChange={handleSearchQuery}
            value={searchQuery}
          />
          <BrandBar
            isLoadingBrands={isLoadingBrands}
            selectedItem={selectedBrandId}
            items={brands}
            onItemSelect={handleBrandSelect}
          />

          <ProductList
            selectedTypeId={selectedTypeId}
            selectedBrandId={selectedBrandId}
            searchQuery={searchQuery}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;

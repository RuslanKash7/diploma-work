import React, { useState } from "react";
import TypeBar from "../../components/ui/typeBar";
import BrandBar from "../../components/ui/brandBar";
import Card from "react-bootstrap/Card";
import ProductList from "../../components/ui/productList/productList";
import { useSelector } from "react-redux";
import { getTypes, getTypesLoadingStatus } from "../../store/type";
import { getBrands, getBrandsLoadingStatus } from "../../store/brands";
import styles from "./Shop.module.css";

const Shop = () => {
  // поисковая строка
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = ({ target }) => {
    setSelectedTypeId(undefined);
    setSelectedBrandId(undefined);
    setSearchQuery(target.value);
  };

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
    setSearchQuery("");
  };

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-lg-3 mx-auto">
          <div className="d-flex flex-column">
            <Card
              onClick={clearFilter}
              style={{ cursor: "pointer", width: 250, textAlign: "center" }}
              className={"mb-2 p-2"}
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
        </div>
        <div className="col-lg-9 mx-auto">
          <input
            className={styles.input}
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
        </div>
      </div>
    </div>
  );
};

export default Shop;

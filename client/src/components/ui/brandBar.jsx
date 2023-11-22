import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { getBrands, getBrandsLoadingStatus } from "../../store/brands";

const BrandBar = () => {
  const isLoading = useSelector(getBrandsLoadingStatus());
  const brands = useSelector(getBrands());
  const [selectedBrand, setSelectedBrand] = useState();

  if (isLoading) return "loading";

  const handleBrand = (item) => {
    setSelectedBrand(item._id);
  };

  return (
    <>
      <Row className="d-flex m-3 flex-row align-items-center">
        {brands.map((brand) => (
          <Card
            onClick={() => handleBrand(brand)}
            border={brand._id === selectedBrand ? "primary" : ""}
            style={{ cursor: "pointer", width: 120 }}
            key={brand._id}
            className={`m-1 p-2 ${brand._id === selectedBrand ? "bg-primary text-white" : ""}`}
          >
            {brand.name}
          </Card>
        ))}
      </Row>
    </>
  );
};

export default BrandBar;

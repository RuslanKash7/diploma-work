import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { getBrands, getBrandsLoadingStatus } from "../../store/brands";

const BrandBar = () => {
  const isLoading = useSelector(getBrandsLoadingStatus());
  const brands = useSelector(getBrands());

  if (isLoading) return "loading";

  return (
    <>
      <Row className="d-flex m-3 flex-row align-items-center">
        {brands.map((brand) => (
          <Card
            style={{ cursor: "pointer", width: 120 }}
            key={brand._id}
            className="p-3"
          >
            {brand.name}
          </Card>
        ))}
      </Row>
    </>
  );
};

export default BrandBar;

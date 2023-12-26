import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

const BrandBar = ({ isLoadingBrands, selectedItem, items, onItemSelect }) => {
  if (isLoadingBrands) return "loading";

  return (
    <>
      <Row className="d-flex m-3 flex-row align-items-center">
        {items.map((item) => (
          <Card
            onClick={() => onItemSelect(item)}
            border={item._id === selectedItem ? "primary" : ""}
            style={{ cursor: "pointer", width: 120 }}
            key={item._id}
            className={`m-1 p-2 ${
              item._id === selectedItem ? "bg-primary text-white" : ""
            }`}
          >
            {item.name}
          </Card>
        ))}
      </Row>
    </>
  );
};

export default BrandBar;

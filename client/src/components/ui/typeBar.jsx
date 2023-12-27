import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = ({ isLoadingTypes, selectedItem, items, onItemSelect }) => {
  if (isLoadingTypes) return "loading";

  return (
    <>
      <ListGroup className="mb-3">
        {items.map((item) => (
          <ListGroup.Item
            onClick={() => onItemSelect(item)}
            style={{ cursor: "pointer", width: 250 }}
            active={item._id === selectedItem ? " active" : ""}
            key={item._id}
          >
            {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TypeBar;

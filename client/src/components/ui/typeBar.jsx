import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { getTypes, getTypesLoadingStatus} from "../../store/type";

const TypeBar = () => {

  const isLoading = useSelector(getTypesLoadingStatus());
  const types = useSelector(getTypes());

  if (isLoading) return "loading";
  
  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === 1 ? " active" : ""}
          key={type._id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;

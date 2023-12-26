import React from "react";
import { Row, Button } from "react-bootstrap";
import EditBrandItem from "./editBrandItem";

const EditBrandList = ({ things, isLoading, setThingVisible, header }) => {
  if (isLoading) return "Loading from EditThings...";

  return (
    <>
    <Button
        variant={"outline-success"}
        className="mt-4 mb-4 p-2"
        onClick={() => setThingVisible(true)}
      >
        {header}
      </Button>
      <Row className="d-flex">
        {things.map((thing) => (
          <EditBrandItem key={thing._id} thing={thing} />
        ))}
      </Row>
    </>
  );
};

export default EditBrandList;

import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TextField from "../common/form/textField";
import { useDispatch } from "react-redux";
import { createNewBrand } from "../../store/brands";

const CreateBrand = ({ show, onHide, header, header1 }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
  });

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...data,
    };
    console.log(newData);
    dispatch(createNewBrand(newData));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <TextField
          label={header1}
          className="mt-3 mb-1"
          name="name"
          value={data.name}
          onChange={handleChange}/>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={handleSubmit}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;

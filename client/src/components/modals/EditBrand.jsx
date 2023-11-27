import React, { useState } from "react";
import TextField from "../common/form/textField";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateBrand } from "../../store/brands";

const EditBrand = ({ header, header1, show, onHide, value }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: value.name,
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
      brandId: value._id, // отдельно передал, а потом этот ключ в БД не появляется по тому что нет в схеме бакэнда
    };
    dispatch(updateBrand(newData));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <TextField
            label={header1}
            className="mt-3 mb-1"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-success"} onClick={handleSubmit}>
          Сохранить изменения
        </Button>
        <Button variant={"outline-secondary"} onClick={onHide}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBrand;

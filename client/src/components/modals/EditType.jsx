import React, { useState } from "react";
import TextField from "../common/form/textField";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateType } from "../../store/type";

const EditType = ({ header, show, onHide, value }) => {
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
      typeId: value._id, // отдельно передал, а потом этот ключ в БД не появляется по тому что нет в схеме бакэнда
    };
    dispatch(updateType(newData));
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
            label="Введите название типа"
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

export default EditType;
